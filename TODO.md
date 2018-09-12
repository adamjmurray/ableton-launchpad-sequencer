Rapid LED Update
-

Code cleanup
- Rename anything that's an index to be *Index
- Rename constants to be more descriptive (like outlet numbers)
- Move color constants elsewhere?

Functionality
- Undo doesn't work (I think we just need to listen to changes from the pattr object)
- Consider splitting up the blob into a bunch of pattrs
  - Pattern grids probably need to be an atomic list, which might be a blob
  - Most other settings like step length, etc, should be pattrs
