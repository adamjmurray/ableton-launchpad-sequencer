import { DEFAULT, MODE, NUMBER_OF } from '../config';
import Scale from './Scale';
import Track from './Track';

const { GATE_SUMMING } = MODE;

export default class Model {

  constructor() {
    this.scale = new Scale;
    this.tracks = [...Array(NUMBER_OF.TRACKS)].map((_, index) => new Track(index));
    this.reset();
  }

  reset() {
    this.globalStepDuration = DEFAULT.STEP_DURATION; // behavior handled by Max, only for storage and rendering
    this.scale.reset();
    this.modulationSummingMode = DEFAULT.MODULATION_SUMMING_MODE;
    this.modulationSlew = DEFAULT.MODULATION_SLEW; // behavior handled by Max, only for storage and rendering
    this.tracks.forEach(track => track.reset());
    this.selectedTrackIndex = 0;
    this.selectedPatternIndex = NUMBER_OF.PATTERNS - 1; // The last pattern is a note-producing pattern (and the first is not)
    this.selectedValue = DEFAULT.VALUE;
    this.clockIndex = -1;
    this.mode = MODE.SEQUENCER;
    this._aftertouchValues = [];
    this._modulationValues = [];
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
    const atValues = this._aftertouchValues;
    const modValues = this._modulationValues;
    const hasPitch = {};
    const dedupedNotes = [];
    this.tracks.forEach((track, trackIndex) => {
      const notes = track.notesForClock(this.clockIndex, this.scale);
      notes.forEach((note) => {
        if (note && note.enabled) {
          if (note.pitch != null && !hasPitch[note.pitch]) {
            dedupedNotes.push(note);
            hasPitch[note.pitch] = true;
          }
        }
      });
      // We only use the first note to store aftertouch and modulation:
      // (TODO: track.notesForClock() could return dedicated aftertouch and modulation values like below)
      atValues[trackIndex] = track.mute ? 0 : notes[0].aftertouch;
      modValues[trackIndex] = track.mute ? 0 : notes[0].modulation;
    });
    return {
      notes: dedupedNotes,
      aftertouch: this._modValue(atValues),
      modulation: this._modValue(modValues),
    };
  }

  _modValue(values) {
    switch (this.modulationSummingMode) {
      case GATE_SUMMING.ADD:
        return values.reduce((x, y) => x + y);

      case GATE_SUMMING.AVERAGE:
        return values.reduce((x, y) => x + y) / values.length;

      case GATE_SUMMING.HIGHEST:
        return Math.max(...values);

      case GATE_SUMMING.LOWEST:
        return Math.min(...values);

      case GATE_SUMMING.RANDOM:
        return values[Math.floor(Math.random() * values.length)];

      default:
        console.error(`Unsupported modulation summing mode: ${this.modulationSummingMode}`)
        return 0;
    }
  }
}
