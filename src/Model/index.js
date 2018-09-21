import { DEFAULT, MODE, NUMBER_OF } from '../Config';
import Scale from './Scale';
import Track from './Track';

const NOOP = () => { }; // the "no operation" function

export default class Model {

  constructor(eventHandler = {}) {
    this._scale = new Scale;
    this._tracks = [...Array(NUMBER_OF.TRACKS)].map((_, index) => new Track(index, this.scale));
    this.eventHandler = eventHandler;
    this.reset();
  }

  reset() {
    this._globalStepDuration = DEFAULT.STEP_DURATION;
    this._globalTranspose = 0;
    this._scale.pitchClasses = DEFAULT.PITCH_CLASSES;
    this._tracks.forEach(track => track.reset());
    this._selectedTrackIndex = 0;
    this._selectedPatternIndex = NUMBER_OF.PATTERNS - 1; // The last pattern is a note-producing pattern (and the first is not)
    this._selectedValue = 1;
    this._activeStepIndex = 0;
    this._mode = MODE.SEQUENCER;

    this._onRefresh(this);
  }

  set eventHandler({
    onRefresh = NOOP,
    onTrackChange = NOOP,
    onPatternChange = NOOP,
    onValueChange = NOOP,
    onGridChange = NOOP,
    onStepChange = NOOP,
    onClockChange = NOOP,
    onModeChange = NOOP,
  }) {
    this._onRefresh = onRefresh;
    this._onTrackChange = onTrackChange;
    this._onPatternChange = onPatternChange;
    this._onValueChange = onValueChange;
    this._onGridChange = onGridChange;
    this._onStepChange = onStepChange;
    this._onClockChange = onClockChange;
    this._onModeChange = onModeChange;
  }

  set globalTranspose(amount) {
    this._globalTranspose = amount;
  }

  set globalStepDuration(stepDuration) {
    this._globalStepDuration = stepDuration;
  }

  set scalePitchClasses(pitchClasses) {
    this._scale.pitchClasses = pitchClasses;
  }

  // get tracks() {
  //   return this._tracks;
  // }

  // get selectedTrack() {
  //   return this._tracks[this._selectedTrackIndex];
  // }

  // get selectedTrackIndex() {
  //   return this._selectedTrackIndex;
  // }

  selectTrack(trackIndex) {
    this._selectedTrackIndex = trackIndex;
    this._onTrackChange(this);
  }

  get patterns() {
    return this._patterns;
  }

  // get selectedPatternIndex() {
  //   return this._selectedPatternIndex;
  // }

  // get selectedPattern() {
  //   return this.selectedTrack.patterns[this._selectedPatternIndex];
  // }

  selectPattern(patternIndex) {
    this._selectedPatternIndex = patternIndex;
    this._onPatternChange(this);
  }

  get selectedPatternSteps() {
    // TODO: Have tracks keep track of their own selected pattern?
    return this
      ._tracks[this._selectedTrackIndex]
      .patterns[this._selectedPatternIndex]
      .steps;
  }

  set selectedPatternSteps(steps) {
    this
      ._tracks[this._selectedTrackIndex]
      .patterns[this._selectedPatternIndex]
      .steps = steps;
  }

  // get selectedValue() {
  //   return this._selectedValue;
  // }

  selectValue(stepValue) {
    this._selectedValue = stepValue;
    this._onValueChange(this);
  }

  setStep(stepIndex, stepValue, pattern = this.selectedPattern) {
    const { steps } = pattern;
    // TODO: should we handle the toggling logic in the controller?
    steps[stepIndex] = steps[stepIndex] === stepValue ? 0 : stepValue;
    this._onStepChange(this); // either need to pass in the stepIndex or keep track of selectedStepIndex (I prefer the latter for consistency)
  }

  get activeStepIndex() {
    return this._activeStepIndex;
  }

  // TODO: rename to clock-something?
  set activeStepIndex(stepIndex) {
    this._activeStepIndex = stepIndex;
    this._onClockChange(this);
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

  get mode() {
    return this._mode;
  }

  set mode(mode) {
    this._mode = mode;
    this._onModeChange(this);
  }

  reversePattern(patternIndex = this._selectedPatternIndex) {
    this._patterns[patternIndex].reverse();
    this._onGridChange();
  }

  invertPattern(patternIndex = this._model.selectedPatternIndex) {
    // export function invert() {
    //   sequencerController.invert();
    // };
    this._model.patterns[patternIndex].invert();
    this._onGridChange();
  }

  // export function replace() {
  //   sequencerController.replace();
  // };

  shiftPattern(amount, patternIndex = this._model.selectedPatternIndex) {
    this._model.patterns[patternIndex].rotate(amount); // TODO: rename to shift?
    this._onGridChange();
  }
}