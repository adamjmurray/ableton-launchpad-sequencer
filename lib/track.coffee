class Track

  @DEFAULT_TYPES = [
    'gate'
    'velocity +'
    'velocity -'
    'pitch +'
    'pitch -'
    'octave'
    'duration +'
    'duration -'
  ]

  constructor: (@basePitch=60, @baseVelocity=70, @durationScale=0.99) ->
    @patterns = (new Pattern(type) for type in Track.DEFAULT_TYPES)
    @mute = false


  toggleMute: ->
    @mute = !@mute
    return


  noteForClock: (clock) ->
    return if @mute
    note =
      pitch:    @basePitch
      velocity: @baseVelocity
      duration: 0

    pattern.processNote(note,clock) for pattern in @patterns
    note.duration *= @durationScale
    note if note.duration > 0
