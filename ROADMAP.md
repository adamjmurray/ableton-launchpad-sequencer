## Known Issues
- Sometimes the Launchpad button LEDs get stuck when changing values or displaying the active step on the grid.
- Undo/Redo: Redoing a change to pattern steps doesn't work
- Sometimes the first step doesn't output when starting playback from the beginning of the arrangement

## 1.2
- Improved arpeggiation:
  - Allow scale UI to select the root
  - Change track pitch to octave + scale offset (for pitch gates only)
  - Pitch gate step value 1 plays the root of the scale
  - When setting the scale from MIDI allow arbitrary notes that don't repeat at the octave
- Easier way to delete steps in the GUI: Shift + click
- Global "MIDI latch" option that, when disabled, will mute tracks with pitch gates when no midi notes are playing
- Global aftertouch, modulation summing modes, instead of track level settings
- Track edit mode for the Launchpad
  - Hold a pattern button and tap a track 3 times to edit track settings
  - Use pattern buttons to select an option and grid buttons set the value:
    - track pitch
      - Re-tap the pattern button to toggle between 2 pages to access all 128 values
    - track velocity
    - gate type / gate summing mode
    - gate duration
    - step duration multiplier
    - global step length
    - global aftertouch / modulation summing mode
    - global MIDI latch option
  - Use the value buttons to do track operations (same as pattern edit mode):
    - track reverse
    - track randomize (every other tap reverts)
    - track copy (every other tap clears)
    - track paste  (every other tap reverts)
- Documentation
  - Thorough annotations for Live's Info view
  - Help tab in the device

## Future
- Expandable GUI view to show all patterns in a track, 1 row per pattern
- Ableton Push support
- Preset/"Scene" system (within the device)
