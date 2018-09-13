import { mod } from '../utils';

// full chromatic scale
const DEFAULT_PITCH_CLASSES = Object.freeze([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

// A subset of the 12-note chromatic scale.
// Determines which notes are used in the "scale +" and "scale -" patterns.
export default class Scale {

  constructor(pitchClasses = DEFAULT_PITCH_CLASSES) {
    this._pitchClassess = pitchClasses;
    this._memo = {}; // memoize for performance
  }

  get pitchClasses() {
    return this._pitchClassess;
  }

  set pitchClasses(pitchClasses) {
    this._pitchClassess = pitchClasses;
    this._memo = {};
  }

  override(pitchClass, enabled) {
    if (enabled) {
      if (!this._original) { //backup the original scale on the first override
        this._original = this._pitchClassess.slice();
        this._pitchClassess = [];
      }
      if (!this._pitchClassess.includes(pitchClass)) {
        this._pitchClassess.push(pitchClass);
      }
    } else {
      this._pitchClassess = this._pitchClassess.filter(pc => pc !== pitchClass)
      if (this._pitchClassess.length === 0) { // restore the original scale when there's no more overrides
        this._pitchClassess = this._original;
        this._original = null;
      }
    }
    this._memo = {};
  }

  nearestPitchClassIndex(pitch) {
    const targetPitchClass = pitch % 12;
    const { nearestIndex } = this._pitchClassess.reduce(
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
    const scaleLength = this._pitchClassess.length;
    if (scaleLength === 0) return pitch;

    const memoIdx = pitch + (128 * scaleOffset); // generate a unique index for every pitch/scaleOffset combination
    const memoValue = this._memo[memoIdx];
    if (memoValue != null) return memoValue;

    const nearestIndex = this.nearestPitchClassIndex(pitch);
    const mappedIndex = nearestIndex + scaleOffset;
    const octave = 12 * (Math.floor(pitch / 12) + Math.floor(mappedIndex / scaleLength));
    const wrappedIndex = mod(mappedIndex, scaleLength);
    const mappedPitch = this._pitchClassess[wrappedIndex] + octave;

    this._memo[memoIdx] = mappedPitch;
    return mappedPitch;
  }
}
