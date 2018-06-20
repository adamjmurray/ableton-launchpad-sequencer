import { mod } from '../utils';

// A subset of the 12-note chromatic scale.
// Determines which notes are used in the "scale +" and "scale -" patterns.
export default class Scale {

  constructor() {
    this._steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // full chromatic scale by default
    this._memo = {}; // we memoize for performance
  }

  setSteps(steps) {
    this._steps = steps;
    this._memo = {};
  }

  getSteps() {
    return this._steps;
  }

  overrideStep(step, enabled) {
    if (enabled) {
      if (!this._stepsCopy) { // first override, backup the original scale
        this._stepsCopy = this._steps.slice();
        this._steps = [];
      }
      if (!this._steps.includes(step)) {
        this._steps.push(step);
      }

    } else {
      this._steps = this._steps.filter(s => s !== step)
      if (this._steps.length === 0) { // restore the original scale when no more overrides
        this._steps = this._stepsCopy;
        this._stepsCopy = null;
      }
    }
    this._memo = {};
  }

  nearestPitchClassIndex(pitch) {
    const targetPitchClass = pitch % 12;
    return this._steps.reduce(
      ({ nearestIndex, nearestDistance } = {}, pc, index) => {
        const distance = Math.abs(targetPitchClass - pc);
        return (nearestDistance == null || distance < nearestDistance)
          ? { nearestIndex: index, nearestDistance: distance }
          : { nearestIndex, nearestDistance };
      }
    ).nearestIndex;
  }

  map(pitch, scaleOffset) {
    const scaleLength = this._steps.length;
    if (scaleOffset === 0 || scaleLength === 0) return pitch;

    const memoIdx = pitch + (128 * scaleOffset); // generate a unique index
    const memoVal = this._memo[memoIdx];
    if (memoVal != null) return memoVal;

    const index = this.nearestPitchClassIndex(pitch) + scaleOffset;
    const octave = 12 * (Math.floor(pitch / 12) + Math.floor(index / scaleLength));

    const mappedVal = this._steps[mod(index, scaleLength)] + octave;
    this._memo[memoIdx] = mappedVal;
    return mappedVal;
  }
}
