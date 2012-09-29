# The controller for the sequencing application.
# Manages state and keeps the views updated.
#
class Sequencer

  constructor: (@launchpad) ->
    @gui = new GUI
    @scale = new Scale
    @onNote = NOOP
    @reset(true)
    launchpad.onTopDown = @_onLaunchpadTopDown
    launchpad.onRightDown = @_onLaunchpadRightDown
    launchpad.onGridDown = @_onLaunchpadGridDown


  # Clear all patterns and set all track and pattern properties to their default values.
  reset: (skipRedraw) ->
    @track = 0   # selected track index
    @pattern = 0 # selected pattern index
    @value = 1   # selected step value
    @clock = -1  # current transport time, in steps
    @tracks = (new Track(index, @scale) for index in [0...TRACKS] by 1)
    @trackMultiPress = 0
    @patternMultiPress = 0
    @_updateSelectedPattern(true)
    @redraw() unless skipRedraw
    return


  # Update the Launchpad and Max GUI lights to reflect the current sequencer state
  redraw: ->
    @launchpad.allOff()
    @gui.clearGrid()
    @selectValue(@value, true)
    @selectTrack(@track, true)
    @selectPattern(@pattern)
    return

  # Quickly draw the Launchpad lights assuming all lights are currently off
  drawLaunchpad: ->
    @launchpad.track(@selectedTrack)
    @launchpad.stepValue(@value)
    @launchpad.pattern(@selectedPattern)
    pattern = @selectedPattern
    pattern.each (x,y,index) => @launchpad.grid(x, y, pattern.getStep(index)); return
    return

  drawGrid: (pattern) ->
    pattern ?= @selectedPattern
    pattern.each (x,y,index) =>
      value = pattern.getStep(index)
      @launchpad.grid(x, y, value)
      @gui.grid(x, y, value)
      return
    return

  drawPatternInfo: ->
    @gui.patternInfo(@pattern, @selectedPattern)


  setGridValue: (x,y) ->
    step = x + y*8
    pattern = @selectedPattern
    value = @value
    value = 0 if value == pattern.getStep(step) # toggle off
    pattern.setStep(step, value)
    @launchpad.grid(x, y, value)
    @gui.grid(x, y, value)
    return


  selectTrack: (index, skipRedraw) ->
    return unless 0 <= index <= 3
    launchpad = @launchpad
    gui = @gui

    # turn off old selectedTrack button on the Launchpad
    launchpad.trackOff(@selectedTrack)

    # switch to the new selectedTrack
    @track = index
    @_updateSelectedPattern(skipRedraw)
    selectedTrack = @selectedTrack
    patterns = selectedTrack.patterns
    selectedPattern = @selectedPattern

    # update the GUI
    gui.track(index)
    gui.trackMute(selectedTrack)
    gui.patternMute(selectedPattern)

    # update the Launchpad
    launchpad.track(selectedTrack)
    for pattern in patterns
      if pattern == selectedPattern
        launchpad.pattern(pattern)
      else
        launchpad.patternOff(pattern)
    return


  selectValue: (value, preventToggle) ->
    return unless 0 <= value <= 4
    @launchpad.stepValueOff(@value)
    value = 0 if @value == value and not preventToggle
    @value = value

    @launchpad.stepValue(value)
    @gui.stepValue(value)
    return


  selectPattern: (index, skipRedraw) ->
    return unless 0 <= index <= 7
    @launchpad.patternOff(@selectedPattern)
    @pattern = index
    @_updateSelectedPattern(skipRedraw)

    @launchpad.pattern(@selectedPattern)
    @gui.pattern(index)
    @gui.patternMute(@selectedPattern)
    return


  setClock: (clock) ->
    oldClock = @clock
    if(oldClock != clock)
      @clock = clock
      @_drawActiveStep()
      @_generateOutputForActiveStep()
    return


  stop: ->
    @setClock(-1)
    # Live sends "all notes off" to all connected MIDI devices when the transport stops,
    # which resets the Launchpad, so we need to re-sync the state:
    @drawLaunchpad()


  # @param t the track index
  # @param p the pattern index
  # @param stepValues an array of sequence step values
  setPattern: (t, p, stepValues) ->
    return unless (0 <= t < TRACKS) and (0 <= p < PATTERNS) and (stepValues.length == 64)
    @tracks[t].patterns[p].sequence = stepValues
    @_drawPattern(t, p) if t == @track and p == @pattern # update current pattern
    return


  muteSelectedTrack: (mute) ->
    selectedTrack = @selectedTrack
    selectedTrack.mute = mute ? !selectedTrack.mute # if no value is given, then toggle
    @launchpad.track(selectedTrack)
    @gui.trackMute(selectedTrack)

  muteSelectedPattern: (mute) ->
    selectedPattern = @selectedPattern
    selectedPattern.mute = mute ? !selectedPattern.mute # if no value is given, then toggle
    @launchpad.pattern(selectedPattern)
    @gui.patternMute(selectedPattern)

  # ==============================================================================
  # private

  _updateSelectedPattern: (skipRedraw) ->
    trackIndex = @track
    patternIndex = @pattern
    @selectedTrack = @tracks[trackIndex]
    @selectedPattern = @selectedTrack.patterns[patternIndex]
    @_drawPattern(trackIndex, patternIndex) unless skipRedraw
    return


  _drawPattern: (trackIndex, patternIndex) ->
    track = @tracks[trackIndex]
    pattern = track?.patterns[patternIndex]
    return unless pattern?

    @gui.trackInfo(trackIndex, track)
    @gui.patternInfo(patternIndex, pattern)

    @drawGrid(pattern)
    # and force the active step to show its value:
    @activeStep = -1
    @_drawActiveStep()
    return


  _drawActiveStep: () ->
    selectedPattern = @selectedPattern
    oldActiveStep = @activeStep
    activeStep = selectedPattern.stepIndexForClock(@clock)

    # remove old active step indicators
    if oldActiveStep >= 0
      oldX = oldActiveStep % 8
      oldY = Math.floor(oldActiveStep/8) % 8
      oldValue = selectedPattern.getStep(oldActiveStep)
      @launchpad.grid(oldX, oldY, oldValue)
      @gui.grid(oldX, oldY, oldValue)

    @activeStep = activeStep

    # show the new active step indicators
    if activeStep >= 0
      x = activeStep % 8
      y = Math.floor(activeStep/8) % 8
      @launchpad.activeStep(x, y)
      @gui.activeStep(x, y)

    return


  # generate MIDI output for current step
  _generateOutputForActiveStep: () ->
    clock = @clock
    return if clock < 0
    for track,index in @tracks
      note = track.noteForClock(clock)
      continue unless note? # no note when track is muted

      if note.duration > 0 and note.velocity > 0
        outlet(NOTE, note.pitch, note.velocity, note.duration)

      outlet(CC, 1, note.modulation) if note.modulation?
      outlet(AFTERTOUCH, note.aftertouch) if note.aftertouch?

    return


  # Launchpad button event handlers
  _onLaunchpadTopDown: (buttonIndex) =>
    @patternMultiPress = 0
    if buttonIndex <= 3
      @_patternOpsMode(false) if @patternOpsMode

      if @track == buttonIndex # track already selected
        @trackMultiPress += 1
        if @trackMultiPress >= 3
          @trackMultiPress = 0
          @muteSelectedTrack() # toggle mute
      else
        @trackMultiPress = 1
        @selectTrack(buttonIndex)

    else # select step value
      return if @patternOpsMode # TODO: perform copy,paste,shift operations
      @trackMultiPress = 0
      @selectValue(buttonIndex-3)

    return


  _onLaunchpadRightDown: (buttonIndex) =>
    @trackMultiPress = 0
    if @patternOpsMode
      # heldTop check prevents bad UX with an extra press
      return if @launchpad.heldTop?
      @_patternOpsMode(false)
      # TODO: check if the buttin index is different and if so, switch patterns but stay in pattern ops mode

    if @pattern == buttonIndex # pattern already selected
      @patternMultiPress += 1
      if @patternMultiPress >= 3
        @patternMultiPress = 0
        if @launchpad.heldTop?
          # it was held the whole time, because a top button press would have reset @patternMultiPress
          @_patternOpsMode(true)
        else
          @muteSelectedPattern() # toggle mute
    else
      @patternMultiPress = 1
      @selectPattern(buttonIndex)
    return


  _onLaunchpadGridDown: (x,y) =>
    @trackMultiPress = 0
    @patternMultiPress = 0
    @setGridValue(x,y)
    return


  # enter the mode for pattern options & operations (start, end, copy, paste, shift left/right)
  _patternOpsMode: (enabled) ->
    @patternOpsMode = enabled
    if enabled
      @launchpad.patternOps(@selectedPattern)
    else
      for valueIndex in [0..4]
        @launchpad.stepValueOff(valueIndex) unless @value == valueIndex
      @drawLaunchpad()
    return
