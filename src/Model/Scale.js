import { mod } from '../utils';
import { DEFAULT } from '../Config';

// A subset of the 12-note chromatic scale.
// Determines which notes are used in the "scale +" and "scale -" patterns.
export default class Scale {

  constructor(pitchClasses = DEFAULT.PITCH_CLASSES) {
    this.pitchClasses = pitchClasses;
  }

  get pitchClasses() {
    return this._pitchClasses;
  }

  set pitchClasses(pitchClasses) {
    this._pitchClasses = pitchClasses;
    this._memo = {}; // memoize for performance
  }

  override(pitchClass, enabled) {
    if (enabled) {
      if (!this._original) { //backup the original scale on the first override
        this._original = this._pitchClasses.slice();
        this._pitchClasses = [];
      }
      if (!this._pitchClasses.includes(pitchClass)) {
        this._pitchClasses.push(pitchClass);
      }
    } else {
      this._pitchClasses = this._pitchClasses.filter(pc => pc !== pitchClass)
      if (this._pitchClasses.length === 0) { // restore the original scale when there's no more overrides
        this._pitchClasses = this._original;
        this._original = null;
      }
    }
    this._memo = {};
  }

  nearestPitchClassIndex(pitch) {
    const targetPitchClass = pitch % 12;
    const { nearestIndex } = this._pitchClasses.reduce(
      ({ nearestIndex, nearestDistance }, pc, index) => {
        const distance = Math.abs(targetPitchClass - pc);
        return distance < nearestDistance
          ? { nearestIndex: index, nearestDistance: distance }
          : { nearestIndex, nearestDistance };
      },
      { nearestDistance: Infinity }
    );
    return nearestIndex;
  }

  map(pitch, scaleOffset) {
    const scaleLength = this._pitchClasses.length;
    if (scaleLength === 0) return pitch;

    const memoIdx = pitch + (128 * scaleOffset); // generate a unique index for every pitch/scaleOffset combination
    const memoValue = this._memo[memoIdx];
    if (memoValue != null) return memoValue;

    const nearestIndex = this.nearestPitchClassIndex(pitch);
    const mappedIndex = nearestIndex + scaleOffset;
    const octave = 12 * (Math.floor(pitch / 12) + Math.floor(mappedIndex / scaleLength));
    const wrappedIndex = mod(mappedIndex, scaleLength);
    const mappedPitch = this._pitchClasses[wrappedIndex] + octave;

    this._memo[memoIdx] = mappedPitch;
    return mappedPitch;
  }
}
