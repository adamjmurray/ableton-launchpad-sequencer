Rearchitecture / Rapid LED Update
- Rebuild pattern edit mode support
  - Changing pattern start/end from launchpad
    - Views update propertly
  - top buttons trigger the expected operations
  - exiting the mode
- Get the clock handling working
- Can we pick 8 pattern types and just hard code them:
  - on the launchpad right column:
    vol => velocity (70, 85, 100, 115, 127)
    pan => duration (1, 2, 4, 8, 16 step lengths)
    send A => octave up
    send B => modulation
    stop => random mute
    bottom 3 => 3 "scale gates"
  - optimize around arps and drum seqs
- Could the launchpad pattern edit mode be used to set the pitch and velocity of a track (by holding a LP button while playing a note on the track's MIDI input?)
  - This might be too much, but what about setting the gate and duration multiplier? I could see the feedback being the rows lighting up to show higher values (possibly with column wrap-around - could maybe even simulate a dial by going from bottom left across the top of the grid and then down to bottom right / and pushing a button on the grid will go to the nearest dial location). Maybe some of the pattern buttons can be used for all this, but then how to exit pattern edit mode?
- Combine Pattern and Processor files?
- Remove unwanted features from GUI
- Rebuild GUI using a project and lots of subpatchers
- Undo doesn't work (I think we just need to listen to changes from the pattr object)
- *** Consider splitting up the blob into a bunch of pattrs
  - Pattern grids probably need to be an atomic list, which might be a blob
  - Most other settings like step length, etc, should be pattrs
- Add a subdivide feature and make it the send A or B pattern type (replace octave up)
- When 2 gates hit at the same time, add more scale steps (i.e. treat like scale +)
  - Or if we're in "drum" mode it could increase the velocity (so make it an option, or just have an arp and drum mode that does the right thing)