import Processor from './Processor';
import { NUMBER_OF } from '../Config';

// A pattern corresponds to the 8x8 grid of buttons on the Launchpad.
//
// It consists of 64 steps with integer values (typically 0-4 for off,green,yellow,orange,red lights),
// a start step, and an end step.
//
export default class Pattern {

  constructor(type) {
    this._processor = new Processor(type);
    this.steps = Array(NUMBER_OF.STEPS);
    this.reset();
  }

  reset() {
    this.steps.fill(0); // TODO: rename to steps?
    this.startStepIndex = 0;
    this.endStepIndex = NUMBER_OF.STEPS - 1;
    this.mute = false;
  }

  get type() {
    return this._processor.type;
  }
  set type(type) {
    this._processor.type = type;
  }

  setRange(index1, index2) {
    this.startStepIndex = Math.min(index1, index2);
    this.endStepIndex = Math.max(index1, index2);
  }

  get length() {
    return (this._end - this._start) + 1;
  }

  clear() {
    this.forEachActiveStep(i =>
      this.steps[i] = 0);
  }

  randomize() {
    const { steps } = this;
    steps.forEach((_, index) =>
      steps[index] = Math.floor(NUMBER_OF.STEP_VALUES * Math.random())
    );
  }

  // fill in value with 25% chance
  randomFill(value) {
    const { steps } = this;
    steps.forEach((_, index) => {
      if (Math.random() < 0.25) {
        steps[index] = value;
      }
    });
  }

  fill(value) {
    const { steps } = this;
    steps.forEach((_, index) =>
      steps[index] = value
    );
  }

  replace(value) {
    const { steps } = this;
    steps.forEach((_, index) => {
      if (steps[index] > 0) {
        steps[index] = value;
      }
    });
  }

  reverse() {
    this.steps.reverse();
  }

  // Flips value 1 with 4, and 2 with 3
  invert() {
    const { steps } = this;
    steps.forEach((_, index) => {
      const value = steps[index];
      if (value > 0) {
        steps[index] = NUMBER_OF.STEP_VALUES - value;
      }
    });
  }

  shift(amount) {
    const { sequence, start, end, length } = this;
    const rot = start + amount.mod(length);
    const before = sequence.slice(0, start);
    const left = sequence.slice(start, rot);
    const right = sequence.slice(rot, end + 1);
    const after = sequence.slice((end + 1));
    this.steps = before.concat(right, left, after);
  }

  // getStep(index) {
  //   return this.steps[index];
  // }

  // setStep(index, value) {
  //   if (this.isValidIndex(index)) {
  //     this.steps[index] = value;
  //   }
  // }

  // Given a clock index (in steps) return the active step in this pattern,
  // taking into account the start and end step.
  stepIndexForClock(clock) {
    return this._start + clock.mod(this.length);
  }

  getStepForClock(clock) {
    return this.getStep(this.stepIndexForClock(clock));
  }

  // Given a note in the form of a JS object:
  // {
  //   pitch: <MIDI pitch (0-127)>,
  //   velocity: <MIDI velocity (0-127)>,
  //   duration: <pulses/quarter note beats (float)>
  // }
  // modify the note for this pattern's value at the given clock index.
  //
  processNote(note, clock, scale) {
    if (this.mute) return;
    const value = this.getStepForClock(clock);
    if (value > 0) { // Assumption: 0 is always a NOOP
      this._processor.process(note, value, scale);
    }
  }

  toJSON() {
    return {
      type: this.type,
      start: this.startStepIndex,
      end: this.endStepIndex,
      mute: this.mute,
      sequence: this.steps
    };
  }

  fromJSON({ type, start, end, mute, sequence }) {
    if (type != null) this.type = type;
    if (start != null) this.startStepIndex = start;
    if (end != null) this.endStepIndex = end;
    if (mute != null) this.mute = mute;
    if (sequence != null) this.sequence = sequence;
  }
}
