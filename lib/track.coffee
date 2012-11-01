class Track

  @DEFAULT_TYPES = [
    'scale gate'
    'scale +'
    'scale -'
    'octave'
    'velocity +'
    'velocity -'
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
    for pattern in @patterns
      if note.skip # random skip caused next pattern to be skipped
        note.skip = null
        continue
      pattern.processNote(note,clock)

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
    @pitch = pitch if pitch?
    @velocity = velocity if velocity?
    @duration = duration if duration?
    @multiplier = multiplier if multiplier?
    @mute = mute if mute?
    if patterns?.length > 0
      for pattern,i in @patterns
        json = patterns[i]
        pattern.fromJSON(json) if json?
    return