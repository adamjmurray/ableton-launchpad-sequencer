import { DEFAULT, MODE, NUMBER_OF } from '../Config';
import Scale from './Scale';
import Track from './Track';

const NOOP = () => { }; // the "no operation" function

export default class Model {

  constructor() {
    this._scale = new Scale;
    this._tracks = [...Array(NUMBER_OF.TRACKS)].map((_, index) => new Track(index, this.scale));
    this.reset();
  }

  reset() {
    this.globalStepDuration = DEFAULT.STEP_DURATION;
    // this.globalTranspose = 0;
    this.scale.pitchClasses = DEFAULT.PITCH_CLASSES;
    this.tracks.forEach(track => track.reset());
    this.selectedTrackIndex = 0;
    this.selectedPatternIndex = NUMBER_OF.PATTERNS - 1; // The last pattern is a note-producing pattern (and the first is not)
    this.selectedValue = 1;
    this.selectedStepIndex = 0;
    this.activeStepIndex = 0; // TODO rename to clock
    this.mode = MODE.SEQUENCER;
  }

  get selectedTrack() {
    return this._tracks[this._selectedTrackIndex];
  }

  selectTrack(trackIndex) {
    this._selectedTrackIndex = trackIndex;
    this._onTrackChange(this);
  }

  get selectedPattern() {
    return this.selectedTrack.patterns[this._selectedPatternIndex];
  }

  selectPattern(patternIndex) {
    this._selectedPatternIndex = patternIndex;
  }

  selectValue(value) {
    this._selectedValue = value;
  }

  getNotes(clockIndex) {
    const notes = this._tracks.map((track) => track.noteForClock(clockIndex));
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
}