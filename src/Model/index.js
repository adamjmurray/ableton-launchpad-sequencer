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
    this.scale.pitchClasses = DEFAULT.PITCH_CLASSES.slice(); // create a copy so we don't modify the default
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

  notesForCurrentClockIndex() {
    const notes = this.tracks.map((track) => track.noteForClock(this.clockIndex));
    return notes.reduce((dedupedNotes, note) => {
      if (note && !dedupedNotes.find(n => n.pitch === note.pitch)) {
        dedupedNotes.push(note);
      }
      return notes;
    }, []);
  }
}
