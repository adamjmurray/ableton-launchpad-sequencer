import { GESTURE, LAUNCHPAD, MIDI, MODE, NUMBER_OF, OUTLET, STEP_VALUE, STORAGE } from '../config';
import StorageController from './StorageController';
import PressGesture from './PressGesture';
import RangeSelectionGesture from './RangeSelectionGesture';

const {
  DURATION,
  SCALE,
  TRACKS,
  PITCH,
  VELOCITY,
  GATE,
  MULTIPLIER,
  MUTE,
  PATTERNS,
  STEPS,
  START,
  END,
} = STORAGE;

const xyToIndex = (x, y) => x + (y * NUMBER_OF.COLUMNS);

export default class Controller {

  constructor(model, view) {
    this._model = model;
    this._view = view;
    this._storage = new StorageController;
    this._topButtonGesture = new PressGesture;
    this._rightButtonGesture = new PressGesture;
    this._gridButtonGesture = new RangeSelectionGesture;
    this._patternStepsClipboard = null;
    this._patternStepsUndo = null;
  }


  // Render any transient view states that are not persisted and won't be restored by setModel()
  initViews() {
    this._view.renderTrackIndex();
    this._view.renderPatternIndex();
    this._view.renderValue();
  }

  refreshViews() {
    this._view.render();
  }

  reset() {
    this._model.reset();
    this._topButtonGesture.reset();
    this._rightButtonGesture.reset();
    this._gridButtonGesture.reset();
    this._heldTopButton = false;
    this._view.render();
    this._storage.storeAll(this._model);
  }

  setModel(data) {
    switch (data[0]) {
      case DURATION: return this.setDuration(data[1], false);
      case SCALE: return this.setScale(data.slice(1), false);
      case TRACKS:
        const trackIndex = data[1];
        switch (data[2]) {
          case PITCH: return this.setTrackPitch(data[3], trackIndex, false);
          case VELOCITY: return this.setTrackVelocity(data[3], trackIndex, false);
          case GATE: return this.setTrackGate(data[3], trackIndex, false);
          case MULTIPLIER: return this.setTrackMultiplier(data[3], trackIndex, false);
          case MUTE: return this.setTrackMute(data[3], trackIndex, false);
          case PATTERNS:
            const patternIndex = data[3];
            switch (data[4]) {
              case STEPS: return this.setPatternSteps(data.slice(5), trackIndex, patternIndex, false);
              case START: return this.setPatternStart(data[5], trackIndex, patternIndex, false);
              case END: return this.setPatternEnd(data[5], trackIndex, patternIndex, false);
              case MUTE: return this.setPatternMute(data[5], trackIndex, patternIndex, false);
            }
        }
    }
  }

  handleLaunchpadCC(cc, value) {
    if (cc !== MIDI.TRANSPORT_STOP) {
      this._handleLaunchpadTopButton(cc - LAUNCHPAD.TOP_ROW_CC, value > 0);
    } else {
      this.handleClockTick(-1);
      this._view.render(); // transport stop clears the launchpad grid
    }
  }

  handleLaunchpadNote(pitch, velocity) {
    const x = pitch % 16;
    const y = Math.floor(pitch / 16);
    if (x > 7) {
      this._handleLaunchpadRightButton(y, velocity > 0);
    } else {
      this._handleLaunchpadGridButton(x, y, velocity > 0);
    }
  }

