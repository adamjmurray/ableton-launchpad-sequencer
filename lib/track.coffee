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
    @mute = false


  noteForClock: (clock) ->
    return if @mute
    note =
      pitch: @pitch
      velocity: @velocity
      duration: 0 # no note unless a gate or "duration +" pattern turns it on

    pattern.processNote(note,clock) for pattern in @patterns

    note.duration *= @duration # track.duration scales the note's duration
    note


  toJSON: ->
    (
      pitch: @pitch
      velocity: @velocity
      duration: @duration
      mute: @mute
      patterns: @patterns
    )

  fromJSON: ({pitch,velocity,duration,mute,patterns}) ->
    return unless pitch? and velocity? and duration? and mute? and patterns?.length == PATTERNS
    @pitch = pitch
    @velocity = velocity
    @duration = duration
    @mute = mute
    p.fromJSON patterns[i] for p,i in @patterns
    return