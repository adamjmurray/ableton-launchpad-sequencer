## Known Issues
- Sometimes the Launchpad button LEDs get stuck when changing values or displaying the active step on the grid.
- Undo/Redo: Redoing a change to pattern steps doesn't work
- Sometimes the first step doesn't output when starting playback from the beginning of the arrangement

## 1.2
- Allow scale UI to select the root and change track pitch to octave + scale offset
  - For velocity gates, this will remain a pitch input
    - Use the track pitch model either way, and get the scale offset from pitch % 12
  - The point of this feature is if you have a pattern that's playing the lowest note in the chord, and you set the chord via MIDI, it will continue to play the lowest note and not be pseudo-randomly mapped the chord note closest to the base pitch
- Option to mute tracks with pitch gates when no midi notes are playing
- Easier way to delete steps in the GUI: Shift + click
- Track edit mode for the Launchpad
  - Hold a pattern button and tap a track 3 times to edit track settings
  - Use pattern buttons to select an option and grid buttons set the value:
    - track pitch
      - Re-tap the pattern button to toggle between 2 pages to access all 128 values
    - track velocity
    - modulation max value
    - aftertouch max value
    - gate type / gate summing mode
    - gate duration
    - step duration multiplier
    - global step length
  - Use the value buttons to do track operations (same as pattern edit mode):
    - track reverse
    - track randomize (every other tap reverts)
    - track copy (every other tap clears)
    - track paste  (every other tap reverts)
- Documentation
  - Thorough annotations for Live's Info view
  - Help tab in the device

## Future
- Reassignable modulation/aftertouch patterns, to change the behavior to things like:
  - octave up/down,
  - pitch/velocity/duration down
  - accidentals (non-scale pitches)
  - more random behaviors
  - other CC values
- Subdivide pattern type
- Expandable GUI view to show all patterns in a track, 1 row per pattern
- Ableton Push support
- Preset/"Scene" system (within the device)
