# The controller for the sequencing application.
# Manages state and keeps the views updated.
#
class Sequencer

  constructor: () ->
    @scale = Scale.instance
    @reset(true)


  # Clear all patterns and set all track and pattern properties to their default values.
  reset: () ->
    @stepLength = DEFAULT_STEP_LENGTH
    @scale.setSteps [0..11]
    @globalTranspose = 0
    @tracks = (new Track(index) for index in [0...TRACKS] by 1)
    return


  step: (clockIndex) ->
    return if clockIndex < 0
    for track,index in @tracks
      note = track.noteForClock(clockIndex)
      continue unless note? # no note when track is muted

      if note.duration > 0 and note.velocity > 0
        outlet(NOTE, note.pitch + @globalTranspose, note.velocity, note.duration)

      outlet(CC, 1, note.modulation) if note.modulation?
      outlet(AFTERTOUCH, note.aftertouch) if note.aftertouch?

    return


  toJSON: (options) ->
    json =
      scale: @scale.getSteps()
      stepLength: @stepLength
    json.tracks = @tracks unless options?.omitTracks
    json


  fromJSON: ({scale,stepLength,tracks}) ->
    @scale.setSteps(scale) if scale?
    @stepLength = stepLength if stepLength?
    if tracks?.length > 0
      for track,i in @tracks
        json = tracks[i]
        track.fromJSON(json) if json
    return