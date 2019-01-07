import { DEFAULT } from '../config';

export default class Scale {

  constructor({ root = DEFAULT.SCALE_ROOT, offsets = DEFAULT.SCALE_OFFSETS } = {}) {
    this.root = root;
    this.offsets = offsets;
  }

  reset() {
    this.root = DEFAULT.SCALE_ROOT;
    this.offsets = DEFAULT.SCALE_OFFSETS;
  }

  get offsets() {
    return this._offsets;
  }

  set offsets(offsets) {
    this._offsets = offsets.slice();
    this._didSetOffsetsSinceLastToggle = true; // this indicates the GUI changed the offsets
  }

  toggle(pitch, enabled) {
    if (enabled) {
      if (this._didSetOffsetsSinceLastToggle) {
        this._offsets = []; // override what was set in the GUI
        this._didSetOffsetsSinceLastToggle = false;
      }
      if (!this._offsets.length) {
        this.root = pitch.mod(12);
      }
      this._offsets.push(pitch - 60 - this.root); // relative to middle octave
    } else {
      const offset = pitch - 60 - this.root;
      const index = this._offsets.indexOf(offset);
      if (index >= 0) {
        this._offsets.splice(index, 1);
      }
    }
  }

  pitchAt(octave, interval) {
    const length = this._offsets.length;
    if (length) {
      return this._offsets[interval.mod(length)] + 12 * (octave + Math.floor(interval / length));
    }
  }
}
