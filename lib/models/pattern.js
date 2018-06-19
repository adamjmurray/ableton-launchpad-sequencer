import { GATE_DURATIONS, OCTAVES, MODS, VALUES } from '../config';

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

  'random gate': (note, value) => { if (Math.random() <= (value / 4)) { note.duration = 1; return; } },
  'random mute': (note, value) => { if (Math.random() <= (value / 4)) { note.duration = 0; return; } },
  'random skip': (note, value) => { if (Math.random() <= (value / 4)) { note.skip = true; return; } },
  'chaos': (note, value) => {
    switch (value) {
      case 1: note.pitch = randomPitch(); break;
      case 2: note.velocity = randomVelocity(); break;
      case 3: note.duration = randomDuration(); break;
      case 4: [note.pitch, note.velocity, note.duration] = Array.from([randomPitch(), randomVelocity(), trandomDuration()]); break;
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
    this.index = index;
    this.number = index + 1;
    this.sequence = new Array(STEPS);
    this.clear();
    this.start = 0;
    this.end = STEPS - 1;
    this._updateLength();
    this.setType(type);
    this.mute = false;
    this.scale = scale; // TODO: need to pass in scale
  }

  clear() {
    for (let i = 0, end = STEPS; i < end; i++) { this.sequence[i] = 0; }
  }

  random() {
    for (let i = this.start, { end } = this; i <= end; i++) {
      this.sequence[i] = Math.floor(VALUES * Math.random());
    }
  }

  randomFill(value) {
    for (let i = this.start, { end } = this; i <= end; i++) {
      // fill in value with 25% chance
      if (Math.random() < 0.25) { this.sequence[i] = value; }
    }
  }

  firstColumn(value) {
    for (let i = 0, end = STEPS; i < end; i += 8) {
      this.sequence[i] = value;
    }
  }

  fill(value) {
    for (let i = this.start, { end } = this; i <= end; i++) {
      this.sequence[i] = value;
    }
  }

  replace(value) {
    for (let i = this.start, { end } = this; i <= end; i++) {
      if (this.sequence[i] > 0) { this.sequence[i] = value; }
    }
  }

  reverse() {
    const s = this.sequence;
    for (let i = this.start, end = this.start + (this.length / 2); i < end; i++) {
      const j = this.end - i;
      [s[i], s[j]] = Array.from([s[j], s[i]]);
    }
  }

  // Flips value 1 with 4, and 2 with 3
  invert() {
    for (let i = this.start, { end } = this; i <= end; i++) {
      let value = this.sequence[i];
      if (value > 0) { value = VALUES - value; }
      this.sequence[i] = value;
    }
  }

  rotate(steps) {
    const seq = this.sequence;
    const len = this.length;
    const rot = this.start + (((steps % len) + len) % len); // force steps to be in [0..@length] and offset from @start
    const before = seq.slice(0, this.start);
    const left = seq.slice(this.start, rot);
    const right = seq.slice(rot, +this.end + 1 || undefined);
    const after = seq.slice((this.end + 1));
    this.sequence = before.concat(right, left, after);
  }

  setType(type) {
    this.type = type;
    this._process = processors[type] || NOOP;
  }

  setStart(index) {
    if (0 <= index && index < STEPS) {
      this.start = parseInt(index);
      if (this.start > this.end) { this.end = this.start; }
      this._updateLength();
    }
  }

  setEnd(index) {
    if (0 <= index && index < STEPS) {
      this.end = parseInt(index);
      if (this.start > this.end) { this.start = this.end; }
      this._updateLength();
    }
  }

  setRange(start, end) {
    if (start > end) { [start, end] = Array.from([end, start]); }
    if ((0 <= start && start <= STEPS) && (0 <= end && end <= STEPS)) {
      this.start = parseInt(start);
      this.end = parseInt(end);
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
    if (0 <= index && index < STEPS) { this.sequence[index] = value; }
  }

  // Given a clock index (in steps) return the active step in this pattern,
  // taking into account the start and end step.
  //
  stepIndexForClock(clock) {
    if (clock >= 0) { return (clock % this.length) + this.start; } else { return -1; }
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
    if (this.mute) { return; }
    const value = this.getStepForClock(clock);
    if (value > 0) { this._process(note, value, this.scale); } // NOTE, major assumption: 0 is always a NOOP! But a good optimization...
    // MIDI CC modulation values for each step value
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
    if (type != null) { this.setType(type); }
    if (start != null) { this.start = start; }
    if (end != null) { this.end = end; }
    this._updateLength();
    if (mute != null) { this.mute = mute; }
    if ((sequence != null ? sequence.length : undefined) === STEPS) { this.sequence = sequence; }
  }
}
