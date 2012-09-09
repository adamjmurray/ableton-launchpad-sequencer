# A pattern corresponds to the 8x8 grid of buttons on the Launchpad.
#
# It consists of 64 steps with integer values (typically 0-4 for off,green,yellow,orange,red lights),
# a start step, and an end step.
#
class Pattern

  constructor: (@type, @defaultValue = 0) ->
    @sequence = (@defaultValue for i in [0...STEPS])
    @start = 0
    @end = STEPS - 1
    @_updateLength()


  setType: (type) ->
    @type = type


  setStart: (index) ->
    if(0 <= index < STEPS)
      @start = parseInt(index)
      @end = @start if @start > @end
      @_updateLength()


  setEnd: (index) ->
    if(0 <= index < STEPS)
      @end = parseInt(index)
      @start = @end if @start > @end
      @_updateLength()


  getStep: (index) ->
    return @sequence[index];

  setStep: (index, value) ->
    if(0 <= index < STEPS)
      @sequence[index] = value


  # Given a clock index (in steps) return the active step in this pattern,
  # taking into account the start and end step.
  #
  stepForClock: (clock) ->
    if(clock >= 0)
      (clock % @length) + @start
    else
      -1


  getStepForClock: (clock) ->
    @getStep(@stepForClock clock)


  _updateLength: ->
    @length = @end - @start + 1
