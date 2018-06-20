import { GATE_DURATIONS, OCTAVES, MODS, VALUES, ROW_LENGTH } from '../config';
import { mod } from '../utils';

const randomPitch = randomVelocity = () => Math.floor(Math.random() * 128);
const randomDuration = () => Math.random() * 8;

// The note modifying behavior for each pattern type.
// These may assume we filtered out stepValue 0 in processNote() as a NOOP
const processors = {
  'pitch gate': (note, value) => { note.duration = 1; note.pitch += (value - 1); },
  'scale gate': (note, value) => { note.duration = 1; note.pitch = scale.map(note.pitch, value - 1); },
  'velocity gate': (note, value) => { note.duration = 1; note.velocity += ((127 - note.velocity) * (value - 1)) / 3; },
  'duration gate': (note, value) => { note.duration = GATE_DURATIONS[value]; },

  'pitch +': (note, value) => { note.pitch += value; },
  'pitch -': (note, value) => { note.pitch -= value; },
  'scale +': (note, value, scale) => { note.pitch = scale.map(note.pitch, value); },
  'scale -': (note, value, scale) => { note.pitch = scale.map(note.pitch, -value); },
  'octave': (note, value) => { note.pitch += OCTAVES[value]; },

  'velocity +': (note, value) => { note.velocity += ((127 - note.velocity) * value) / 4; },
  'velocity -': (note, value) => { note.velocity -= (note.velocity * value) / 4; },

  'duration +': (note, value) => { note.duration += value; },
  'duration -': (note, value) => { note.duration -= value; },
  'duration x': (note, value) => { note.duration *= (value + 1); },
  'duration /': (note, value) => { note.duration /= (value + 1); },

  'modulation': (note, value) => { note.modulation = MODS[value]; },
  'aftertouch': (note, value) => { note.aftertouch = MODS[value]; },

  'random gate': (note, value) => { if (Math.random() <= (value / 4)) { note.duration = 1; } },
  'random mute': (note, value) => { if (Math.random() <= (value / 4)) { note.duration = 0;; } },
  'random skip': (note, value) => { if (Math.random() <= (value / 4)) { note.skip = true; } },
  'chaos': (note, value) => {
    switch (value) {
      case 1: note.pitch = randomPitch(); break;
      case 2: note.velocity = randomVelocity(); break;
      case 3: note.duration = randomDuration(); break;
      case 4: [note.pitch, note.velocity, note.duration] = [randomPitch(), randomVelocity(), trandomDuration()]; break;
    }
  }
};

// A pattern corresponds to the 8x8 grid of buttons on the Launchpad.
//
// It consists of 64 steps with integer values (typically 0-4 for off,green,yellow,orange,red lights),
// a start step, and an end step.
//
export default class Pattern {

  constructor(index, type, scale) {
    this.sequence = new Array(STEPS).fill(0);
    this.start = 0;
    this.end = STEPS - 1;
    this._updateLength();
    this.setType(type);
    this.mute = false;
    this.scale = scale; // TODO: need to pass in scale
  }

  forEachActiveStep(cb) {
    const { start, end } = this;
    for (let i = start; i < end; i++) {
      cb(i);
    }
  }

  clear() {
    this.forEachActiveStep(i =>
      this.sequence[i] = 0);
  }

  random() {
    this.forEachActiveStep(i =>
      this.sequence[i] = Math.floor(VALUES * Math.random()));
  }

  // fill in value with 25% chance
  randomFill(value) {
    this.forEachActiveStep(i => {
      if (Math.random() < 0.25) {
        this.sequence[i] = value;
      }
    });
  }

  firstColumn(value) {
    // TODO: Should this be from start to end be relative to start?
    for (let i = 0; i < STEPS; i += ROW_LENGTH) {
      this.sequence[i] = value;
    }
  }

  fill(value) {
    this.forEachActiveStep(i =>
      this.sequence[i] = value);
  }

  replace(value) {
    this.forEachActiveStep(i => {
      if (this.sequence[i] > 0) {
        this.sequence[i] = value;
      }
    });
  }

  reverse() {
    this.sequence.reverse();
  }

  // Flips value 1 with 4, and 2 with 3
  invert() {
    this.forEachActiveStep(i => {
      const value = this.sequence[i];
      if (value > 0) {
        this.sequence[i] = VALUES - value;
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
    this.sequence = before.concat(right, left, after);
  }

  setType(type) {
    this.type = type;
    this._process = processors[type] || NOOP;
  }

  isValidIndex(index) {
    return (0 <= index) && (index < STEPS);
  }

  setStart(index) {
    if (this.isValidIndex(index)) {
      // this.start = parseInt(index); // TODO: do we need to do this?
      this.start = index;
      if (this.start > this.end) {
        this.end = this.start;
      }
      this._updateLength();
    }
  }

  setEnd(index) {
    if (0 <= index && index < STEPS) {
      // this.end = parseInt(index);  // TODO: do we need to do this?
      this.end = index;
      if (this.start > this.end) {
        this.start = this.end;
      }
      this._updateLength();
    }
  }

  setRange(index1, index2) {
    if (isValidIndex(index1) && isValidIndex(index2)) {
      // this.start = parseInt(start);
      // this.end = parseInt(end);
      this.start = Math.min(index1, index2);
      this.end = Math.max(index1, index2);
      this._updateLength();
    }
  }

  _updateLength() {
    this.length = (this.end - this.start) + 1;
  }


  getStep(index) {
    return this.sequence[index];
  }

  setStep(index, value) {
    if (this.isValidIndex(index)) {
      this.sequence[index] = value;
    }
  }

  // Given a clock index (in steps) return the active step in this pattern,
  // taking into account the start and end step.
  stepIndexForClock(clock) {
    return this.start + mod(clock, this.length);
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
  processNote(note, clock) {
    if (this.mute) return;
    const value = this.getStepForClock(clock);
    if (value > 0) { // Assumption: 0 is always a NOOP
      this._process(note, value, this.scale);
    }
  }

  toJSON() {
    return ({
      type: this.type,
      start: this.start,
      end: this.end,
      mute: this.mute,
      sequence: this.sequence
    });
  }

  fromJSON({ type, start, end, mute, sequence }) {
    if (type != null) this.setType(type);
    if (start != null) this.start = start;
    if (end != null) this.end = end;
    this._updateLength();
    if (mute != null) this.mute = mute;
    if (sequence != null) {
      const seq = sequence.slice(0, STEPS);
      this.sequence = seq.concat(Array(STEPS - seq.length).fill(0));
    }
  }
}
