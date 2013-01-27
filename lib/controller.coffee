# Interprets user input from the Launchpad, track MIDI input, and GUI
class Controller

  # Pattern "Ops" modes
  @LENGTH_MODE: 0 # pattern start/end (length)
  @STEPS_MODE: 1  # pattern step values


  constructor : (@sequencer) ->
    @gui = @sequencer.gui
    @scale = Scale.instance
    @_globalTransposes = []
    @_pitchOverrides = []
    @_velocityOverrides = []

  # Track MIDI input
  note : (pitch, velocity) ->
    enabled = velocity > 0

    if pitch < 32
      # TODO? optionally support a toggle mode, instead of only muting while note is held
      @sequencer.mutePattern( Math.floor(pitch/8), pitch % 8, enabled )

    else if pitch < 36
      # TODO? optionally support a toggle mode, instead of only muting while note is held
      @sequencer.muteTrack( pitch - 32, enabled )

    else if pitch < 84
      @trackPitchOverride(pitch, velocity)

    else if pitch < 96
      @scale.overrideStep(pitch - 84, enabled)
      @gui.scale(@scale)

    else if pitch < 128
      @globalTranspose(pitch - 108, enabled)

    return


  trackPitchOverride : (pitch, velocity) ->
    pitchOverrides = @_pitchOverrides
    velocityOverrides = @_velocityOverrides
    if velocity > 0
      index = pitchOverrides.indexOf null
      index = pitchOverrides.length if index < 0
      pitchOverrides[index] = pitch
      velocityOverrides[index] = velocity

      trackIdx = index % 4
      track = @sequencer.tracks[trackIdx]
      if track?
        track.pitchOverride = pitch
        track.velocityOverride = velocity

    else
      index = pitchOverrides.indexOf pitch
      if index >= 0
        pitchOverrides[index] = null
        velocityOverrides[index] = null
        while pitchOverrides[pitchOverrides.length-1] == null
          pitchOverrides.pop()
          velocityOverrides.pop()

      trackIdx = index % 4
      newPitchOverride = null
      newVelocityOverride = null
      # the newPitchOverride becomes the last non-null override for the track
      for i in [trackIdx...pitchOverrides.length] by 4
        if  pitchOverrides[i]?
          newPitchOverride = pitchOverrides[i]
          newVelocityOverride = velocityOverrides[i]

      track = @sequencer.tracks[trackIdx]
      if track?
        track.pitchOverride = newPitchOverride
        track.velocityOverride = newVelocityOverride

    return


  globalTranspose : (amount, enabled) ->
    # TODO: add a global transpose control to the GUI?
    transposes = @_globalTransposes

    if enabled
      transposes.push amount
      @sequencer.globalTranspose = amount

    else
      index = transposes.indexOf amount
      return unless index >= 0
      if index == transposes.length-1
        # the most-recently-pressed key was lifted, so we need to change transposition
        if index > 0
          # use the previously pressed key
          @sequencer.globalTranspose = transposes[index-1]
        else
          # no more keys held, revert to 0
          @sequencer.globalTranspose = 0
      # else the latest pressed key is still held, and nothing changes

      transposes.splice(index,1) # remove the element

    return