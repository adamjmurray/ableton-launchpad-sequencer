import { DEFAULT, MODE, NUMBER_OF } from '../config';
import Scale from './Scale';
import Track from './Track';

export default class Model {

  constructor() {
    this.scale = new Scale;
    this.tracks = [...Array(NUMBER_OF.TRACKS)].map((_, index) => new Track(index));
    this.reset();
  }

  reset() {
    this.globalStepDuration = DEFAULT.STEP_DURATION;
    // TODO: this.scale.pitchClasses = DEFAULT.PITCH_CLASSES.slice(); // create a copy so we don't modify the default
    this.tracks.forEach(track => track.reset());
    this.selectedTrackIndex = 0;
    this.selectedPatternIndex = NUMBER_OF.PATTERNS - 1; // The last pattern is a note-producing pattern (and the first is not)
    this.selectedValue = DEFAULT.VALUE;
    this.clockIndex = -1;
    this.mode = MODE.SEQUENCER;
  }

  get selectedTrack() {
    return this.tracks[this.selectedTrackIndex];
  }

  get selectedPattern() {
    return this.selectedTrack.patterns[this.selectedPatternIndex];
  }

  notesAndModsForCurrentClockIndex() {
    const clockIndex = this.clockIndex;
    if (clockIndex < 0) {
      return {};
    }
    let aftertouch = 0;
    let modulation = 0;
    const pitches = {};
    let notes = [];
    this.tracks.forEach((track) => {
      const rawNotes = track.notesForClock(this.clockIndex, this.scale);
      rawNotes.forEach((note) => {
        if (note && note.enabled) {
          if (note.pitch != null && !pitches[note.pitch]) {
            notes.push(note);
            pitches[note.pitch] = true;
          }
        }
        aftertouch += note.aftertouch;
        modulation += note.modulation;
      });
    });
    return { notes, aftertouch, modulation };
  }
}
