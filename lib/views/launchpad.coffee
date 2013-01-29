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

  @INACTIVE_GREEN:  @color(2,0)
  @INACTIVE_YELLOW: @color(2,1)
  @INACTIVE_ORANGE: @color(1,2)
  @INACTIVE_RED:    @color(0,2)
  @INACTIVE_GRID_COLORS: [@OFF, @INACTIVE_GREEN, @INACTIVE_YELLOW, @INACTIVE_ORANGE, @INACTIVE_RED]
  @ACTIVE_GRID_COLORS: [@STEP_COLOR, @GREEN, @YELLOW, @ORANGE, @RED]

  @TRACK_COLOR:   @color(1,2)
  @PATTERN_COLOR: @color(2,0)

  @MUTE_COLOR:          @color(0,3)
  @INACTIVE_MUTE_COLOR: @color(0,1)


  constructor: ->
    @patternOpsMode = false


  ctlout: (cc, value) ->
    outlet LAUNCHPAD_CC, cc, value
    return


  noteout: (pitch, velocity) ->
    outlet LAUNCHPAD_NOTE, pitch, velocity
    return


  allOff: ->
    @ctlout(0,0)
    return


  track: (track) ->
    color = if track.mute then Launchpad.MUTE_COLOR else Launchpad.TRACK_COLOR
    @_top(track.index, color)
    return

  trackOff: (track) ->
    color = if track.mute then Launchpad.INACTIVE_MUTE_COLOR else Launchpad.OFF
    @_top(track.index, color)
    return


  stepValue: (stepValue) ->
    @_top(stepValue+3, Launchpad.GRID_COLORS[stepValue]) if stepValue > 0
    return

  stepValueOff: (stepValue) ->
    @_top(stepValue+3, Launchpad.OFF) if stepValue > 0
    return


  pattern: (pattern) ->
    color = if pattern.mute then Launchpad.MUTE_COLOR else Launchpad.PATTERN_COLOR
    @_right(pattern.index, color)
    return

  patternOff: (pattern) ->
    color = if pattern.mute then Launchpad.INACTIVE_MUTE_COLOR else Launchpad.OFF
    @_right(pattern.index, color)
    return


  grid: (x, y, value) ->
    @_grid(x, y, Launchpad.GRID_COLORS[value])
    return


  activeStep: (x, y) ->
    @_grid(x, y, Launchpad.STEP_COLOR)
    return


  patternSteps: (pattern, additionalDeferredCallback) ->
    self = @
    if @patternOpsMode   # Use the grid to show the pattern length by lighting up all the steps from the start to the end step
      start = pattern.start
      end = pattern.end
      Defer.eachStep (x,y,index) ->
        stepValue = pattern.getStep(index)
        color = if start <= index <= end then Launchpad.ACTIVE_GRID_COLORS[stepValue] else Launchpad.INACTIVE_GRID_COLORS[stepValue]
        self._grid(x, y, color)
        additionalDeferredCallback(x, y, stepValue) if additionalDeferredCallback?
        return
    else
      Defer.eachStep (x,y,index) ->
        stepValue = pattern.getStep(index)
        self._grid(x, y, Launchpad.GRID_COLORS[stepValue])
        additionalDeferredCallback(x, y, stepValue) if additionalDeferredCallback?
        return
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
