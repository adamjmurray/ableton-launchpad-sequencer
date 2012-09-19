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

  constructor: (@index, @basePitch=60, @baseVelocity=70, @durationScale=0.99) ->
    @number = @index+1
    @patterns = (new Pattern(index,type) for type,index in Track.DEFAULT_TYPES)
    @mute = false


  noteForClock: (clock) ->
    return if @mute
    note =
      pitch:    @basePitch
      velocity: @baseVelocity
      duration: 0

    pattern.processNote(note,clock) for pattern in @patterns
    note.duration *= @durationScale
    note if note.duration > 0
