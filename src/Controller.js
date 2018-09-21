import { NUMBER_OF } from './Config';

// const SAVE_DELAY = 2500; // ms

export default class Controller {

  constructor(model) {
    this._model = model;
  }

  // // but this isn't called form the outside ...
  // handleChange() {
  //   // use a delay to avoid creating undo state on every interaction
  //   if (this.saveAfterDelay) {
  //     this.saveAfterDelay.cancel();
  //   }
  //   this.saveAfterDelay = new Task(() => {
  //     this.saveAfterDelay = null;
  //     this.onSave();
  //   })
  //   this.saveAfterDelay.schedule(SAVE_DELAY);
  // }

  sync() {
    this._model.sync();
  }

  load(jsonString) {
    const json = JSON.parse(jsonString);
    this._model.loadJSON(json);
  }

  reset() {
    this._model.reset();
  }

  handleLaunchpadNote(pitch, velocity) {
    // export function notein(pitch, velocity) {
    //   launchdpadController.notein(pitch, velocity);
    // };
  }

  handleLaunchpadCC(cc, value) {
    // export function ctlin(cc, val) {
    //   if (cc !== MIDI.TRANSPORT_STOP) {
    //     launchdpadController.ctlin(cc, val);
    //   } else {
    //     sequencerController.stop();
    //     save(); // this is a good time to save state without affecting realtime audio performance
    //   }
    // };
  }

  handleTrackNote(pitch, velocity) {
    // TODO: port from MidiController
    // But I want to drastically simplify:
    // - Only track muting, not pattern muting
    // - No set base track pitch
    // - Bigger range for setting the scale (in the middle of the keyboard)
    // - Global transpose should be relative to scale (i.e. allow you to adjust the arpeggio)

    // export function note(pitch, velocity) {
    //   midiController.note(pitch, velocity);
    // };
  }

  handleClockTick(clockIndex) {
    this._model.activeStepIndex = clockIndex % NUMBER_OF.STEPS;
  }


  setGlobalStepDuration(stepDuration) {
    this._model.globalStepDuration = stepDuration;
  }

  setScale(...pitchClasses) {
    this._model.scalePitchClasses = pitchClasses;
  }


  selectTrack(trackIndex) {
    this._model.selectTrack(trackIndex);
  }

  selectValue(value) {
    this._model.selectValue(value);
  }

  selectPattern(patternIndex) {
    this._model.selectedPattern(patternIndex);
  }

  handleGridPress(x, y) {
    // TODO: Here we need to deal with "pattern ops mode"
    // Handle toggling logic here?
  }


  setSlectedTrackBasePitch(pitch) {

  }

  setSlectedTrackBaseVelocity(velocity) {

  }

  setSlectedTrackGate(multiplier) {

  }

  setSlectedTrackMute(mute) {

  }

  setSlectedTrackDurationMultiplier(multiplier) {
    ;
  }


  setSelectedPatternStartStep(stepIndex) {

  }

  setSelectedPatternEndStep(stepIndex) {

  }

  setPatternMute(mute, patternIndex = this._model.selectedPatternIndex) {

  }

  reverseSelectedPattern() {
    this._model.reversePattern();
  }

  invertSelectedPattern() {
    this._model.invertPattern();
  }

  shiftSelectedPatternLeft() {
    this._model.shiftPattern(1); // Do the signs these numbers seem backwards?
  }

  shiftSelectedPatternRight() {
    this._model.shiftPattern(-1);
  }

  shiftSelectedPatternUp() {
    this._model.shiftPattern(NUMBER_OF.COLUMNS);
  }

  shiftSelectedPatternDown() {
    this._model.shiftPattern(-NUMBER_OF.COLUMNS);
  }

  copyStepsFromSelectedPattern() {
    this._stepsClipboard = this._model.selectedPatternSteps.slice(); // slice to freeze this state
  }

  pasteStepsToSelectedPattern() {
    if (this._stepsClipboard) {
      this._model.selectedPatternSteps = this._stepsClipboard;
    }
  }
}