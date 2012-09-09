class Launchpad

  @color = (green,red) ->
    16*green + red if (0 <= green <= 3) and (0 <= red <= 3)

  @GRID_COLORS: [
    @color(0,0) # off
    @color(3,0) # green
    @color(3,2) # yellow
    @color(2,3) # orange
    @color(0,3) # red
  ]
  @STEP_COLOR: Launchpad.color(1,1) # color for current sequencer step, regardless of value
  @TRACK_COLOR: Launchpad.color(1,2)
  @PATTERN_COLOR: Launchpad.color(2,0)


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
      if velocity > 0
        @onRightDown(y)
      else
        @onRightUp(y)
    else
      if velocity > 0
        @onGridDown(x,y)
      else
        @onGridUp(x,y)


  top: (index, color) ->
    @ctlout(104+index, color) if (0 <= index <= 7)

  grid: (x, y, color) ->
    @noteout(16*y + x, color) if (0 <= x <= 7) and (0 <= y <= 7)

  right: (index,color) ->
    @noteout(16*index + 8, color) if (0 <= index <= 7)

  allOff: ->
    @ctlout(0,0)
