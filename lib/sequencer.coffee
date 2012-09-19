# The controller for the sequencing application.
# Manages state and keeps the views updated.
#
class Sequencer

  constructor: (@launchpad) ->
    @gui = new GUI
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
    @tracks = (new Track(index) for index in [0...TRACKS] by 1)
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
    for x in [0...ROW_LENGTH] by 1
      for y in [0...ROW_LENGTH] by 1
        step = x + y*ROW_LENGTH
        value = pattern.getStep(step)
        @launchpad.grid(x, y, value)
    return

  drawGrid: (pattern) ->
    pattern ?= @selectedPattern
    for x in [0...ROW_LENGTH] by 1
      for y in [0...ROW_LENGTH] by 1
        step = x + y*ROW_LENGTH
        value = pattern.getStep(step)
        @launchpad.grid(x, y, value)
        @gui.grid(x, y, value)
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
    @launchpad.trackOff(@selectedTrack)
    @track = index
    @_updateSelectedPattern(skipRedraw)

    @launchpad.track(@selectedTrack)
    @gui.track(index)
    @gui.trackMute(@selectedTrack)
    @gui.patternMute(@selectedPattern)
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
    if clock >= 0
      for track in @tracks
        note = track.noteForClock(clock)
        outlet(NOTE,
          note.pitch,
          note.velocity,
          note.duration
        ) if note
    return


  # Launchpad button event handlers
  _onLaunchpadTopDown: (buttonIndex) =>
    @patternMultiPress = 0
    if buttonIndex <= 3
      if @track == buttonIndex # track already selected
        @trackMultiPress += 1
        if @trackMultiPress >= 3
          @trackMultiPress = 0
          @muteSelectedTrack() # toggle mute
      else
        @trackMultiPress = 1
        @selectTrack(buttonIndex)

    else # select step value
      @trackMultiPress = 0
      @selectValue(buttonIndex-3)

    return

  _onLaunchpadRightDown: (buttonIndex) =>
    @trackMultiPress = 0
    if @pattern == buttonIndex # pattern already selected
      @patternMultiPress += 1
      if @patternMultiPress >= 3
        @patternMultiPress = 0
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
