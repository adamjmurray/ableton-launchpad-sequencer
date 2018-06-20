import Scale from './scale';
import { DEFAULT_STEP_LENGTH, TRACKS, NOTE, CC, AFTERTOUCH } from '../config';

// The controller for the sequencing application.
// Manages state and keeps the views updated.
export default class Sequencer {

  constructor() {
    this.scale = new Scale();
    this.reset(true);
  }

  // Clear all patterns and set all track and pattern properties to their default values.
  reset() {
    this.stepLength = DEFAULT_STEP_LENGTH;
    this.scale.setSteps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    this.globalTranspose = 0;
    this.tracks = [...Array(TRACKS)].map((_, index) => new Track(index));
  }

  step(clockIndex) {
    if (clockIndex < 0) return;
    for (const track of this.tracks) {
      const note = track.noteForClock(clockIndex);
      if (note) {
        if ((note.duration > 0) && (note.velocity > 0)) {
          outlet(NOTE, note.pitch + this.globalTranspose, note.velocity, note.duration);
        }
        if (note.modulation != null) {
          outlet(CC, 1, note.modulation);
        }
        if (note.aftertouch != null) {
          outlet(AFTERTOUCH, note.aftertouch);
        }
      }
    }
  }

  toJSON(options = {}) {
    const json = {
      scale: this.scale.getSteps(),
      stepLength: this.stepLength
    };
    if (!options.omitTracks) {
      json.tracks = this.tracks;
    }
    return json;
  }

  fromJSON({ scale, stepLength, tracks }) {
    if (scale != null) {
      this.scale.setSteps(scale);
    }
    if (stepLength != null) {
      this.stepLength = stepLength;
    }
    if (tracks != null) {
      tracks.forEach((track, index) => this.tracks[index].fromJSON(track));
    }
  }
}
