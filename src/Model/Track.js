import { DEFAULT, MODE, NUMBER_OF } from '../config';
import Note from './Note';
import Pattern from './Pattern';

const { GATE, GATE_SUMMING } = MODE;

export default class Track {

  constructor(index, scale) {
    this.index = index;
    this.scale = scale; // TODO: pass this into noteForClock() instead
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
    this.maxAftertouch = 127;
    this.maxModulation = 127;
    this.mute = false;
    this._note = new Note();
  }

  noteForClock(rawClock) {
    if (this.mute) return;
    const clock = this.clockForMultiplier(rawClock);
    if (clock == null || clock < 0) return;

    const note = this._note; // avoid creating and garbage collecting objects each clock tick
    note.reset();
    note.pitch = this.pitch;
    note.velocity = this.velocity;

    this.patterns.forEach(pattern => pattern.processNote(note, clock, this.scale));

    const gateValue = note.gateValue(this.gateSummingMode);
    if (gateValue >= 0 && !note.mute) {
      note.enabled = true;
      note.duration *= this.gate * this.durationMultiplier; // track.gate and durationMultiplier scales the note's duration
      const basePitch = note.pitch;
      const baseVelocity = note.velocity;

      switch (this.gateMode) {
        case GATE.PITCH:
          // the first value maps to the track pitch, so subtract 1 and apply the scale
          if (this.gateSummingMode === GATE_SUMMING.MULTI) {
            const gateValue1 = note.gateValues[0] - 1;
            const gateValue2 = note.gateValues[1] - 1;
            const gateValue3 = note.gateValues[2] - 1;
            note.pitch = gateValue1 >= 0 ? this.scale.map(basePitch, gateValue1) : null;
            note.pitch2 = gateValue2 >= 0 ? this.scale.map(basePitch, gateValue2) : null;
            note.pitch3 = gateValue3 >= 0 ? this.scale.map(basePitch, gateValue3) : null;
            note.velocity2 = baseVelocity;
            note.velocity3 = baseVelocity;
          } else {
            note.pitch = this.scale.map(basePitch, gateValue);
          }
          break;

        case GATE.VELOCITY:
          const deltaToMax = 127 - baseVelocity;
          if (this.gateSummingMode === GATE_SUMMING.MULTI) {
            const gateValue1 = note.gateValues[0] - 1;
            const gateValue2 = note.gateValues[1] - 1;
            const gateValue3 = note.gateValues[2] - 1;
            note.pitch = gateValue1 >= 0 ? basePitch + 2 : null; // Pitches are not constrained to scale in for velocity gates.
            note.pitch2 = gateValue2 >= 0 ? basePitch + 1 : null; // Start with the highest pitch and
            note.pitch3 = gateValue3 >= 0 ? basePitch : null; // go down to the track pitch on the last pattern.
            note.velocity = baseVelocity + (deltaToMax * gateValue1 / 3);
            note.velocity2 = baseVelocity + (deltaToMax * gateValue2 / 3);
            note.velocity3 = baseVelocity + (deltaToMax * gateValue3 / 3);
          } else
            if (this.gateSummingMode === GATE_SUMMING.ADD) {
              // It takes all 3 gates with max value (i.e. 12) to hit max velocity in ADD mode.
              // Since the value 1 plays a note with the baseVelocity, there's 11 steps until the max:
              note.velocity = baseVelocity + (deltaToMax * gateValue / 11);
            }
            else {
              note.velocity = baseVelocity + (deltaToMax * gateValue / 3);
            }
          break;
      }
    }
    note.aftertouch *= this.maxAftertouch / 127;
    note.modulation *= this.maxModulation / 127;
    return note;
  }

  clockForMultiplier(clock) {
    // step lengths are longer, so we only trigger every few clock ticks
    if (clock % this.durationMultiplier === 0) return clock /= this.durationMultiplier;
  }

  toJSON() {
    return {
      pitch: this.pitch,
      velocity: this.velocity,
      gate: this.gate,
      durationMultiplier: this.durationMultiplier,
      mute: this.mute,
      patterns: this.patterns
    };
  }

  fromJSON({ pitch, velocity, gate, durationMultiplier, mute, patterns }) {
    if (pitch != null) { this.pitch = pitch; }
    if (velocity != null) { this.velocity = velocity; }
    if (gate != null) { this.gate = gate; }
    if (durationMultiplier != null) { this.durationMultiplier = durationMultiplier; }
    if (mute != null) { this.mute = mute; }
    if (patterns != null) {
      patterns.forEach((pattern, index) => this.patterns[index].fromJSON(pattern));
    }
  }
}
