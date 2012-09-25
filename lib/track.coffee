class Track

  @DEFAULT_TYPES = [
    'gate'
    'velocity +'
    'velocity -'
    'scale +'
    'scale -'
    'octave'
    'duration +'
    'duration -'
  ]

  constructor: (@index, @scale, @basePitch=60, @baseVelocity=70, @durationScale=0.99) ->
    @number = @index+1
    @patterns = (new Pattern(index,type) for type,index in Track.DEFAULT_TYPES)
    @mute = false


  noteForClock: (clock, scale) ->
    return if @mute
    note =
      scaleStep: 0
      pitch:     @basePitch
      velocity:  @baseVelocity
      duration:  0

    pattern.processNote(note,clock) for pattern in @patterns

    if note.duration > 0 and note.velocity > 0
      note.duration *= @durationScale
      note.pitch += @scale.pitchOffset(note.scaleStep)
      note
