/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// A subset of the 12-note chromatic scale.
// Determines which notes are used in the "scale +" and "scale -" patterns.
class Scale {

  constructor() {
    this._steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // full chromatic scale by default
    this._memo = {}; // we memoize for performance
  }

  setSteps(steps) {
    this._steps = steps;
    return this._memo = {};
  }

  getSteps() { return this._steps; }
    
  overrideStep(step, enabled) {
    let index;
    if (enabled) {
      if ((this._stepsCopy == null)) { // backup the original scale
        this._stepsCopy = this._steps.slice();
        this._steps = [];
      }

      index = this._steps.indexOf(step);
      if (index < 0) {
        this._steps.push(step);
      }

    } else {
      index = this._steps.indexOf(step);
      if (index >= 0) {
        this._steps.splice(index, 1);
        if (this._steps.length === 0) { // restore the original scale when no more overrides
          this._steps = this._stepsCopy;
          this._stepsCopy = null;
        }
      }
    }

    this._memo = {};
  }


  map(pitch, scaleOffset) {
    let mappedVal;
    if (scaleOffset === 0) { return pitch; }

    const memoIdx = pitch + (128 * scaleOffset);
    const memoVal = this._memo[memoIdx];
    if (memoVal != null) { return memoVal; }
    
    const scaleLength = this._steps.length;
    if (scaleLength === 0) {
      // no scale, just add (or subtract) octaves
      mappedVal = pitch + (12 * scaleOffset);

    } else {
      let i;
      let index;
      let octave = Math.floor(pitch / 12) * 12;
      const pitchClass = pitch % 12;

      // find the nearest pitch class in the scale that's not higher than the given pitch's pitch class
      let found = false;
      for (i = 0, index = i; i < this._steps.length; i++, index = i) {
        const pc = this._steps[index];
        if (pc === pitchClass) {
          found = true;
          break;
        }
        if (pc > pitchClass) {
          found = true;
          if (scaleOffset > 0) { index -= 1; } // we went one past
          break;
        }
      }

      // TODO: I think maybe index should be 0 if scaleOffset < 0 in this case?
      if (!found && (scaleOffset > 0)) { index -= 1; } // went one past

      index += scaleOffset;
      octave += 12 * Math.floor(index/scaleLength);

      index %= scaleLength;
      if (index < 0) { index += scaleLength; } // support negative indexes

      mappedVal = this._steps[index] + octave;
    }

    this._memo[memoIdx] = mappedVal;
    return mappedVal;
  }
}

    // Using a singleton scale simplifies some of the code.
Scale.instance = new Scale;