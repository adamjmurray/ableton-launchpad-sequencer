# Scheduler for expensive tasks that need to run in chunks to avoid MIDI timing issues.
class Defer

  # Call the callback for each pattern step position (x,y,stepIndex)
  # Uses a deferring mechanism for performance
  @eachStep: (callback) =>
    @_nextRow.cancel() if @_nextRow? # stop any existing scheduled activity
    @_eachRow(callback, 0)
    return

  @_eachRow: (callback, y) =>
    for x in [0...ROW_LENGTH] by 1
      callback(x, y, x+y*ROW_LENGTH)
    y += 1
    if y < ROW_LENGTH
      @_nextRow = new Task(@_eachRow, this, callback, y)
      @_nextRow.schedule(DEFER_DELAY)
    else
      @_nextRow = null
    return
