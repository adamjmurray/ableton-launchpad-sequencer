class Track

  @DEFAULT_PATTERN_TYPES: [
    'gate'
    'pitch'
    'duration'
    'octave'
  ]

  constructor: (@basePitch) ->
    @basePitch ?= 60
    @patterns = for p in [0...PATTERNS]
      new Pattern(Track.DEFAULT_PATTERN_TYPES[p] or "?")


