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
    noop = ->
    @noteout = noop
    @ctlout = noop
    @onTopDown = noop
    @onTopUp = noop
    @onRightDown = noop
    @onRightUp = noop
    @onGridDown = noop
    @onGridUp = noop


  ctlin: (cc, value) ->
    index = cc - 104
    if value > 0
      @onTopDown(index)
    else
      @onTopUp(index)


  notein: (pitch, velocity) ->
    x = pitch % 16
    y = Math.floor(pitch / 16)
    if x > 7
      if velocity > 0 then @onRightDown(y)  else @onRightUp(y)
    else
      if velocity > 0 then @onGridDown(x,y) else @onGridUp(x,y)


  _top: (index, color) ->  @ctlout(104+index, color) if (0 <= index <= 7)

  _grid: (x, y, color) ->  @noteout(16*y + x, color) if (0 <= x <= 7) and (0 <= y <= 7)

  _right: (index,color) -> @noteout(16*index + 8, color) if (0 <= index <= 7)


  allOff: -> @ctlout(0,0)


  track: (trackIndex) -> @_top(trackIndex, Launchpad.TRACK_COLOR)

  trackOff: (trackIndex) -> @_top(trackIndex, Launchpad.OFF)


  stepValue: (stepValue) -> @_top(stepValue+3, Launchpad.GRID_COLORS[stepValue]) if stepValue > 0

  stepValueOff: (stepValue) -> @_top(stepValue+3, Launchpad.OFF) if stepValue > 0


  pattern: (patternIndex) -> @_right(patternIndex, Launchpad.PATTERN_COLOR)

  patternOff: (patternIndex) -> @_right(patternIndex, Launchpad.OFF)


  grid: (x, y, value) -> @_grid(x, y, Launchpad.GRID_COLORS[value])

  activeStep: (x, y) -> @_grid(x, y, Launchpad.STEP_COLOR)

