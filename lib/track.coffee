class Track

  @DEFAULT_TYPES = [
    'gate'
    'scale +'
    'scale -'
    'velocity +'
    'velocity -'
    'octave'
    'duration +'
    'duration -'
  ]

  constructor: (@index, @scale, @basePitch=60, @baseVelocity=70, @durationScale=0.9) ->
    @number = @index+1
    Pattern.scale = scale # this is not clean...
    @patterns = (new Pattern(index,type) for type,index in Track.DEFAULT_TYPES)
    @mute = false


  noteForClock: (clock, scale) ->
    return if @mute
    note =
      pitch:      @basePitch
      velocity:   @baseVelocity
      duration:   0

    pattern.processNote(note,clock) for pattern in @patterns

    note.duration *= @durationScale
    note


  toJSON: ->
    (
      pitch: @basePitch
      velocity: @baseVelocity
      duration: @durationScale
      mute: @mute
      patterns: @patterns
    )