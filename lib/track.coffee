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

  constructor: (@index, @pitch=60, @velocity=70, @duration=0.9) ->
    @number = @index+1
    @patterns = (new Pattern(index,type) for type,index in Track.DEFAULT_TYPES)
    @multiplier = 1
    @mute = false


  noteForClock: (clock) ->
    return if @mute
    clock = @clockForMultiplier(clock)
    return unless clock?

    note = {
      pitch: @pitch
      velocity: @velocity
      duration: 0 # no note unless a gate or "duration +" pattern turns it on
    }
    pattern.processNote(note,clock) for pattern in @patterns
    note.duration *= @duration * @multiplier # track.duration and multiplier scales the note's duration
    note


  clockForMultiplier: (clock) ->
    # step lengths are longer, so we only trigger every few clock ticks
    if clock % @multiplier == 0
      clock /= @multiplier
    else
      null


  toJSON: ->
    (
      pitch: @pitch
      velocity: @velocity
      duration: @duration
      multiplier: @multiplier
      mute: @mute
      patterns: @patterns
    )

  fromJSON: ({pitch,velocity,duration,multiplier,mute,patterns}) ->
    return unless pitch? and velocity? and duration? and multiplier? and mute? and patterns?.length == PATTERNS
    @pitch = pitch
    @velocity = velocity
    @duration = duration
    @multiplier = multiplier
    @mute = mute
    p.fromJSON patterns[i] for p,i in @patterns
    return