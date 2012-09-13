# A pattern corresponds to the 8x8 grid of buttons on the Launchpad.
#
# It consists of 64 steps with integer values (typically 0-4 for off,green,yellow,orange,red lights),
# a start step, and an end step.
#
class Pattern

  constructor: (type) ->
    @sequence = new Array(STEPS)
    @clear()
    @start = 0
    @end = STEPS - 1
    @_updateLength()
    @setType(type)


  clear: ->
    @sequence[i] = 0 for i in [0...STEPS] by 1
    return

  random: ->
    @sequence[i] = Math.floor(5*Math.random()) for i in [0...STEPS] by 1
    return

  setType: (type) ->
    @type = type
    @_process = Pattern.processors[type] or NOOP
    return

  setStart: (index) ->
    if 0 <= index < STEPS
      @start = parseInt(index)
      @end = @start if @start > @end
      @_updateLength()
    return

  setEnd: (index) ->
    if 0 <= index < STEPS
      @end = parseInt(index)
      @start = @end if @start > @end
      @_updateLength()
    return


  _updateLength: ->
    @length = @end - @start + 1
    return

  getStep: (index) ->
    @sequence[index]

  setStep: (index, value) ->
    @sequence[index] = value if 0 <= index < STEPS
    return


  # Given a clock index (in steps) return the active step in this pattern,
  # taking into account the start and end step.
  #
  stepIndexForClock: (clock) ->
    if clock >= 0 then (clock % @length) + @start else -1

  getStepForClock: (clock) ->
    @getStep(@stepIndexForClock clock)


  # Given a note in the form of a JS object:
  # {
  #   pitch: <MIDI pitch (0-127)>,
  #   velocity: <MIDI velocity (0-127)>,
  #   duration: <pulses/quarter note beats (float)>
  # }
  # modify the note for this pattern's value at the given clock index.
  # Returns the note.
  #
  processNote: (note, clock) ->
    value = @getStepForClock(clock)
    @_process(note, value) if value > 0 # NOTE: major assumption 0 is always a NOOP! But a good optimization...
    note


  @DURATIONS = [0,1,2,4,8]
  @VELOCITY_SCALERS = [1, 1.2, 1.4, 1.6, 1.8]

  @CHROMATIC = [0,1,2,3,4]
  @MAJOR = [0,2,4,5,7]
  @MINOR = [0,2,3,5,7]
  @PENTATONIC_MAJOR = [0,2,4,7,9]
  @PENTATONIC_MINOR = [0,3,5,7,10]
  @OCTAVES = [0, 12, 24, -12, -24]

  @processors =
    gate:             (note, value) => note.duration += @DURATIONS[value]; return
    'velocity +':     (note, value) => note.velocity += (127 - note.velocity) * value/4; return
    'velocity -':     (note, value) => note.velocity -= note.velocity * value/4; return # assumes we filtered out 0 in processNote()
    pitch:            (note, value) => note.pitch    += @CHROMATIC[value]; return
    major:            (note, value) => note.pitch    += @MAJOR[value]; return
    minor:            (note, value) => note.pitch    += @MINOR[value]; return
    pentatonic_major: (note, value) => note.pitch    += @PENTATONIC_MAJOR[value]; return
    pentatonic_minor: (note, value) => note.pitch    += @PENTATONIC_MINOR[value]; return
    octave:           (note, value) => note.pitch    += @OCTAVES[value]; return
