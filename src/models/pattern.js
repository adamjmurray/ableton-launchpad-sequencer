import Processor from './processor';
import { NUMBER_OF } from '../config';
import { mod } from '../utils';

// A pattern corresponds to the 8x8 grid of buttons on the Launchpad.
//
// It consists of 64 steps with integer values (typically 0-4 for off,green,yellow,orange,red lights),
// a start step, and an end step.
//
export default class Pattern {

  constructor(index, type) {
    this.index = index;
    this._processor = new Processor(type);
    this.sequence = Array(NUMBER_OF.STEPS).fill(0);
    this.start = 0;
    this.end = NUMBER_OF.STEPS - 1;
    this.mute = false;
  }

  get type() { return this._processor.type; }
  set type(type) { this._processor.type = type; }

  get sequence() { return this._sequence; }
  set sequence(sequence) {
    const seq = (sequence || []).slice(0, NUMBER_OF.STEPS);
    this._sequence = seq.concat(Array(NUMBER_OF.STEPS - seq.length).fill(0));
  }

  get start() { return this._start; }
  set start(index) {
    if (this.isValidIndex(index)) {
      // this._start = parseInt(index); // TODO: do we need to do this?
      this._start = index;
      if (this._start > this._end) {
        this._end = this._start;
      }
      this._updateLength();
    }
  }

  get end() { return this._end; }
  set end(index) {
    if (this.isValidIndex(index)) {
      this._end = index;
      if (this._start > this._end) {
        this._start = this._end;
      }
      this._updateLength();
    }
  }

  setRange(index1, index2) {
    if (isValidIndex(index1) && isValidIndex(index2)) {
      // this._start = parseInt(start);
      // this._end = parseInt(end);
      this._start = Math.min(index1, index2);
      this._end = Math.max(index1, index2);
      this._updateLength();
    }
  }

  _updateLength() {
    this.length = (this._end - this._start) + 1;
  }

  forEachActiveStep(cb) {
    const { start, end } = this;
    for (let i = start; i <= end; i++) {
      cb(i);
    }
  }

  clear() {
    this.forEachActiveStep(i =>
      this._sequence[i] = 0);
  }

  random() {
    this.forEachActiveStep(i =>
      this._sequence[i] = Math.floor(NUMBER_OF.STEP_VALUES * Math.random()));
  }

  // fill in value with 25% chance
  randomFill(value) {
    this.forEachActiveStep(i => {
      if (Math.random() < 0.25) {
        this._sequence[i] = value;
      }
    });
  }

  firstColumn(value) {
    // TODO: Should this be from start to end be relative to start?
    for (let i = 0; i < NUMBER_OF.STEPS; i += NUMBER_OF.COLUMNS) {
      this._sequence[i] = value;
    }
  }

  fill(value) {
    this.forEachActiveStep(i =>
      this._sequence[i] = value);
  }

  replace(value) {
    this.forEachActiveStep(i => {
      if (this._sequence[i] > 0) {
        this._sequence[i] = value;
      }
    });
  }

  reverse() {
    this._sequence.reverse();
  }

  // Flips value 1 with 4, and 2 with 3
  invert() {
    this.forEachActiveStep(i => {
      const value = this._sequence[i];
      if (value > 0) {
        this._sequence[i] = NUMBER_OF.STEP_VALUES - value;
      }
    });
  }

  rotate(steps) {
    const { sequence, start, end, length } = this;
    const rot = start + mod(steps, length);
    const before = sequence.slice(0, start);
    const left = sequence.slice(start, rot);
    const right = sequence.slice(rot, end + 1);
    const after = sequence.slice((end + 1));
    this._sequence = before.concat(right, left, after);
  }

  isValidIndex(index) {
    return (0 <= index) && (index < NUMBER_OF.STEPS);
  }

  getStep(index) {
    return this._sequence[index];
  }

  setStep(index, value) {
    if (this.isValidIndex(index)) {
      this._sequence[index] = value;
    }
  }

  // Given a clock index (in steps) return the active step in this pattern,
  // taking into account the start and end step.
  stepIndexForClock(clock) {
    return this._start + mod(clock, this.length);
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
      start: this._start,
      end: this._end,
      mute: this.mute,
      sequence: this._sequence
    };
  }

  fromJSON({ type, start, end, mute, sequence }) {
    if (type != null) this.type = type;
    if (start != null) this.start = start;
    if (end != null) this.end = end;
    if (mute != null) this.mute = mute;
    if (sequence != null) this.sequence = sequence;
  }
}
