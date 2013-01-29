# The controller for the sequencing application.
# Manages state and keeps the views updated.
#
class SequencerController

  constructor: (@sequencer, @launchpad) ->
    @gui = new GUI
    @reset(true)

  setStepLength: (stepLength) ->
    @sequencer.stepLength = stepLength
    return

  # Clear all patterns and set all track and pattern properties to their default values.
  reset: (firstTime) ->
    @sequencer.reset(true) unless firstTime
    @track = 0   # selected track index
    @pattern = 0 # selected pattern index
    @value = 1   # selected step value
    @clock = -1  # current transport time, in steps
    @_updateSelectedPattern(true)
    @redraw() unless firstTime
    return


  # Update the Launchpad and Max GUI lights to reflect the current sequencer state
  redraw: ->
    @launchpad.allOff()
    @gui.clearGrid()
    @gui.scale(@sequencer.scale)
    @gui.stepLength(@stepLength)
    @selectValue(@value, true)
    @selectTrack(@track, true)
    @selectPattern(@pattern)
    return

  # Quickly draw the Launchpad lights assuming all lights are currently off
  drawLaunchpad: ->
    launchpad = @launchpad
    launchpad.track(@selectedTrack)
    launchpad.stepValue(@value)
    launchpad.pattern(@selectedPattern)
    pattern = @selectedPattern
    launchpad.patternSteps(pattern)
    return

  drawGrid: (pattern) ->
    pattern ?= @selectedPattern
    launchpad = @launchpad
    gui = @gui
    launchpad.patternSteps pattern, (x,y,stepValue) ->
      gui.grid(x, y, stepValue)
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
    gui.trackMultiplier(selectedTrack)
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


  setScale: (scaleSteps...) ->
    scaleSteps = [] if scaleSteps[0] == -1 # special case message for empty scale
    @sequencer.scale.setSteps(scaleSteps)
    return


  setClock: (clock) ->
    oldClock = @clock
    if(oldClock != clock)
      @clock = clock
      @sequencer.step(clock)
      @_drawActiveStep()
    return



  stop: ->
    @setClock(-1)
    # Live sends "all notes off" to all connected MIDI devices when the transport stops,
    # which resets the Launchpad, so we need to re-sync the state:
    @drawLaunchpad()
    return


  # @param t the track index
  # @param p the pattern index
  # @param stepValues an array of sequence step values
  setPattern: (t, p, stepValues) ->
    return unless (0 <= t < TRACKS) and (0 <= p < PATTERNS) and (stepValues.length == 64)
    @sequencer.tracks[t].patterns[p].sequence = stepValues
    @_drawPattern(t, p) if t == @track and p == @pattern # update current pattern
    return

  toggleSelectedTrackMute: ->
    @muteTrack(@track)
    return

  setSelectedTrackMute: (mute) ->
    @muteTrack(@track, mute)
    return

  muteTrack: (trackIdx, mute) ->
    track = @sequencer.tracks[trackIdx]
    return unless track?
    track.mute = mute ? !track.mute # if no value is given, then toggle
    @launchpad.track(track)
    @gui.trackMute(track) if track == @selectedTrack # GUI only show current track state
    return

  toggleSelectedPatternMute: ->
    @mutePattern(@track, @pattern)
    return

  setSelectedPatternMute: (mute) ->
    @mutePattern(@track, @pattern, mute)
    return

  mutePattern: (trackIdx, patternIdx, mute) ->
    pattern = @sequencer.tracks[trackIdx]?.patterns[patternIdx]
    return unless pattern?
    pattern.mute = mute ? !pattern.mute # if no value is given, then toggle
    @launchpad.pattern(pattern)
    @gui.patternMute(pattern) if pattern == @selectedPattern # GUI only show current pattern state
    return


  # Copy the given pattern to the clipboard.
  copyPattern: ->
    pattern = @selectedPattern.toJSON()
    pattern.sequence = pattern.sequence[..] # make a copy so we get a snapshot of the sequence at this moment
    @patternClipboard = pattern
    return

  # Update the give target pattern to match the one in the clipboard
  pastePattern: ->
    pattern = @patternClipboard
    return unless pattern?
    @selectedPattern.fromJSON(pattern)
    @selectPattern(@pattern) # this redraws everything needed
    return


  # Rotate (shift with wrap-around) the selected pattern within it's start/end range.
  rotate: (amount) ->
    @selectedPattern.rotate(amount)
    @drawGrid()
    return

  reverse: ->
    @selectedPattern.reverse()
    @drawGrid()
    return

  invert: ->
    @selectedPattern.invert()
    @drawGrid()
    return

  random: ->
    @selectedPattern.random()
    @drawGrid()
    return

  randomFill: (value = @value) ->
    @selectedPattern.randomFill(value)
    @drawGrid()
    return

  fill: (value = @value) ->
    @selectedPattern.fill(value)
    @drawGrid()
    return

  replace: (value = @value) ->
    @selectedPattern.replace(value)
    @drawGrid()
    return

  firstColumn: (value = @value) ->
    @selectedPattern.firstColumn(value)
    @drawGrid()
    return

  setSelectedTrackPitch: (pitch) ->
    @selectedTrack.pitch = pitch
    return

  setSelectedTrackVelocity: (velocity) ->
    @selectedTrack.velocity = velocity
    return

  setSelectedTrackDurationScale: (scale) ->
    @selectedTrack.duration = scale
    return

  setSelectedTrackStepLengthMultiplier: (multiplier) ->
    @selectedTrack.multiplier = multiplier
    return

  setSelectedPatternStartStep: (stepIndex)->
    @selectedPattern.setStart(stepIndex)
    @drawPatternInfo()
    return

  setSelectedPatternEndStep: (stepIndex) ->
    @selectedPattern.setEnd(stepIndex)
    @drawPatternInfo()
    return

  setSelectedPatternType: (type) ->
    @selectedPattern.setType(type)
    return


  # ==============================================================================
  # private

  _updateSelectedPattern: (skipRedraw) ->
    trackIndex = @track
    patternIndex = @pattern
    @selectedTrack = @sequencer.tracks[trackIndex]
    @selectedPattern = @selectedTrack.patterns[patternIndex]
    @_drawPattern(trackIndex, patternIndex) unless skipRedraw
    return


  _drawPattern: (trackIndex, patternIndex) ->
    track = @sequencer.tracks[trackIndex]
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
    clock = @selectedTrack.clockForMultiplier(@clock)
    return unless clock?

    selectedPattern = @selectedPattern
    oldActiveStep = @activeStep
    activeStep = selectedPattern.stepIndexForClock(clock)

    # remove old active step indicators
    if oldActiveStep >= 0
      oldX = oldActiveStep % 8
      oldY = Math.floor(oldActiveStep/8) % 8
      oldValue = selectedPattern.getStep(oldActiveStep)
      @launchpad.grid(oldX, oldY, oldValue) unless @patternOps
      @gui.grid(oldX, oldY, oldValue)

    @activeStep = activeStep

    # show the new active step indicators
    if activeStep >= 0
      x = activeStep % 8
      y = Math.floor(activeStep/8) % 8
      @launchpad.activeStep(x, y) unless @patternOps
      @gui.activeStep(x, y)

    return

