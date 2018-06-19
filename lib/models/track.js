/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class Track {
  static initClass() {
  
    this.DEFAULT_TYPES = [
      'scale gate',
      'scale +',
      'velocity +',
      'duration +',
      'octave',
      'scale -',
      'velocity -',
      'duration -'
    ];
  }

  constructor(index1) {
    let index;
    this.index = index1;
    this.pitch = 60;
    this.pitchOverride = null; // MIDI input can temporarily override the track pitch
    this.velocityOverride = null;
    this.velocity = 70;
    this.duration = 0.9;
    this.number = this.index+1;
    this.patterns = ((() => {
      const result = [];
      for (index = 0; index < Track.DEFAULT_TYPES.length; index++) {
        const type = Track.DEFAULT_TYPES[index];
        result.push(new Pattern(index,type));
      }
      return result;
    })());
    this.multiplier = 1;
    this.mute = false;
    this.note = {};
  }


  noteForClock(clock) {
    if (this.mute && (this.pitchOverride == null)) { return; } // pitch override unmutes
    clock = this.clockForMultiplier(clock);
    if (clock == null) { return; }

    const { note } = this; // avoids creating and garbage collecting objects each clock tick
    note.pitch = this.pitchOverride != null ? this.pitchOverride : this.pitch;
    note.velocity = this.velocityOverride != null ? this.velocityOverride : this.velocity;
    note.duration = 0; // no note unless a gate or "duration +" pattern turns it on
    // note.interval = null # for whenever an interval pattern exists
    // note.skip = null # by not doing this, the last pattern can skip the first on the next clock tick

    for (let pattern of this.patterns) {
      if (note.skip) { // random skip caused next pattern to be skipped
        note.skip = null;
        continue;
      }
      pattern.processNote(note,clock);
    }

    note.duration *= this.duration * this.multiplier; // track.duration and multiplier scales the note's duration
    return note;
  }


  clockForMultiplier(clock) {
    // step lengths are longer, so we only trigger every few clock ticks
    if ((clock % this.multiplier) === 0) {
      return clock /= this.multiplier;
    } else {
      return null;
    }
  }


  toJSON() {
    return ({
      pitch: this.pitch,
      velocity: this.velocity,
      duration: this.duration,
      multiplier: this.multiplier,
      mute: this.mute,
      patterns: this.patterns
    });
  }

  fromJSON({pitch,velocity,duration,multiplier,mute,patterns}) {
    if (pitch != null) { this.pitch = pitch; }
    if (velocity != null) { this.velocity = velocity; }
    if (duration != null) { this.duration = duration; }
    if (multiplier != null) { this.multiplier = multiplier; }
    if (mute != null) { this.mute = mute; }
    if ((patterns != null ? patterns.length : undefined) > 0) {
      for (let i = 0; i < this.patterns.length; i++) {
        const pattern = this.patterns[i];
        const json = patterns[i];
        if (json != null) { pattern.fromJSON(json); }
      }
    }
  }
}
Track.initClass();