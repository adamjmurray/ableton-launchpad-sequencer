# The interface to the pattr persistence system in Max, and a copy/paste clipboard.
class Storage

  constructor: (@sequencer) ->


  load: (path, values...) ->
    sequencer = @sequencer

    if(path == 'dump') # we're done
      sequencer.redraw()
      return

    # paths look like:
    # track.1::basePitch 60.
    # track.1::pattern.1::sequence 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    # track.1::pattern.1::ptype gate
    # track.1::pattern.1::start 0
    # track.1::pattern.1::end 63
    matches =/^t\.(\d+)::(.*)/.exec(path)
    return unless matches?

    trackIndex = parseInt(matches[1]) - 1
    subpath = matches[2]
    track = sequencer.tracks[trackIndex]
    return unless track?

    val = values[0]

    switch subpath
      when 'p' then track.basePitch     = parseInt val
      when 'v' then track.baseVelocity  = parseInt val
      when 'd' then track.durationScale = parseFloat val
      when 'm' then track.mute          = (parseInt(val) > 0)

      else
        matches = /^n\.(\d+)::(.*)/.exec(subpath)
        return unless matches?

        patternIndex = parseInt(matches[1]) - 1
        property = matches[2]
        pattern = track.patterns[patternIndex]
        return unless pattern?

        switch property
          when 't' then pattern.setType val
          when 's' then pattern.setStart val
          when 'e' then pattern.setEnd val
          when 'q' then sequencer.setPattern trackIndex, patternIndex, values
          when 'm' then pattern.mute = val
          else error "Cannot load unknown property: #{path}"
    return


  save: ->
    tracks = @sequencer.tracks
    for trackIndex in [0...TRACKS] by 1
      track = tracks[trackIndex]
      trackNumber = trackIndex+1
      @saveTrackAttr trackNumber, 'p', track.basePitch
      @saveTrackAttr trackNumber, 'v', track.baseVelocity
      @saveTrackAttr trackNumber, 'd', track.durationScale
      @saveTrackAttr trackNumber, 'm', track.mute

      patterns = track.patterns
      for patternIndex in [0...PATTERNS] by 1
        pattern = patterns[patternIndex]
        patternNumber = patternIndex+1
        @savePatternAttr trackNumber, patternNumber, 't', pattern.type
        @savePatternAttr trackNumber, patternNumber, 's', pattern.start
        @savePatternAttr trackNumber, patternNumber, 'e', pattern.end
        @savePatternAttr trackNumber, patternNumber, 'q', pattern.sequence
        @savePatternAttr trackNumber, patternNumber, 'm', if pattern.mute then 1 else 0
    return

  saveTrackAttr: (trackNumber, attrName, attrValue) ->
    outlet PATTR, attrValue, "t.#{trackNumber}::#{attrName}"
    return

  savePatternAttr: (trackNumber, patternNumber, attrName, attrValue) ->
    outlet PATTR, attrValue, "t.#{trackNumber}::n.#{patternNumber}::#{attrName}"
    return


  # Copy the given pattern to the clipboard.
  # This inclues the 64 step values and the start and end step.
  # It does not copy the pattern.type, to allow for sharing patterns between different pattern types.
  copyPattern: (pattern) ->
    @patternClipboard =
      sequence: pattern.sequence
      start: pattern.start
      end: pattern.end
    return

  # Update the give target pattern to match the one in the clipboard
  pastePattern: (target) ->
    pattern = @patternClipboard
    return unless pattern?
    target.sequence = pattern.sequence[..] # make a copy
    target.start = pattern.start # can skip the setter() here for efficiency
    target.setEnd(pattern.end)   # but we use the proper setter here to trigger _updateLength()
    return