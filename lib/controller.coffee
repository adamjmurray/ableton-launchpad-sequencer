# Interprets user input from the Launchpad, track MIDI input, and GUI
class Controller

  constructor : (@sequencer) ->
    @gui = @sequencer.gui
    @scale = Scale.instance
    @_globalTransposes = []
    @_pitchOverrides = []

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
      @trackPitchOverride(pitch, enabled)

    else if pitch < 96
      # TODO? clear original scale as soon as first note is pressed?
      # TODO? when all notes are lifted, revert back to original scale?
      @scale.setStep(pitch - 84, enabled)
      @gui.scale(@scale)

    else if pitch < 128
      @globalTranspose(pitch - 108, enabled)

    return


  trackPitchOverride : (pitch, enabled) ->
    overrides = @_pitchOverrides
    if enabled
      index = overrides.indexOf null
      index = overrides.length if index < 0
      overrides[index] = pitch
      trackIdx = index % 4 # TODO: this needs to be smarter
      @sequencer.tracks[trackIdx]?.pitchOverride = pitch

    else
      index = overrides.indexOf pitch
      overrides[index] = null if index >= 0
      overrides.pop() while overrides[overrides.length-1] == null
      trackIdx = index % 4
      newPitchOverride = null
      # the newPitchOverride becomes the last non-null override for the track
      for i in [trackIdx...overrides.length] by 4
        o = overrides[i]
        newPitchOverride = o if o?
      @sequencer.tracks[trackIdx]?.pitchOverride = newPitchOverride

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