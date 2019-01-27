import { DEFAULT, MODE, NUMBER_OF, PATTERN } from '../config';
import Note from './Note';
import Pattern from './Pattern';

const { GATE, GATE_SUMMING } = MODE;

const randomItem = (list) => list[Math.floor(Math.random() * list.length)];

export default class Track {

  constructor(index) {
    this.index = index;
    this.patterns = [...Array(NUMBER_OF.PATTERNS)].map((_, patternIndex) => new Pattern({
      trackIndex: index,
      index: patternIndex,
      type: DEFAULT.PATTERN_TYPES[patternIndex],
    }));
    this.reset();
  }

  reset() {
    this.pitch = DEFAULT.PITCH;
    this.velocity = DEFAULT.VELOCITY;
    this.gate = DEFAULT.GATE;
    this.gateMode = DEFAULT.GATE_MODE;
    this.gateSummingMode = DEFAULT.GATE_SUMMING_MODE;
    this.patterns.forEach(pattern => pattern.reset());
    this.durationMultiplier = 1;
    this.mute = false;
    this._notes = [new Note, new Note, new Note]; // multi sum mode can output up to 3 notes
  }

  get pitch() {
    return this._pitch;
  }

  set pitch(pitch) {
    this._pitch = pitch;
    this._octave = Math.floor(pitch / 12);
    this._offset = pitch % 12;
  }

  notesForClock(clock, scale) {
    const [note, note2, note3] = this._notes; // avoid creating and garbage collecting objects each clock tick
    if (this.mute || clock < 0 || clock % this.durationMultiplier !== 0) {
      // return the previous note to maintain the modulation and aftertouch value when we're in between track steps
      note.enabled = false;
      return [note];
    }
    const trackClock = clock / this.durationMultiplier;

    this._notes.forEach(note => note.reset());
    note.pitch = this._pitch;
    note.velocity = this.velocity;

    this.patterns.forEach((pattern, index) => {
      switch (index) {
        case PATTERN.GATE2:
          pattern.processNote(note2, trackClock, scale);
          break;
        case PATTERN.GATE3:
          pattern.processNote(note3, trackClock, scale);
          break;
        default:
          pattern.processNote(note, trackClock, scale);
      }
    });

    const gateValue = this._gateValue();
    if (gateValue > 0 && !note.mute) {
      note.enabled = true;
      note.duration *= this.gate * this.durationMultiplier; // track.gate and durationMultiplier scales the note's duration

      const velocity = note.velocity;
      const duration = note.duration;

      switch (this.gateMode) {
        case GATE.PITCH:
          const octave = this._octave;
          const offset = this._offset;
          if (this.gateSummingMode === GATE_SUMMING.MULTI) {
            if (note.gateValue > 0) {
              // the first gate value maps to the track pitch, so subtract 1 and apply the scale
              note.pitch = scale.pitchAt(octave, offset + (note.gateValue - 1));
            } else {
              note.enabled = false;
            }
            if (note2.gateValue > 0) {
              note2.enabled = true;
              note2.pitch = scale.pitchAt(octave, offset + (note2.gateValue - 1));
              note2.velocity = velocity;
              note2.duration = duration;
            }
            if (note3.gateValue > 0) {
              note3.enabled = true;
              note3.pitch = scale.pitchAt(octave, offset + (note3.gateValue - 1));
              note3.velocity = velocity;
              note3.duration = duration;
            }
          } else {
            note.pitch = scale.pitchAt(octave, offset + (gateValue - 1));
          }
          break;

        case GATE.VELOCITY:
          const deltaToMax = 127 - velocity;
          if (this.gateSummingMode === GATE_SUMMING.MULTI) {
            const pitch = note.pitch;
            if (note.gateValue > 0) {
              // Pitches are not constrained to scale in for velocity gates.
              // Start with the highest pitch and go down to the track pitch on the last pattern.
              note.pitch = pitch + 2;
              note.velocity = velocity + (deltaToMax * (note.gateValue - 1) / 3);
            } else {
              note.enabled = false;
            }
            if (note2.gateValue > 0) {
              note2.enabled = true;
              note2.pitch = pitch + 1;
              note2.velocity = velocity + (deltaToMax * (note2.gateValue - 1) / 3);
              note2.duration = duration;
            }
            if (note3.gateValue > 0) {
              note3.enabled = true;
              note3.pitch = pitch;
              note3.velocity = velocity + (deltaToMax * (note3.gateValue - 1) / 3);
              note3.duration = duration;
            }
          } else
            if (this.gateSummingMode === GATE_SUMMING.ADD) {
              // It takes all 3 gates with max value (i.e. 12) to hit max velocity in ADD mode.
              // Since the step value 1 plays a note with the baseVelocity, there's 11 steps until the max:
              note.velocity = velocity + (deltaToMax * (gateValue - 1) / 11);
            }
            else {
              note.velocity = velocity + (deltaToMax * (gateValue - 1) / 3);
            }
          break;
      }
    }
    return this._notes;
  }

  patternStepIndexForClock(clock, patternIndex) {
    if (clock < 0) return -1;
    const trackClock = Math.floor(clock / this.durationMultiplier);
    const pattern = this.patterns[patternIndex];
    return pattern.startStepIndex + trackClock.mod(pattern.length);
  }

  _gateValue() {
    const values = this._notes.map(n => n.gateValue);
    switch (this.gateSummingMode) {
      case GATE_SUMMING.LOWEST:
        const nonZeros = values.filter(v => v > 0);
        return nonZeros.length ? Math.min(...nonZeros) : 0;

      case GATE_SUMMING.HIGHEST:
        return Math.max(...values);

      case GATE_SUMMING.RANDOM:
        return randomItem(values.filter(v => v > 0)) || 0;

      case GATE_SUMMING.RANDOM_WITH_0:
        return randomItem(values);

      case GATE_SUMMING.ADD:
      case GATE_SUMMING.ADD_x3:
      case GATE_SUMMING.MULTI:
        // These modes produce a note if any gate has a step value. notesForClock() handles the behavior.
        return values.reduce((a, b) => a + b);

      default:
        console.error(`Unsupported gate summing mode: ${this.gateSummingMode}`);
        return 0;
    }
  }
}
