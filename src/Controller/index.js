import { DEFAULT, GESTURE, MODE, NUMBER_OF } from '../Config';
import PressGesture from './PressGesture';
import RangeSelectionGesture from './RangeSelectionGesture';

// const SAVE_DELAY = 2500; // ms

function xyToIndex(x, y) {
  return (y * NUMBER_OF.COLUMNS) + x;
}

export default class Controller {

  constructor(model, view) {
    this._model = model;
    this._view = view;
    this._topButtonGesture = new PressGesture;
    this._rightButtonGesture = new PressGesture;
    this._gridButtonGesture = new RangeSelectionGesture;
    this.refreshViews();
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

  refreshViews() {
    this._view.refresh(this._model);
  }

  load(jsonString) {
    const json = JSON.parse(jsonString);
    this._model.loadJSON(json);
    this._view.refresh(this._model);
  }

  reset() {
    this._model.reset();
    this._topButtonGesture.reset();
    this._rightButtonGesture.reset();
    this._gridButtonGesture.reset();
    this._heldTopButton = false;
    this._view.refresh(this._model);
  }

  handleLaunchpadCC(cc, value) {
    this._handleLaunchpadTopButton(cc - 104, value > 0);
  }

  handleLaunchpadNote(pitch, velocity) {
    const x = pitch % 16;
    const y = Math.floor(pitch / 16);
    if (x > 7) {
      this._handleLaunchpadRightButton(y, velocity > 0);
    } else {
      this._handleLaunchpadGridButton(xyToIndex(x, y), velocity > 0);
    }
  }

  _handleLaunchpadTopButton(index, isPressed) {
    if (isPressed) {
      if (this._model.mode === MODE.PATTERN_EDIT) {
        switch (index) {
          case 0: return this.shiftSelectedPatternUp();
          case 1: return this.shiftSelectedPatternDown();
          case 2: return this.shiftSelectedPatternLeft();
          case 3: return this.shiftSelectedPatternRight();
          case 4: return this.reverseSelectedPattern();
          case 5: return this.invertSelectedPattern();
          case 6: return this.copyStepsFromSelectedPattern();
          case 7: return this.pasteStepsToSelectedPattern();
        }
      } else {
        if (index <= 3) {
          switch (this._topButtonGesture.interpretPress(index)) {
            case GESTURE.SELECT:
              return this.selectTrack(index);
            case GESTURE.TRIPLE_PRESS:
              return this.setSelectedTrackMute(!this._model.selectedTrack.mute);
          }
        } else {
          this.selectOrToggleValue(index - 3);
        }
      }
    }
    this._heldTopButton = isPressed;
    this._rightButtonGesture.reset();
  }

  _handleLaunchpadRightButton(index, isPressed) {
    if (isPressed) {
      if (model.mode === MODE.PATTERN_EDIT) {
        this._model.mode = MODE.SEQUENCER;
        this._view.refresh(this._model);
        // Should we select the pattern too?
      }
      else {
        switch (this._rightButtonGesture.interpretPress(index)) {
          case GESTURE.SELECT:
            return this.selectPattern(index);
          case GESTURE.TRIPLE_PRESS:
            if (this._heldTopButton) {
              this._model.mode = MODE.PATTERN_EDIT;
              this._gridButtonGesture.reset();
              this._view.refresh(this._model);
            } else {
              return this.setSelectedPatternMute(!this._model.selectedPattern.mute);
            }
        }
      }
    }
    this._topButtonGesture.reset();
  }

  _handleLaunchpadGridButton(index, isPressed) {
    if (this._model.mode === MODE.PATTERN_EDIT) {
      const range = this._gridButtonGesture.interpretRangeSelection(index, isPressed);
      if (range) {
        model.selectedPattern.setRange(...range);
        this._view.onGridChange(this._model);
      }
    }
    else if (isPressed) {
      this.handleGuiGridPress(x, y);
    }
  }

  handleTrackNote(pitch, velocity) {
    // TODO: port from MidiController
    // But I want to drastically simplify:
    // - Only track muting, not pattern muting (or maybe just allow for muting the 3 gate patterns in each track)
    // - No set base track pitch
    // - Bigger range for setting the scale (in the middle of the keyboard)
    // - Global transpose should be relative to scale (i.e. allow you to adjust the arpeggio)
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
    this._view.onTrackChange(this._model);
  }

  selectOrToggleValue(value) {
    this._model.selectValue((this._model.selectedValue === value) ? DEFAULT.VALUE : value);
    this._view.onValueChange(this._model);
  }

  selectPattern(patternIndex) {
    this._model.selectedPattern(patternIndex);
    this._view.onPatternChange(this._model);
  }

  handleGuiGridPress(x, y) {
    const stepIndex = xyToIndex(x, y);
    const model = this._model;
    const steps = model.selectedPattern.steps;
    const value = model.selectedValue;
    steps[stepIndex] = (steps[stepIndex] === value) ? DEFAULT.VALUE : value;
    model.selectedStepIndex = stepIndex;
    this._view.onStepChange(model);
  }

  setSlectedTrackPitch(pitch) {
    this._model.selectedTrack.pitch = pitch;
  }

  setSlectedTrackVelocity(velocity) {
    this._model.selectedTrack.velocity = velocity;
  }

  setSlectedTrackGate(gate) {
    this._model.selectedTrack.gate = gate;
  }

  setSlectedTrackMute(mute) {
    this._model.selectedTrack.mute = mute;
    this._view.onTrackChange(this._model);
  }

  setSlectedTrackDurationMultiplier(durationMultiplier) {
    this._model.selectedTrack.durationMultiplier = durationMultiplier;
  }

  setSelectedPatternStartStepIndex(stepIndex) {
    this._model.selectedPattern.startStepIndex = stepIndex;
    this._view.onGridChange(this._model);
  }

  setSelectedPatternEndStepIndex(stepIndex) {
    this._model.selectedPattern.endStepIndex = stepIndex;
    this._view.onGridChange(this._model);
  }

  setSelectedPatternMute(mute) {
    this._model.selectedPattern.mute = mute;
    this._view.onPatternChange(this._model);
  }

  reverseSelectedPattern() {
    this._model.reversePattern();
    this._view.onGridChange(this._model);
  }

  invertSelectedPattern() {
    this._model.invertPattern();
    this._view.onGridChange(this._model);
  }

  shiftSelectedPatternLeft() {
    this._model.shiftPattern(1); // Do the signs these numbers seem backwards?
    this._view.onGridChange(this._model);
  }

  shiftSelectedPatternRight() {
    this._model.shiftPattern(-1);
    this._view.onGridChange(this._model);
  }

  shiftSelectedPatternUp() {
    this._model.shiftPattern(NUMBER_OF.COLUMNS);
    this._view.onGridChange(this._model);
  }

  shiftSelectedPatternDown() {
    this._model.shiftPattern(-NUMBER_OF.COLUMNS);
    this._view.onGridChange(this._model);
  }

  copyStepsFromSelectedPattern() {
    this._stepsClipboard = this._model.selectedPattern.steps.slice(); // slice to freeze this state
  }

  pasteStepsToSelectedPattern() {
    if (this._stepsClipboard) {
      this._model.selectedPattern.steps = this._stepsClipboard;
      this._view.onGridChange(this._model);
    }
  }
}