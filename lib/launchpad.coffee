class Launchpad

  @color = (green,red) ->
    16*green + red if (0 <= green <= 3) and (0 <= red <= 3)


  @OFF:    @color(0,0)
  @GREEN:  @color(3,0)
  @YELLOW: @color(3,2)
  @ORANGE: @color(2,3)
  @RED:    @color(0,3)
  @GRID_COLORS: [@OFF, @GREEN, @YELLOW, @ORANGE, @RED]

  @STEP_COLOR:    @color(1,1) # color for current sequencer step, regardless of value
  @TRACK_COLOR:   @color(1,2)
  @PATTERN_COLOR: @color(2,0)


  constructor: ->
    @noteout     = NOOP
    @ctlout      = NOOP
    @onTopDown   = NOOP
    @onTopUp     = NOOP
    @onRightDown = NOOP
    @onRightUp   = NOOP
    @onGridDown  = NOOP
    @onGridUp    = NOOP


  ctlin: (cc, value) ->
    index = cc - 104
    if value > 0
      @onTopDown(index)
    else
      @onTopUp(index)
    return


  notein: (pitch, velocity) ->
    x = pitch % 16
    y = Math.floor(pitch / 16)
    if x > 7
      if velocity > 0 then @onRightDown(y)  else @onRightUp(y)
    else
      if velocity > 0 then @onGridDown(x,y) else @onGridUp(x,y)
    return


  ctlout: (cc, value) ->
    outlet(1, cc, value)
    return


  noteout: (pitch, velocity) ->
    outlet(0, pitch, velocity)
    return


  allOff: ->
    @ctlout(0,0)
    return

  track: (trackIndex) ->
    @_top(trackIndex, Launchpad.TRACK_COLOR)
    return

  trackOff: (trackIndex) ->
    @_top(trackIndex, Launchpad.OFF)
    return


  stepValue:    (stepValue) ->
    @_top(stepValue+3, Launchpad.GRID_COLORS[stepValue]) if stepValue > 0
    return

  stepValueOff: (stepValue) ->
    @_top(stepValue+3, Launchpad.OFF) if stepValue > 0
    return


  pattern:    (patternIndex) ->
    @_right(patternIndex, Launchpad.PATTERN_COLOR)
    return

  patternOff: (patternIndex) ->
    @_right(patternIndex, Launchpad.OFF)
    return


  grid: (x, y, value) ->
    @_grid(x, y, Launchpad.GRID_COLORS[value])
    return


  activeStep: (x, y) ->
    @_grid(x, y, Launchpad.STEP_COLOR)
    return


  # ==============================================================================
  # private

  _top:   (index, color) ->
    @ctlout(104+index, color) if (0 <= index <= 7)
    return

  _grid:   (x, y, color) ->
    @noteout(16*y + x, color) if (0 <= x <= 7) and (0 <= y <= 7)
    return

  _right: (index, color) ->
    @noteout(16*index + 8, color) if (0 <= index <= 7)
    return
