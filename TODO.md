# TODO

## Soon
- Fix scale GUI
- Dragging a fresh instance of the amxd does not start with the default values
  Do I need to use initial value settings for all the pattrs?
- Can the value button be toggled off on the Launchpad? Logic seems buggy.

- Features
  - Restore clear selected pattern feature
  - Scale support / Track MIDI input
    - Everything works off of absolute pitches determined by the "scale"
    - Add a base pitch to the global scale settings
    - The track pitch setting becomes a number offset from the lowest "scale" note
    - Whatever notes come into the track MIDI input temporarily override the scale notes
  - When 2 gates hit at the same time, have an option to either add more scale steps or increase the velocity. I'm thinking this is better for arp tracks and drum tracks respectively
- GUI improvements
  - Remove unwanted features from GUI
    - Reset (you can just load in a fresh device)
    - Sync (changing track or pattern should re-sync)
    - Debug
    - Maybe hide some/all of these in the help tab?
  - Update help. Do it in a tab?
  - Improve layout
  - Improve color scheme

## Later:
- Preset/"Scene" system (within the device). You can apparently save these with the device using pattrstorage
- Add track edit mode (hold a pattern button and tap a track 3 times) and provide the ability to edit:
  - Using the pattern buttons to select option and then a grid button to change:
    - Track pitch
    - Track velocity
      - Pitch and velocity have 128 values but there are only 64 grid buttons so we need a way to set all 128 OR we can pick a range of sensible values (that's 5+ octaves and we could do odd-numbered velocities or something like)
    - gate
    - step duration multiplier
    - global step length?
    - clear track? (make sure it's undoable)
    - other future functionality, like:
      - option for multiple gates to add scale steps vs velocity (see below)
      - change the CC out for the modation pattern
  - Using the value buttons
    - track reverse
    - track randomize (every other tap reverts, see above)
    - track copy
    - track paste  (every other tap reverts, see above)
- Support non octave repeating scales in GUI (so it works like track MIDI input where you can set any notes arbitrarily)
  - The GUI probably needs an expandable full keyboard view
  - Set velocities of each note via the GUI?
  - Track MIDI input will directly control the "scale" notes and that's it (get rid of all the other functionality)
- expandable GUI view to show all patterns in a track, 1 row per pattern
- Add a subdivide feature and make it the send A or B pattern type (replace octave up)
