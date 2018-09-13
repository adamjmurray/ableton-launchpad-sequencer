// TODO: Deprecated. We should be able to get rid of this when rapid update is done

import { NUMBER_OF } from './config';

const DEFER_DELAY = 20; // How often (in ms) to schedule chunks of work. See Defer class.

// Scheduler for expensive tasks that need to run in chunks to avoid MIDI timing issues.
export default class Defer {

  // Call the callback for each pattern step position (x,y,stepIndex)
  // Uses a deferring mechanism for performance
  static eachStep(callback) {
    if (this._nextRow) { this._nextRow.cancel(); } // stop any existing scheduled activity
    this._eachRow(callback, 0);
  };

  static _eachRow(callback, y) {
    for (let x = 0; x < NUMBER_OF.COLUMNS; x++) {
      callback(x, y, x + y * NUMBER_OF.COLUMNS);
    }
    y += 1;
    if (y < NUMBER_OF.ROWS) {
      this._nextRow = new Task(this._eachRow, this, callback, y);
      this._nextRow.schedule(DEFER_DELAY);
    } else {
      this._nextRow = null;
    }
  }
};
