/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Scheduler for expensive tasks that need to run in chunks to avoid MIDI timing issues.
class Defer {
  static initClass() {
  
    // Call the callback for each pattern step position (x,y,stepIndex)
    // Uses a deferring mechanism for performance
    this.eachStep = callback => {
      if (this._nextRow != null) { this._nextRow.cancel(); } // stop any existing scheduled activity
      this._eachRow(callback, 0);
    };
  
    this._eachRow = (callback, y) => {
      for (let x = 0, end = ROW_LENGTH; x < end; x++) {
        callback(x, y, x+(y*ROW_LENGTH));
      }
      y += 1;
      if (y < ROW_LENGTH) {
        this._nextRow = new Task(this._eachRow, this, callback, y);
        this._nextRow.schedule(DEFER_DELAY);
      } else {
        this._nextRow = null;
      }
    };
  }
}
Defer.initClass();
