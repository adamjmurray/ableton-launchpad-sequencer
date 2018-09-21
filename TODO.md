Rapid LED Update
- Re-architect into EventHandler -> Controller -> Model -> View

Code cleanup
- Rename anything that's an index to be *Index

Functionality
- Can we pick 8 pattern types and just hard code them?
  Definitely want ability for polyrhythms (by setting pitch on a step), set velocity, duration, step up/down, random mute
  - on the launchpad right column:
    vol => velocity (70, 85, 100, 115, 127)
    pan => duration (1, 2, 4, 8, 16 step lengths)
    send A => scale up ??
    send B => octave up ??
    stop => random mute
    bottom 3 => 3 "scale gates"
  - optimize around arps and drum seqs
- Change utils.mod into a polyfill for Number.prototype.mod
- Undo doesn't work (I think we just need to listen to changes from the pattr object)
- Consider splitting up the blob into a bunch of pattrs
  - Pattern grids probably need to be an atomic list, which might be a blob
  - Most other settings like step length, etc, should be pattrs
- Add a subdivide feature and make it the send A or B pattern type
- When 2 gates hit at the same time, add more scale steps (i.e. trreat like scale +)