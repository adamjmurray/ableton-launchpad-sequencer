
import { ROW_LENGTH, DEFER_DELAY } from './config';

// TODO: test if this file is still necessary

// Scheduler for expensive tasks that need to run in chunks to avoid MIDI timing issues.
export default class Defer {

  // Call the callback for each pattern step position (x,y,stepIndex)
  // Uses a deferring mechanism for performance
  static eachStep(callback) {
    if (this._nextRow) { this._nextRow.cancel(); } // stop any existing scheduled activity
    this._eachRow(callback, 0);
  };

  static _eachRow(callback, y) {
    for (let x = 0; x < ROW_LENGTH; x++) {
      callback(x, y, x + y * ROW_LENGTH);
    }
    y += 1;
    if (y < ROW_LENGTH) {
      this._nextRow = new Task(this._eachRow, this, callback, y);
      this._nextRow.schedule(DEFER_DELAY);
    } else {
      this._nextRow = null;
    }
  }
};
