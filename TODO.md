Rearchitecture / Rapid LED Update
- Finish view-updating logic
- Test in the Device
- Can we pick 8 pattern types and just hard code them:
  - on the launchpad right column:
    vol => velocity (70, 85, 100, 115, 127)
    pan => duration (1, 2, 4, 8, 16 step lengths)
    send A => scale up ??
    send B => octave up ??
    stop => random mute
    bottom 3 => 3 "scale gates"
  - optimize around arps and drum seqs
- Remove unwanted features from GUI
- Rebuild GUI using a project and lots of subpatchers
- Undo doesn't work (I think we just need to listen to changes from the pattr object)
- Consider splitting up the blob into a bunch of pattrs
  - Pattern grids probably need to be an atomic list, which might be a blob
  - Most other settings like step length, etc, should be pattrs
- Add a subdivide feature and make it the send A or B pattern type
- When 2 gates hit at the same time, add more scale steps (i.e. treat like scale +)