import { DEFAULT, MODE, NUMBER_OF } from '../config';
import Scale from './Scale';
import Track from './Track';

export default class Model {

  constructor() {
    this.scale = new Scale;
    this.tracks = [...Array(NUMBER_OF.TRACKS)].map((_, index) => new Track(index, this.scale));
    this.reset();
  }

  reset() {
    this.globalStepDuration = DEFAULT.STEP_DURATION;
    this.scale.pitchClasses = DEFAULT.PITCH_CLASSES;
    this.tracks.forEach(track => track.reset());
    this.selectedTrackIndex = 0;
    this.selectedPatternIndex = NUMBER_OF.PATTERNS - 1; // The last pattern is a note-producing pattern (and the first is not)
    this.selectedValue = DEFAULT.VALUE;
    this.selectedStepIndex = -1;
    this.clockIndex = -1;
    this.mode = MODE.SEQUENCER;
  }

  get selectedTrack() {
    return this.tracks[this.selectedTrackIndex];
  }

  get selectedPattern() {
    return this.selectedTrack.patterns[this.selectedPatternIndex];
  }

  notesForCurrentClockIndex() {
    const notes = this.tracks.map((track) => track.noteForClock(this.clockIndex));
    return notes.reduce((dedupedNotes, note) => {
      if (note && !dedupedNotes.find(n => n.pitch === note.pitch)) {
        dedupedNotes.push(note);
      }
      return notes;
    }, []);
    // TODO: apply global transpose (maybe pass into noteForClock?)
    // this.tracks.forEach((track) => {
    // const note = track.noteForClock(clockIndex);
    // if (note) {
    //   if ((note.duration > 0) && (note.velocity > 0)) {
    //     outlet(OUTLET.NOTE, note.pitch + this.globalTranspose, note.velocity, note.duration);
    //   }
    //   if (note.modulation != null) {
    //     outlet(OUTLET.CC, 1, note.modulation);
    //   }
    //   if (note.aftertouch != null) {
    //     outlet(OUTLET.AFTERTOUCH, note.aftertouch);
    //   }
    // }
    // });
  }

  fromJSON({ scale, stepLength, tracks }) {
    if (scale != null) {
      this.scale.pitchClasses = scale;
    }
    if (stepLength != null) {
      this.globalStepDuration = stepLength;
    }
    if (tracks != null) {
      tracks.forEach((track, index) =>
        this.tracks[index].fromJSON(track)
      );
    }
  }
}