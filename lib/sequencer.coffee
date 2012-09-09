# The controller for the sequencing application.
# Manages state and keeps the views updated.
#
class Sequencer

  constructor: (@launchpad, @gui, @output) ->
    @factoryReset(true)


  # Clear all patterns and set all track and pattern properties to their default values.
  factoryReset: (skipRedraw) ->
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
    # @setClock(@clock)
    @selectValue(@value, true)
    @selectTrack(@track, true)
    @selectPattern(@pattern)


  setGridValue: (x,y) ->
    step = x + y*8
    pattern = @selectedPattern

    value = @value
    value = 0 if value == pattern.getStep(step) # toggle off
    pattern.setStep(step, value)

    @launchpad.grid(x, y, Launchpad.GRID_COLORS[value])
    @gui.grid(x, y, value)


  selectTrack: (index, skipRedraw) ->
    if 0 <= index <= 3
      @launchpad.top(@track, OFF)
      @track = index
      @launchpad.top(index, Launchpad.TRACK_COLOR)
      @_updateSelectedPattern(skipRedraw)
      @gui.track(index)


  selectValue: (value, preventToggle) ->
    if 0 <= value <= 4
      launchpad.top(@value+3, OFF) unless @value == 0
      value = 0 if @value == value and not preventToggle
      @value = value
      @launchpad.top(value+3, Launchpad.GRID_COLORS[value]) unless value == 0
      @gui.stepValue(value)


  selectPattern: (index, skipRedraw) ->
    if(0 <= index <= 7)
      @launchpad.right(@pattern, 0)
      @pattern = index
      @launchpad.right(index, Launchpad.PATTERN_COLOR)
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
    return unless 0 <= t < TRACKS and 0 <= p < PATTERNS and stepValues.length == 60
    @tracks[t].patterns[p].sequence = stepValues
    @_drawPattern(t, p) if t == @track and p == @pattern # update current pattern


  # output the state of the sequencing application.
  writeState: (trackOut, patternOut) ->
    for t in [0...TRACKS]
      track = @tracks[t]
      trackOut(t, track)
      for p in [0...PATTERNS]
        pattern = track.patterns[p]
        patternOut(t, p, pattern)


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

    for x in [0...ROW_LENGTH]
      for y in [0...ROW_LENGTH]
        step = x + y*ROW_LENGTH
        value = pattern.getStep(step)
        @launchpad.grid(x, y, Launchpad.GRID_COLORS[value])
        @gui.grid(x, y, value)

    # and force the active step to show its value:
    @activeStep = -1
    @_drawActiveStep()


  _drawActiveStep: () ->
    selectedPattern = @selectedPattern
    oldActiveStep = @activeStep
    activeStep = selectedPattern.stepForClock(@clock)

    # remove old active step indicators
    if oldActiveStep >= 0
      oldX = oldActiveStep % 8
      oldY = Math.floor(oldActiveStep/8) % 8
      oldValue = selectedPattern.getStep(oldActiveStep)
      oldColor = Launchpad.GRID_COLORS[oldValue]
      @launchpad.grid(oldX, oldY, oldColor)
      @gui.grid(oldX, oldY, oldValue)

    @activeStep = activeStep

    # show the new active step indicators
    if activeStep >= 0
      x = activeStep % 8
      y = Math.floor(activeStep/8) % 8
      color = Launchpad.STEP_COLOR
      @launchpad.grid(x, y, color)
      @gui.grid(x, y, 5)


  _generateOutputForActiveStep: () ->
    clock = @clock
    return if clock < 0

    # generate MIDI output for current step
    for t in [0...TRACKS]
      track = @tracks[t]
      patterns = track.patterns

      # for now, just hardcoding,
      # 1st pattern is gate/velocity, 2nd pitch, 3rd duration, 4th octave
      gate = patterns[0].getStepForClock(clock)
      if gate > 0
        pitch = track.basePitch + patterns[1].getStepForClock(clock)

        # TODO: cache value lookup in Arrays (like with colors)
        velocity = switch gate
          when 1 then 50
          when 2 then 80
          when 3 then 105
          else 127

        duration = patterns[2].getStepForClock(clock)
        duration = 0.5 if duration == 0 # off is half-step duration

        octave = patterns[3].getStepForClock(clock)
        switch octave
          when 1 then pitch += 12
          when 2 then pitch += 24
          when 3 then pitch -= 12
          when 4 then pitch -= 24

        @output(pitch, velocity, duration)
