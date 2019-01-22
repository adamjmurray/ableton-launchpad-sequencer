## Known Issues
- Sometimes the Launchpad button LEDs get stuck when changing values or displaying the active step on the grid.
- Undo/Redo: Redoing a change to pattern steps doesn't work
- Sometimes the first step doesn't output when starting playback from the beginning of the arrangement

## 1.2
- A slider for the AT/mod slew: 0% is an immediate step to the value, 100% transitions over the step duration

## 1.3
- Improved UI
  - "Gate" labels for patterns should update to say P.Gate or V.Gate
  - With the velocity gate type in multi-sum mode, show +1 and +2 labels next to the V.Gate to indicate the pitches are higher
- Switch the velocity pattern to a pitch pattern when using velocity gates (and update labels accordingly)
- Double tap Launchpad grid button or GUI button to unset note
- Documentation - thorough annotations for Live's Info view

## Future
- Expandable GUI view to show all patterns in a track, 1 row per pattern
- Ableton Push support
- Preset/"Scene" system (within the device)
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
