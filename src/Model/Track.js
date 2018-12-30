import { DEFAULT, MODE, NUMBER_OF, PATTERN } from '../config';
import Note from './Note';
import Pattern from './Pattern';

const { GATE, GATE_SUMMING } = MODE;

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
    if (gateValue >= 0 && !note.mute) {
      note.enabled = true;
      note.duration *= this.gate * this.durationMultiplier; // track.gate and durationMultiplier scales the note's duration

      const pitch = note.pitch;
      const velocity = note.velocity;
      const duration = note.duration;
      const octave = this._octave;
      const offset = this._offset;

      switch (this.gateMode) {
        case GATE.PITCH:
          if (this.gateSummingMode === GATE_SUMMING.MULTI) {
            // the first value maps to the track pitch, so subtract 1 and apply the scale
            const gateValue1 = note.gateValue - 1;
            const gateValue2 = note2.gateValue - 1;
            const gateValue3 = note3.gateValue - 1;
            if (gateValue1 >= 0) {
              note.pitch = scale.pitchAt(octave, offset + gateValue1);
            } else {
              note.enabled = false;
            }
            if (gateValue2 >= 0) {
              note2.enabled = true;
              note2.pitch = scale.pitchAt(octave, offset + gateValue2);
              note2.velocity = velocity;
              note2.duration = duration;
            }
            if (gateValue3 >= 0) {
              note3.enabled = true;
              note3.pitch = scale.pitchAt(octave, offset + gateValue3);
              note3.velocity = velocity;
              note3.duration = duration;
            }
          } else {
            note.pitch = scale.pitchAt(octave, offset + gateValue);
          }
          break;

        case GATE.VELOCITY:
          const deltaToMax = 127 - velocity;
          if (this.gateSummingMode === GATE_SUMMING.MULTI) {
            const gateValue1 = note.gateValue - 1;
            const gateValue2 = note2.gateValue - 1;
            const gateValue3 = note3.gateValue - 1;
            if (gateValue1 >= 0) {
              // Pitches are not constrained to scale in for velocity gates.
              // Start with the highest pitch and go down to the track pitch on the last pattern.
              note.pitch = pitch + 2;
              note.velocity = velocity + (deltaToMax * gateValue1 / 3);
            } else {
              note.enabled = false;
            }
            if (gateValue2 >= 0) {
              note2.enabled = true;
              note2.pitch = pitch + 1;
              note2.velocity = velocity + (deltaToMax * gateValue2 / 3);
              note2.duration = duration;
            }
            if (gateValue3 >= 0) {
              note3.enabled = true;
              note3.pitch = pitch;
              note3.velocity = velocity + (deltaToMax * gateValue3 / 3);
              note3.duration = duration;
            }
          } else
            if (this.gateSummingMode === GATE_SUMMING.ADD) {
              // It takes all 3 gates with max value (i.e. 12) to hit max velocity in ADD mode.
              // Since the step value 1 plays a note with the baseVelocity, there's 11 steps until the max:
              note.velocity = velocity + (deltaToMax * gateValue / 11);
            }
            else {
              note.velocity = velocity + (deltaToMax * gateValue / 3);
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
    let value = 0;
    const gateValues = this._notes.map(n => n.gateValue);
    switch (this.gateSummingMode) {
      case GATE_SUMMING.LOWEST:
        value = Math.min.apply(this, gateValues.filter(value => value > 0));
        break;

      case GATE_SUMMING.HIGHEST:
        value = Math.max.apply(this, gateValues);
        break;

      case GATE_SUMMING.RANDOM:
        const nonZeroValues = gateValues.filter(value => value > 0);
        value = nonZeroValues[Math.floor(Math.random() * nonZeroValues.length)];
        break;

      default:
        // GATE_SUMMING.ADD
        // and GATE_SUMMING.MULTI so we produce a note if any of them have a step value. Track will handle the behavior.
        for (var i = 0; i < NUMBER_OF.GATES; i++) {
          value += gateValues[i];
        }
    }
    // The first value just enables the note and uses the track pitch/velocity, so subtract 1:
    return value - 1;
  }
}
