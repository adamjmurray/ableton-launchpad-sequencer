import { GATE_DURATIONS, MODS, NOOP, OCTAVES } from '../config';

const randomMidiValue = () => Math.floor(Math.random() * 128);
const randomPitch = randomMidiValue;
const randomVelocity = randomMidiValue;
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
      case 4: [note.pitch, note.velocity, note.duration] = [randomPitch(), randomVelocity(), randomDuration()]; break;
    }
  }
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

  process(note, value, scale) {
    this._process(note, value, scale);
    return note;
  }
};
