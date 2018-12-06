## Known Issues
- The first time you start Live's transport, if the playhead is not at the beginning (time 0) the sequencer will not start
- Sometimes the Launchpad button LEDs get stuck when changing values or displaying the active step on the grid.

## 1.1:
- Track-level operations / settings:
  - reverse
  - randomize
  - copy
  - paste
  - clear
  - Modes for handling simultaneous gates on a step:
    - lowest pitch
    - highest pitch
    - random pitch
    - add pitches
    - add velocities
    - add durations
  - Modulation and Aftertouch latch option (add an "L" button next to the pattern descriptions)

## 1.2
- Per-track ignore scale option for drum tracks
  - Provide an example Live set with a combination of arpeggios and drums by using an instrument rack
- Control scale and base velocity from MIDI input
- Constrain all notes to scale pitches (so you can change chords with MIDI and only chord notes will play)

## 1.3
- Track edit mode for the Launchpad
  - Hold a pattern button and tap a track 3 times to edit track settings
  - Use pattern buttons to select an option and grid buttons set the value:
    - track pitch
      - Re-tap the pattern button to toggle between 2 pages to access all 128 values
    - track velocity
      - Re-tap the pattern button to toggle pages
    - gate
    - step duration multiplier
    - Modes for handling simultaneous gates on a step
    - modulation and aftertouch latch setting
    - ignore scale
    - global step length (there's no other way to edit this on the Launchpad)
  - Use the value buttons to do track operations (same as pattern edit mode):
    - track reverse
    - track randomize (every other tap reverts)
    - track copy (every other tap clears)
    - track paste  (every other tap reverts)
- Documentation
  - Thorough annotations for Live's Info view
  - Help tab in the device

## Future
- Reassignable modulation/aftertouch patterns (change the behavior to octave up, pitch/octave/velocity/duration down, more random behaviors)
- Subdivide pattern type
- Expandable GUI view to show all patterns in a track, 1 row per pattern
- Ableton Push support
- Preset/"Scene" system (within the device)
