## Known Issues
- The first time you start Live's transport, if the playhead is not at the beginning (time 0) the sequencer will not start
- Sometimes the Launchpad button LEDs get stuck when changing values or displaying the active step on the grid.

## 1.1
- Track-level operations / settings:
  - reverse
  - randomize
  - copy
  - paste
  - clear
    - Note: Check how many undo points these operations create. If it creates 8, probably can't do anything about it besides make a feature request to C74 and list in Known Issues for now.
  - "Gate Summing" modes for handling simultaneous gate values on a step:
    - add
    - lowest
    - highest
    - random
  - Modulation and Aftertouch latch option (add an "L" button next to the pattern descriptions)

## 1.2
- Constrain all notes to scale pitches so arpeggiations work as expected
- Per-track ignore scale option for drum tracks or sound FX
  - Provide an example Live set with a combination of arpeggios and drums by using an instrument rack
- Track-level option for gate pattern type (affecting all 3 gate patterns in the track):
  - pitch (good for arps, melodies, and multi-drum patterns)
  - velocity (good for single drum patterns or repetitive bass notes or sound FX)
    - Note: "Gate Summing" will operate on the note property corresponding to the type of gate
- Allow scale UI to select the root and change track pitch to octave + scale offset
  - When the scale is being overriden, this will remain a pitch input
    - It's probably easiest to use the track pitch model either way, and get the scale offset from pitch % 12
  - The point of this feature is if you have a pattern that's playing the lowest note in the chord, and you set the chord via MIDI, it will continue to play the lowest note and not be pseudo-randomly mapped the chord note closest to the base pitch
- Set the scale from MIDI input

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
    - "Gate Summing" modes
    - modulation and aftertouch latch setting
    - ignore scale
    - Gate pattern type
    - global step length (there's no other way to edit this on the Launchpad)
      - Note there are 9 setting shere but only 8 buttons. We can combine some of these
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
