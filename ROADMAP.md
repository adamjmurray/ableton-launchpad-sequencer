## 1.1:
- Control step value pitches and base velocity from MIDI input
- Improve performance changing pattern start/end step
- On 'copy' double press on the Launchpad, clear the pattern ('cut'). Press again to undo.
- Track-level operations / settings:
  - reverse
  - randomize
  - copy
  - paste
  - clear
  - CC value for the modulation pattern
  - 2 modes for summing simultaneous gates on a step:
    - increase pitch
    - increase velocities
- Right-click to clear step value in GUI
- Track and pattern mute indicators in the GUI live.tab components (via an overlay)
- Improve robostness of changing value buttons while the sequencer is running: Sometimes the button LEDs get stuck due to an apparent MIDI throughput issue.
- Does a step value of 1 on the Duration pattern do anything?

## 1.2
- Documentation
  - Thorough annotations for Live's Info view
  - Help tab in the device
- Track edit mode for the Launchpad
  - Hold a pattern button and tap a track 3 times to edit track settings
  - Use pattern buttons to select an option and grid buttons set the value:
    - track pitch
      - Re-tap the pattern button to toggle between 2 pages to access all 128 values
    - track velocity
      - Re-tap the pattern button to toggle pages
    - gate
    - step duration multiplier
    - CC value for the modulation pattern
    - modes for summing simultaneous gates
    - global step length (since there's no other way to edit this on the Launchpad)
  - Use the value buttons to:
    - track reverse
    - track randomize (every other tap reverts)
    - track copy (every other tap clears)
    - track paste  (every other tap reverts)

## Future
- Expandable full keyboard view to pick arbitrary notes for the step values instead of the scale
- Expandable GUI view to show all patterns in a track, 1 row per pattern
- Add a subdivide feature and replace octave up
- Ableton Push support
- Preset/"Scene" system (within the device)