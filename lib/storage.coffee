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
    matches =/^track\.(\d+)::(.*)/.exec(path)
    return unless matches?

    trackIndex = parseInt(matches[1]) - 1
    subpath = matches[2]
    track = sequencer.tracks[trackIndex]
    return unless track?

    val = values[0]

    switch subpath
      when 'basePitch'     then track.basePitch     = parseInt val
      when 'baseVelocity'  then track.baseVelocity  = parseInt val
      when 'durationScale' then track.durationScale = parseFloat val

      else
        matches = /^pattern\.(\d+)::(.*)/.exec(subpath)
        return unless matches?

        patternIndex = parseInt(matches[1]) - 1
        property = matches[2]
        pattern = track.patterns[patternIndex]
        return unless pattern?

        switch property
          when 'ptype'    then pattern.setType val
          when 'start'    then pattern.setStart val
          when 'end'      then pattern.setEnd val
          when 'sequence' then sequencer.setPattern trackIndex, patternIndex, values
          else return error "Cannot load unknown property: #{path}"


  save: ->
    tracks = @sequencer.tracks
    for trackIndex in [0...TRACKS] by 1
      track = tracks[trackIndex]
      outlet(3, track.basePitch, track.baseVelocity, track.durationScale, trackIndex+1)

      patterns = track.patterns
      for patternIndex in [0...PATTERNS] by 1
        pattern = patterns[patternIndex]
        outlet(4,
          pattern.type, pattern.start, pattern.end, pattern.sequence,
          patternIndex+1, trackIndex+1
        )
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
    target.sequence = pattern.sequence
    target.start = pattern.start # can skip the setter() here for efficiency
    target.setEnd(pattern.end)   # but we use the proper setter here to trigger _updateLength()
    return