# The controller for the sequencing application.
# Manages state and keeps the views updated.
#
class Sequencer

  constructor: (@launchpad, @gui = new GUI) ->
    @onNote = NOOP
    @reset(true)


  # Clear all patterns and set all track and pattern properties to their default values.
  reset: (skipRedraw) ->
    @track = 0   # selected track index
    @pattern = 0 # selected pattern index
    @value = 1   # selected step value
    @clock = -1  # current transport time, in steps
    @tracks = (new Track for track in [0...TRACKS])
    @_updateSelectedPattern(true)
    @redraw() unless skipRedraw


  # Update the Launchpad and Max GUI lights to reflect the current sequencer state
  redraw: ->
    @launchpad.allOff()
    @gui.clearGrid()
    @selectValue(@value, true)
    @selectTrack(@track, true)
    @selectPattern(@pattern)

  # Quickly draw the Launchpad lights assuming all lights are currently off
  drawLaunchpad: ->
    @launchpad.track(@track)
    @launchpad.stepValue(@value)
    @launchpad.pattern(@pattern)
    pattern = @selectedPattern
    for x in [0...ROW_LENGTH]
      for y in [0...ROW_LENGTH]
        step = x + y*ROW_LENGTH
        value = pattern.getStep(step)
        @launchpad.grid(x, y, value)

  drawGrid: (pattern) ->
    pattern ?= @selectedPattern
    for x in [0...ROW_LENGTH]
      for y in [0...ROW_LENGTH]
        step = x + y*ROW_LENGTH
        value = pattern.getStep(step)
        @launchpad.grid(x, y, value)
        @gui.grid(x, y, value)


  setGridValue: (x,y) ->
    step = x + y*8
    pattern = @selectedPattern

    value = @value
    value = 0 if value == pattern.getStep(step) # toggle off

    pattern.setStep(step, value)
    @launchpad.grid(x, y, value)
    @gui.grid(x, y, value)


  selectTrack: (index, skipRedraw) ->
    return unless 0 <= index <= 3
    @launchpad.trackOff(@track)
    @track = index
    @launchpad.track(index)
    @gui.track(index)
    @_updateSelectedPattern(skipRedraw)


  selectValue: (value, preventToggle) ->
    return unless 0 <= value <= 4
    @launchpad.stepValueOff(@value)
    value = 0 if @value == value and not preventToggle
    @value = value
    @launchpad.stepValue(value)
    @gui.stepValue(value)


  selectPattern: (index, skipRedraw) ->
    return unless 0 <= index <= 7
    @launchpad.patternOff(@pattern)
    @pattern = index
    @launchpad.pattern(index)
    @gui.pattern(index)
    @_updateSelectedPattern(skipRedraw)


  setClock: (clock) ->
    oldClock = @clock
    if(oldClock != clock)
      @clock = clock
      @_drawActiveStep()
      @_generateOutputForActiveStep()


  # @param t the track index
  # @param p the pattern index
  # @param stepValues an array of sequence step values
  setPattern: (t, p, stepValues) ->
    return unless (0 <= t < TRACKS) and (0 <= p < PATTERNS) and (stepValues.length == 64)
    @tracks[t].patterns[p].sequence = stepValues
    @_drawPattern(t, p) if t == @track and p == @pattern # update current pattern



  # ==============================================================================
  # private

  _updateSelectedPattern: (skipRedraw) ->
    trackIndex = @track
    patternIndex = @pattern
    @selectedTrack = @tracks[trackIndex]
    @selectedPattern = @selectedTrack.patterns[patternIndex]
    @_drawPattern(trackIndex, patternIndex) unless skipRedraw


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


  # generate MIDI output for current step
  _generateOutputForActiveStep: () ->
    clock = @clock
    if clock >= 0
      for track in @tracks
        note = track.noteForClock(clock)
        outlet(2,
          note.pitch,
          note.velocity,
          note.duration
        ) if note
