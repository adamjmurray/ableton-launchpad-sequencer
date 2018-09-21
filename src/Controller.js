import Model from './Model';
import { NUMBER_OF } from './Config';

// const SAVE_DELAY = 2500; // ms

export default class Controller {

  constructor() {
    this._model = new Model();
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

  // //--------------------------------------------------------------
  // // Persistence
  // //

  copyPattern(patternIndex = this._model.selectedPatternIndex) {
    // TODO
    // export function copy() {
    //   sequencerController.copyPattern();
    // };
  }

  pastePattern(patternIndex = this._model.selectedPatternIndex) {
    // TODO:
    // export function paste() {
    //   sequencerController.pastePattern();
    // };
  }


  // Not supporting import/export anymore
  // export function importFile(filepath) {
  //   storageController.import(filepath);
  // };

  // export function exportFile(filepath) {
  //   storageController.export(filepath);
  // };


  // TODO: handle completely internally? And/or continue to save on transport stop...
  // export function save() {
  //   storageController.save();
  // };


  load(jsonString) {
    const json = JSON.parse(jsonString);
    this._model.loadJSON(json);
    // TODO: update views
    // export function load(path, ...values) {
    //   storageController.load(path, ...Array.from(values));
    // };
  }

  reset() {
    // reset() {
    //   sequencerController.reset();
    // }
    this._model.reset();
    // TODO: update views
  }

  refreshViews() {
    // bang() {
    //   sequencerController.redraw();
    // };
    this.onSync();
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
    // export function clock(clockIndex) {
    //   sequencerController.setClock(clockIndex);
    // };
    this._model.activeStepIndex = clockIndex % NUMBER_OF.STEPS;
  }


  setGlobalStepLength(stepLength) {
    // export function stepLength(stepLength) {
    //   sequencerController.setStepLength(stepLength);
    // };
  }

  setScale(pitchClasses) {
    this._model.scale = pitchClasses;
    // export function setScale(...pitchClasses) {
    //   sequencerController.setScale(pitchClasses);
    // };
  }

  // //--------------------------------------------------------------
  // // GUI Launchpad Buttons
  // //
  selectTrack(trackIndex) {
    // export function track(trackIndex) {
    //   sequencerController.selectTrack(trackIndex);
    // };
    this._model.selectTrack(trackIndex);
  }

  selectStepValue(value) {
    this._model.selectStepValue(value);
    // export function stepValue(value) {
    //   sequencerController.selectValue(value);
    // };
  }

  selectPattern(patternIndex) {
    this._model.selectedPattern(patternIndex);
    // export function pattern(patternIndex) {
    //   sequencerController.selectPattern(patternIndex);
    // };
  }

  handleGridPress(x, y) {
    // TODO: Here we need to deal with "pattern ops mode"
    // Handle toggling logic here?

    // export function grid(x, y) {
    //   sequencerController.setGridValue(x, y);
    // };
  }

  // //--------------------------------------------------------------
  // // Track Settings
  // //
  setTrackBasePitch(pitch) {
    // export function basePitch(pitch) {
    //   sequencerController.setSelectedTrackPitch(pitch);
    // };
  }

  setTrackBaseVelocity(velocity) {
    // export function baseVelocity(velocity) {
    //   sequencerController.setSelectedTrackVelocity(velocity);
    // };
  }

  setTrackGate(multiplier) {
    // export function durationScale(scale) {
    //   sequencerController.setSelectedTrackDurationScale(scale);
    // };
  }

  setTrackMute(mute) {
    // export function trackMute(mute) {
    //   sequencerController.setSelectedTrackMute(mute);
    // };
  }

  setTrackStepLengthMultiplier(multiplier) {
    // export function trackMultiplier(multiplier) {
    //   sequencerController.setSelectedTrackStepLengthMultiplier(multiplier);
    // };
  }

  // //--------------------------------------------------------------
  // // Pattern Settings
  // //
  setPatternStartStep(stepIndex) {
    // export function startStep(stepNumber) {
    //   sequencerController.setSelectedPatternStartStep(stepNumber - 1);
    // };
  }

  setPatternEndStep(stepIndex) {
    // export function endStep(stepNumber) {
    //   sequencerController.setSelectedPatternEndStep(stepNumber - 1);
    // };
  }

  setPatternType(type, patternIndex = this._model.selectedPatternIndex) {
    // export function patternType(type) {
    //   sequencerController.setSelectedPatternType(type);
    // };
  }

  setPatternMute(mute, patternIndex = this._model.selectedPatternIndex) {
    // export function patternMute(mute) {
    //   sequencerController.setSelectedPatternMute(mute);
    // };
  }

  // NOTE: getting rid of most of these. I want all functionality (besides track settings) to be controllable on the hardware
  // //--------------------------------------------------------------
  // // Pattern Operations
  // //
  // export function random() {
  //   sequencerController.random();
  // };

  // export function randomFill() {
  //   sequencerController.randomFill();
  // };

  // export function randomThin() {
  //   sequencerController.randomFill(0);
  // };

  // export function fill() {
  //   sequencerController.fill();
  // };

  // export function clear() {
  //   sequencerController.fill(0);
  // };

  // export function firstColumn() {
  //   sequencerController.firstColumn();
  // };

  reversePattern(patternIndex = this._model.selectedPatternIndex) {
    // export function reverse() {
    //   sequencerController.reverse();
    // };
    this._model.patterns[patternIndex].reverse();
  }

  invertPattern(patternIndex = this._model.selectedPatternIndex) {
    // export function invert() {
    //   sequencerController.invert();
    // };
    this._model.patterns[patternIndex].invert();
  }

  // export function replace() {
  //   sequencerController.replace();
  // };

  shiftPattern(amount, patternIndex = this._model.selectedPatternIndex) {
    this._model.patterns[patternIndex].rotate(amount); // TODO: rename to shift?
    // TODO: we can handle all of these by passing in the appropiate amount from main/Router
    // export function shiftleft() {
    //   sequencerController.rotate(1);
    // };

    // export function shiftup() {
    //   sequencerController.rotate(NUMBER_OF.COLUMNS);
    // };

    // export function shiftright() {
    //   sequencerController.rotate(-1);
    // };

    // export function shiftdown() {
    //   sequencerController.rotate(-NUMBER_OF.COLUMNS);
    // };
  }
}