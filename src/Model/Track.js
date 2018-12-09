import { DEFAULT, NUMBER_OF } from '../config';
import Note from './Note';
import Pattern from './Pattern';

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
    this.mute = false;
    this._note = new Note();
  }

  noteForClock(rawClock) {
    if (this.mute && !this.pitchOverride) return; // pitch override also overrides mute
    const clock = this.clockForMultiplier(rawClock);
    if (clock == null || clock < 0) return;

    const note = this._note; // avoids creating and garbage collecting objects each clock tick
    note.reset();
    note.pitch = this.pitch;
    note.velocity = this.velocity;

    this.patterns.forEach(pattern => pattern.processNote(note, clock, this.scale));

    const gateValue = note.gateValue(this.gateSummingMode);
    if (gateValue >= 0 && !note.mute) {
      note.enabled = true;
      // TODO: handle pitch vs velocity gate mode (assuming pitch for now):
      note.pitch = this.scale.map(note.pitch, gateValue);
      note.duration *= this.gate * this.durationMultiplier; // track.gate and durationMultiplier scales the note's duration
    }
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
