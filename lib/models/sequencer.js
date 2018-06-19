/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// The controller for the sequencing application.
// Manages state and keeps the views updated.
//
class Sequencer {

  constructor() {
    this.scale = Scale.instance;
    this.reset(true);
  }


  // Clear all patterns and set all track and pattern properties to their default values.
  reset() {
    this.stepLength = DEFAULT_STEP_LENGTH;
    this.scale.setSteps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    this.globalTranspose = 0;
    this.tracks = ((() => {
      const result = [];
      for (let index = 0, end = TRACKS; index < end; index++) {
        result.push(new Track(index));
      }
      return result;
    })());
  }


  step(clockIndex) {
    if (clockIndex < 0) { return; }
    for (let index = 0; index < this.tracks.length; index++) {
      const track = this.tracks[index];
      const note = track.noteForClock(clockIndex);
      if (note == null) { continue; } // no note when track is muted

      if ((note.duration > 0) && (note.velocity > 0)) {
        outlet(NOTE, note.pitch + this.globalTranspose, note.velocity, note.duration);
      }

      if (note.modulation != null) { outlet(CC, 1, note.modulation); }
      if (note.aftertouch != null) { outlet(AFTERTOUCH, note.aftertouch); }
    }

  }


  toJSON(options) {
    const json = {
      scale: this.scale.getSteps(),
      stepLength: this.stepLength
    };
    if (!(options != null ? options.omitTracks : undefined)) { json.tracks = this.tracks; }
    return json;
  }


  fromJSON({scale,stepLength,tracks}) {
    if (scale != null) { this.scale.setSteps(scale); }
    if (stepLength != null) { this.stepLength = stepLength; }
    if ((tracks != null ? tracks.length : undefined) > 0) {
      for (let i = 0; i < this.tracks.length; i++) {
        const track = this.tracks[i];
        const json = tracks[i];
        if (json) { track.fromJSON(json); }
      }
    }
  }
}