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
    this._didSetOffsetsSinceLastToggle = true;
  }

  toggle(pitch, enabled) {
    if (this._offsetsSetSinceLastToggle) {
      this._offsets = [];
      this.root = pitch;
      this._didSetOffsetsSinceLastToggle = false;
      // TODO: the view will need to update the root too (maybe just do it every time, the view code can filter out when it doesn't change)
    }
    const offset = pitch - 60; // relative to middle C
    if (enabled) {
      this._offsets.push(offset);
    } else {
      const index = this._offsets.indexOf(offset);
      if (index >= 0) {
        this._offsets.splice(index, 1);
      }
    }
    // TODO: The GUI view will need to mod() all the offset values to draw them properly
  }

  pitchAt(octave, interval) {
    const length = this._offsets.length;
    if (length) {
      return this._offsets[interval.mod(length)] + 12 * (octave + Math.floor(interval / length));
    }
  }
}
