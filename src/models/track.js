import { DEFAULT, NUMBER_OF } from '../config';
import Pattern from './pattern';

export default class Track {

  constructor(index, scale) {
    this.index = index;
    this.scale = scale;
    this.pitch = 60;
    this.pitchOverride = null; // MIDI input can temporarily override the track pitch
    this.velocityOverride = null;
    this.velocity = 70;
    this.duration = 0.9;
    this.number = this.index + 1;
    this.patterns = [...Array(NUMBER_OF.PATTERNS)].map((_, index) => new Pattern(index, DEFAULT.PATTERN_TYPES[index]));
    this.multiplier = 1;
    this.mute = false;
    this.note = {};
  }

  noteForClock(rawClock) {
    if (this.mute && !this.pitchOverride) return; // pitch override also overrides mute
    const clock = this.clockForMultiplier(rawClock);
    if (clock == null) return;

    const { note } = this; // avoids creating and garbage collecting objects each clock tick
    note.pitch = this.pitchOverride != null ? this.pitchOverride : this.pitch;
    note.velocity = this.velocityOverride != null ? this.velocityOverride : this.velocity;
    note.duration = 0; // no note unless a gate or "duration +" pattern turns it on
    // note.interval = null # for whenever an interval pattern exists
    // note.skip = null # by not doing this, the last pattern can skip the first on the next clock tick

    this.patterns.forEach(pattern => {
      if (note.skip) { // random skip caused next pattern to be skipped
        note.skip = null;
      } else {
        pattern.processNote(note, clock, this.scale);
      }
    });

    note.duration *= this.duration * this.multiplier; // track.duration and multiplier scales the note's duration
    return note;
  }

  clockForMultiplier(clock) {
    // step lengths are longer, so we only trigger every few clock ticks
    if (clock % this.multiplier === 0) return clock /= this.multiplier;
  }

  toJSON() {
    return {
      pitch: this.pitch,
      velocity: this.velocity,
      duration: this.duration,
      multiplier: this.multiplier,
      mute: this.mute,
      patterns: this.patterns
    };
  }

  fromJSON({ pitch, velocity, duration, multiplier, mute, patterns }) {
    if (pitch != null) { this.pitch = pitch; }
    if (velocity != null) { this.velocity = velocity; }
    if (duration != null) { this.duration = duration; }
    if (multiplier != null) { this.multiplier = multiplier; }
    if (mute != null) { this.mute = mute; }
    if (patterns != null) {
      patterns.forEach((pattern, index) => this.patterns[index].fromJSON(pattern));
    }
  }
}
