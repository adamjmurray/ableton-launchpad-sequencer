## Known Issues
- Sometimes the Launchpad button LEDs get stuck when changing values or displaying the active step on the grid.
- Undo/Redo: Redoing a change to pattern steps doesn't work
- Sometimes the first step doesn't output when starting playback from the beginning of the arrangement

## 1.2
- Improved arpeggiation:
  - Wire up root to GUI and storage (is that the ony thing that changed in the Max<=>JS interface?).
    - When changing the root in the UI, use the offsets to update the scale UI
  - Track "offset" needs a better name / label (interval? use semitons unit style in the UI?)
  - Test MIDI, esp non-repeating scales
- Global aftertouch, modulation summing modes
  - Model it in the code
  - Remove track level settings
  - Hook up to GUI and storage
- Introduce an "add**" ("add++", "addX"?) sum mode that doesn't normalize
  - Support both gate and AT/mod summing
- Global "MIDI latch" option that, when disabled, will mute tracks with pitch gates when no midi notes are playing
  - When notes are latched, any notes _not_ played legato will reset the offsets, legato playing will build up chords

## 1.3
- Adjust randomization to only randomize a fraction (25%?) of the steps
  - On the Laucnhpad, where every other press undoes the change, you might want to randomize multiple times in a row. In this case, tapping on another button, like a grid button, should reset the double-press gesture.
- UI buttons for setting major, minor, etc scales / chords
- Improved UI
  - "Gate" labels for patterns should update to say P.Gate or V.Gate
  - With the velocity gate type, show the pitches next to the V.Gate label (at least in multi sum mode)
- Consider switching velocity pattern to pitch when the gate type is changed (and update labels accordingly)
- Documentation
  - Thorough annotations for Live's Info view

## 1.4
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

## Future
- Expandable GUI view to show all patterns in a track, 1 row per pattern
- Ableton Push support
- Preset/"Scene" system (within the device)
