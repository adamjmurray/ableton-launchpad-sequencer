## Known Issues
- Pattern GUI (start/end/mute) doesn't update when changing tracks

## 1.1:
- On 'copy' double press on the Launchpad, clear the pattern ('cut'). Press again to undo.
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
- Modulation and Aftertouch latch option (currently it always latches)
- Control scale and base velocity from MIDI input
- Improve robostness of changing value buttons while the sequencer is running: Sometimes the button LEDs get stuck due to an apparent MIDI throughput issue.
- Improve performance changing pattern start/end step

## 1.2
- Per-track scales
  - Setup the example Live set to have a combination of arpeggios and drums by using an instrument rack
- Track edit mode for the Launchpad
  - Hold a pattern button and tap a track 3 times to edit track settings
  - Use pattern buttons to select an option and grid buttons set the value:
    - track pitch
      - Re-tap the pattern button to toggle between 2 pages to access all 128 values
    - track velocity
      - Re-tap the pattern button to toggle pages
    - gate
    - step duration multiplier
    - modes for summing simultaneous gates + modulation and aftertouch latch setting
    - global step length (since there's no other way to edit this on the Launchpad)
    - scale
    - future placeholder: reassignable pattern types
  - Use the value buttons to:
    - track reverse
    - track randomize (every other tap reverts)
    - track copy (every other tap clears)
    - track paste  (every other tap reverts)
- Documentation
  - Thorough annotations for Live's Info view
  - Help tab in the device

## 1.3
- Allow the modulation/aftertouch patterns to be reassignable to other operations (octave up, subdivide, pitch/scale/octave/velocity/duration down)
  - support in track edit mode
- Subdivide pattern type

## Future
- Expandable full keyboard view to pick arbitrary notes for the step values instead of the scale
- Expandable GUI view to show all patterns in a track, 1 row per pattern
- Ableton Push support
- Preset/"Scene" system (within the device)
