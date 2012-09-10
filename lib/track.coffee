class Track

  @DEFAULT_TYPES = [
    'gate'
    'pitch'
    'velocity'
    'octave'
    'major'
    'minor'
    'pentatonic_major'
    'pentatonic_minor'
  ]

  constructor: (@basePitch=60, @baseVelocity=71, @baseDuration=1.0) ->
    @patterns = (new Pattern(type) for type in Track.DEFAULT_TYPES)


  noteForClock: (clock) ->
    # for efficiency, first check the gate track (or tracks?) and bail right away
    # this will need to be adapted for reconfigurable patterns
    if @patterns[0].getStepForClock(clock) > 0
      note =
        pitch:    @basePitch
        velocity: @baseVelocity
        duration: @baseDuration
      pattern.processNote(note,clock) for pattern in @patterns
      note
    else
      null
