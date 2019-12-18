import { NUMBER_OF, STEP_VALUE } from '../config';

// A pattern corresponds to the 8x8 grid of buttons on the Launchpad.
//
// It consists of 64 steps with integer values (typically 0-4 for off,green,yellow,orange,red lights),
// a start step, and an end step.
//
export default class Pattern {

  constructor({ trackIndex, index, type } = {}) {
    this.trackIndex = trackIndex;
    this.index = index;
    this.type = type;
    this.reset();
  }

  reset() {
    this._steps = Array(NUMBER_OF.STEPS).fill(0);
    this.startStepIndex = 0;
    this.endStepIndex = NUMBER_OF.STEPS - 1;
    this.mute = false;
  }

  get steps() {
    return this._steps;
  }

  set steps(steps) {
    // ensure this._steps remains valid
    for (var i = 0; i < NUMBER_OF.STEPS; i++) {
      this._steps[i] = steps[i] || 0;
    }
  }

  setRange(index1, index2) {
    this.startStepIndex = Math.min(index1, index2);
    this.endStepIndex = Math.max(index1, index2);
  }

  get range() {
    return [this.startStepIndex, this.endStepIndex];
  }

  get length() {
    return (this.endStepIndex - this.startStepIndex) + 1;
  }

  clear() {
    this._steps = Array(NUMBER_OF.STEPS).fill(0);
  }

  randomize() {
    const { steps, startStepIndex: start, endStepIndex: end } = this;
    for (let i = start; i <= end; i++) {
      steps[i] = Math.floor(NUMBER_OF.STEP_VALUES * Math.random())
    }
  }

  // fill in value with 25% chance
  randomFill(value) {
    const { steps, startStepIndex: start, endStepIndex: end } = this;
    for (let i = start; i <= end; i++) {
      if (Math.random() < 0.25) {
        steps[i] = value;
      }
    }
  }

  fill(value) {
    const { steps, startStepIndex: start, endStepIndex: end } = this;
    for (let i = start; i <= end; i++) {
      steps[i] = value
    }
  }

  replace(value) {
    const { steps, startStepIndex: start, endStepIndex: end } = this;
    for (let i = start; i <= end; i++) {
      if (steps[i] > 0) {
        steps[i] = value;
      }
    }
  }

  reverse() {
    const { steps, startStepIndex: start, endStepIndex: end } = this;
    const before = steps.slice(0, start);
    const activeSteps = steps.slice(start, end + 1);
    const after = steps.slice(end + 1);
    this.steps = before.concat(activeSteps.reverse(), after);
  }

  // Flips value 1 with 4, and 2 with 3
  invert() {
    const { steps, startStepIndex: start, endStepIndex: end } = this;
    for (let i = start; i <= end; i++) {
      const value = steps[i];
      if (value > 0) {
        steps[i] = NUMBER_OF.STEP_VALUES - value;
      }
    }
  }

  shift(amount) {
    const { steps, startStepIndex: start, endStepIndex: end, length } = this;
    const rot = start + amount.mod(length);
    const before = steps.slice(0, start);
    const left = steps.slice(start, rot);
    const right = steps.slice(rot, end + 1);
    const after = steps.slice(end + 1);
    this.steps = before.concat(right, left, after);
  }

  processNote(note, clock) {
    if (this.mute) return;

    const stepIndex = this.startStepIndex + clock.mod(this.length);
    const value = this.steps[stepIndex];
    if (value > 0) { // Assumption: 0 is always a NOOP
      switch (this.type) {
        case 'velocity':
          note.velocity += (127 - note.velocity) * value / 4;
          break;
        case 'duration':
          note.duration = STEP_VALUE.DURATION[value];
          break;
        case 'aftertouch':
          note.aftertouch = 127 * value / 4;
          break;
        case 'modulation':
          note.modulation = 127 * value / 4;
          break;
        case 'random mute':
          if (Math.random() <= (value / 4)) {
            note.mute = true;
          }
          break;
        case 'gate':
          note.gateValue = value;
          break;
        default: console.log(`ERROR in processNote(). Unexpected type "${this.type}"`);
      }
    }
  }
}
