# Interprets user input from the Launchpad, track MIDI input, and GUI
class Controller

  constructor : (@sequencer) ->
    @gui = @sequencer.gui
    @scale = Scale.instance
    @_globalTransposes = []


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
      @trackPitch(pitch, enabled)

    else if pitch < 96
      @scale.setStep(pitch - 84, enabled)
      @gui.scale(@scale)

    else if pitch < 128
      @globalTranspose(pitch - 108, enabled)

    return


  trackPitch : (pitch, enabled) ->
    @pitchedTrack = -1
    @trackTranspose = []
    console.log "#{if isOn then '' else 'un'}set track pitch to #{pitch}"
    if enabled
      index = trackTranspose.indexOf null
      index = trackTranspose.length if index < 0
      trackTranspose[index] = pitch

      pitchedTrack = (pitchedTrack + 1) % 4
      sequencer.tracks[pitchedTrack]?.pitchOverride = pitch
      # TODO: keep track of how many of these are held, and that will map to the track index

    else
      index = trackTranspose.indexOf pitch
      trackTranspose[index] = null if index >= 0
      trackTranspose.splice(pitchIndex,1) if pitchIndex >= 0 # delete the pitch
    # TODO: I think a better way is to null out any released notes, then...
    # null values should revert the track to it's base pitch (or the previous value mod 4)
    # when a new note is held, it will fill in the first null value
    # when all values are null (no notes held), reset the array to empty


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