  _handleLaunchpadTopButton(index, isPressed) {
    if (isPressed) {
      if (this._model.mode === MODE.PATTERN_EDIT) {
        const gesture = this._topButtonGesture.interpretPress(index);
        switch (index) {
          case 0:
            this.shiftSelectedPatternUp();
            break;
          case 1:
            this.shiftSelectedPatternDown();
            break;
          case 2:
            this.shiftSelectedPatternLeft();
            break;
          case 3:
            this.shiftSelectedPatternRight();
            break;
          case 4:
            this.reverseSelectedPattern();
            break;
          case 5:
            if (gesture === GESTURE.DOUBLE_PRESS) {
              this._undoSelectedPatternSteps();
            } else {
              this._recordSelectedPatternStepsForUndo();
              this.randomizeSelectedPattern();
            }
            break;
          case 6:
            this.copyStepsFromSelectedPattern();
            break;
          case 7:
            if (gesture === GESTURE.DOUBLE_PRESS) {
              this._undoSelectedPatternSteps();
            } else {
              this._recordSelectedPatternStepsForUndo();
              this.pasteStepsToSelectedPattern();
            }
            break;
        }
      } else {
        if (index <= 3) {
          switch (this._topButtonGesture.interpretPress(index)) {
            case GESTURE.SELECT:
              this.selectTrack(index);
              break;
            case GESTURE.TRIPLE_PRESS:
              this.setTrackMute(!this._model.selectedTrack.mute);
              this._topButtonGesture.reset(); // so we can reuse this gesture in pattern edit mode
              break;
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
    const model = this._model;
    if (isPressed) {
      if (model.mode === MODE.PATTERN_EDIT) {
        if (!this._heldTopButton) {
          model.mode = MODE.SEQUENCER;
          this.selectPattern(index, { forceRender: true });
        }
      }
      else {
        switch (this._rightButtonGesture.interpretPress(index)) {
          case GESTURE.SELECT:
            this.selectPattern(index);
            break;
          case GESTURE.TRIPLE_PRESS:
            if (this._heldTopButton) {
              model.mode = MODE.PATTERN_EDIT;
              this._gridButtonGesture.reset();
              this._view.render();
            } else {
              this.setPatternMute(!model.selectedPattern.mute);
            }
            break;
        }
      }
    }
    this._topButtonGesture.reset();
  }

  _handleLaunchpadGridButton(x, y, isPressed) {
    const stepIndex = xyToIndex(x, y);
    if (this._model.mode === MODE.PATTERN_EDIT) {
      const range = this._gridButtonGesture.interpretRangeSelection(stepIndex, isPressed);
      if (range) {
        this._model.selectedPattern.setRange(...range);
        this._view.renderGrid();
      }
    }
    else if (isPressed) {
      this.setStepToSelectedValue(stepIndex);
    }
    this._topButtonGesture.reset();
    this._rightButtonGesture.reset();
  }

  handleTrackNote(pitch, velocity) {
    // TODO
  }

  handleClockTick(clockIndex) {
    if (clockIndex !== this._model.clockIndex) {
      this._model.clockIndex = clockIndex;
      this._view.renderClock();
    }
    if (clockIndex >= 0) {
      this._model.tracks.forEach((track) => {
        const note = track.noteForClock(clockIndex);
        if (note.enabled && !note.mute) {
          if (note.duration > 0) {
            outlet(OUTLET.NOTE, note.pitch, note.velocity, note.duration);
          }
          if (note.modulation != null) {
            outlet(OUTLET.CC, 1, note.modulation);
          }
          if (note.aftertouch != null) {
            outlet(OUTLET.AFTERTOUCH, note.aftertouch);
          }
        }
      });
    }
  }

  setDuration(stepDuration, store = true) {
    // Note: The global step duration behavior is handled within the Max patch,
    // so the JavaScript code doesn't need to do anything besides render and store the current value.
    this._model.globalStepDuration = stepDuration;
    this._view.renderDuration(stepDuration);
    if (store) {
      this._storage.storeDuration(stepDuration);
    }
  }

  setScale(pitchClasses, store = true) {
    this._model.scale.pitchClasses = pitchClasses;
    this._view.renderScale(pitchClasses);
    if (store) {
      this._storage.storeScale(pitchClasses)
    }
  }

  selectTrack(trackIndex) {
    if (trackIndex !== this._model.selectedTrackIndex) {
      this._model.selectedTrackIndex = trackIndex;
      this._view.renderTrack(); // I'm debating renaming this to renderSelectedTrack() vs passing in a trackIndex
    }
  }

  selectPattern(patternIndex, { forceRender = false } = {}) {
    if (forceRender || patternIndex !== this._model.selectedPatternIndex) {
      this._model.selectedPatternIndex = patternIndex;
      this._view.renderPattern();
    }
  }

  selectOrToggleValue(value) {
    this._model.selectedValue = (this._model.selectedValue === value) ? STEP_VALUE.OFF : value;
    this._view.renderValue();
  }

  handleGridClick(x, y) {
    this.setStepToSelectedValue(xyToIndex(x, y));
  }

  setStepToSelectedValue(stepIndex) {
    const model = this._model;
    const steps = model.selectedPattern.steps;
    steps[stepIndex] = model.selectedValue;
    this._view.renderStep(stepIndex);
    this._storage.storePatternStepsAfterDelay(model.selectedTrackIndex, model.selectedPatternIndex, steps);
  }

  setTrackPitch(pitch, trackIndex = this._model.selectedTrackIndex, store = true) {
    this._model.tracks[trackIndex].pitch = pitch;
    if (trackIndex === this._model.selectedTrackIndex) {
      this._view.renderTrackPitch(pitch);
    }
    if (store) {
      this._storage.storeTrackPitch(trackIndex, pitch);
    }
  }

  setTrackVelocity(velocity, trackIndex = this._model.selectedTrackIndex, store = true) {
    this._model.tracks[trackIndex].velocity = velocity;
    if (trackIndex === this._model.selectedTrackIndex) {
      this._view.renderTrackVelocity();
    }
    if (store) {
      this._storage.storeTrackVelocity(trackIndex, velocity);
    }
  }

  setTrackGate(gate, trackIndex = this._model.selectedTrackIndex, store = true) {
    this._model.tracks[trackIndex].gate = gate;
    if (trackIndex === this._model.selectedTrackIndex) {
      this._view.renderTrackGate();
    }
    if (store) {
      this._storage.storeTrackGate(trackIndex, gate);
    }
  }

  setTrackMultiplier(multiplier, trackIndex = this._model.selectedTrackIndex, store = true) {
    this._model.tracks[trackIndex].durationMultiplier = multiplier;
    if (trackIndex === this._model.selectedTrackIndex) {
      this._view.renderTrackMultiplier();
    }
    if (store) {
      this._storage.storeTrackMultiplier(trackIndex, multiplier);
    }
  }

  setTrackMute(mute, trackIndex = this._model.selectedTrackIndex, store = true) {
    this._model.tracks[trackIndex].mute = mute;
    if (trackIndex === this._model.selectedTrackIndex) {
      this._view.renderTrackMute();
    }
    if (store) {
      this._storage.storeTrackMute(trackIndex, mute);
    }
  }

  setPatternSteps(steps, trackIndex = this._model.selectedTrackIndex, patternIndex = this._model.selectedPatternIndex, store = true) {
    const pattern = this._model.tracks[trackIndex].patterns[patternIndex];
    pattern.steps = steps;
    if (trackIndex === this._model.selectedTrackIndex && patternIndex === this._model.selectedPatternIndex) {
      this._view.renderGrid();
    }
    if (store) {
      this._storage.storePatternSteps(this._model.selectedTrackIndex, pattern.index, pattern.steps);
    }
  }

  setPatternStart(stepIndex, trackIndex = this._model.selectedTrackIndex, patternIndex = this._model.selectedPatternIndex, store = true) {
    this._model.tracks[trackIndex].patterns[patternIndex].startStepIndex = stepIndex;
    if (trackIndex === this._model.selectedTrackIndex && patternIndex === this._model.selectedPatternIndex) {
      this._view.renderPatternStart();
    }
    if (store) {
      this._storage.storePatternStart(trackIndex, patternIndex, stepIndex);
    }
  }

  setPatternEnd(stepIndex, trackIndex = this._model.selectedTrackIndex, patternIndex = this._model.selectedPatternIndex, store = true) {
    this._model.tracks[trackIndex].patterns[patternIndex].endStepIndex = stepIndex;
    if (trackIndex === this._model.selectedTrackIndex && patternIndex === this._model.selectedPatternIndex) {
      this._view.renderPatternEnd();
    }
    if (store) {
      this._storage.storePatternEnd(trackIndex, patternIndex, stepIndex);
    }
  }

  setPatternMute(mute, trackIndex = this._model.selectedTrackIndex, patternIndex = this._model.selectedPatternIndex, store = true) {
    this._model.tracks[trackIndex].patterns[patternIndex].mute = mute;
    if (trackIndex === this._model.selectedTrackIndex && patternIndex === this._model.selectedPatternIndex) {
      this._view.renderPatternMute();
    }
    if (store) {
      this._storage.storePatternMute(trackIndex, patternIndex, mute);
    }
  }

  _modifySelectedPatternSteps(modify) {
    const model = this._model;
    const pattern = model.selectedPattern;
    modify(pattern);
    this._view.renderGrid();
    this._storage.storePatternSteps(this._model.selectedTrackIndex, pattern.index, pattern.steps);
  }

  reverseSelectedPattern() {
    this._modifySelectedPatternSteps(
      pattern => pattern.reverse()
    );
  }

  randomizeSelectedPattern() {
    this._modifySelectedPatternSteps(
      pattern => pattern.randomize()
    );
  }

  invertSelectedPattern() {
    this._modifySelectedPatternSteps(
      pattern => pattern.invert()
    );
  }

  clearSelectedPattern() {
    this._modifySelectedPatternSteps(
      pattern => pattern.clear()
    );
  }

  shiftSelectedPatternLeft() {
    this._modifySelectedPatternSteps(
      pattern => pattern.shift(1)
    );
  }

  shiftSelectedPatternRight() {
    this._modifySelectedPatternSteps(
      pattern => pattern.shift(-1)
    );
  }

  shiftSelectedPatternUp() {
    this._modifySelectedPatternSteps(
      pattern => pattern.shift(NUMBER_OF.COLUMNS)
    );
  }

  shiftSelectedPatternDown() {
    this._modifySelectedPatternSteps(
      pattern => pattern.shift(-NUMBER_OF.COLUMNS)
    );
  }

  copyStepsFromSelectedPattern() {
    this._patternStepsClipboard = this._model.selectedPattern.steps.slice(); // slice to freeze this state
  }

  pasteStepsToSelectedPattern() {
    if (this._patternStepsClipboard) {
      this._modifySelectedPatternSteps(
        pattern => pattern.steps = this._patternStepsClipboard.slice() // slice to prevent a shared steps array between patterns
      );
    }
  }

  _recordSelectedPatternStepsForUndo() {
    this._patternStepsUndo = this._model.selectedPattern.steps.slice(); // slice to freeze this state
  }

  _undoSelectedPatternSteps() {
    if (this._patternStepsUndo) {
      this._modifySelectedPatternSteps(
        pattern => pattern.steps = this._patternStepsUndo
      );
    }
  }
}