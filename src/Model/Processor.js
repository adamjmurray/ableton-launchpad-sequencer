import { STEP_VALUE } from '../config';

const NOOP = () => { }; // the "no operation" function

// The note modifying behavior for each pattern type.
// These may assume we filtered out stepValue 0 in processNote() as a NOOP
const processors = {
  'gate': (note, value, _scale, gateIndex) => { note.gateValues[gateIndex] = value; },

  'velocity +': (note, value) => { note.velocity += ((127 - note.velocity) * value) / 4; },
  'velocity -': (note, value) => { note.velocity -= (note.velocity * value) / 4; },

  'duration =': (note, value) => { note.duration = STEP_VALUE.DURATION[value]; },
  'duration +': (note, value) => { note.duration += value; },
  'duration -': (note, value) => { note.duration -= value; },
  'duration x': (note, value) => { note.duration *= (value + 1); },
  'duration /': (note, value) => { note.duration /= (value + 1); },

  'modulation': (note, value) => { note.modulation = STEP_VALUE.MIDI_CC[value]; },
  'aftertouch': (note, value) => { note.aftertouch = STEP_VALUE.MIDI_CC[value]; },

  'random mute': (note, value) => { if (Math.random() <= (value / 4)) { note.mute = true; } },
};

export default class Processor {

  constructor(type) {
    this.type = type;
  }

  get type() { return this._type; }
  set type(type) {
    this._type = type;
    this._process = processors[type] || NOOP;
  }

  process(note, value, scale, gateIndex) {
    this._process(note, value, scale, gateIndex);
    return note;
  }
};
