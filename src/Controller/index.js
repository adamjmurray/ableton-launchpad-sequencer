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
  GATE_MODE,
  MULTIPLIER,
  GATE_SUMMING_MODE,
  MAX_AFTERTOUCH,
  MAX_MODULATION,
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
          case GATE_MODE: return this.setTrackGateMode(data[3], trackIndex, false);
          case MULTIPLIER: return this.setTrackMultiplier(data[3], trackIndex, false);
          case GATE_SUMMING_MODE: return this.setTrackGateSummingMode(data[3], trackIndex, false);
          case MAX_AFTERTOUCH: return this.setTrackMaxAftertouch(data[3], trackIndex, false);
          case MAX_MODULATION: return this.setTrackMaxAftertouch(data[3], trackIndex, false);
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

  handleTransportStop() {
    this.handleClockTick(-1);
    // Make modulation and aftertouch values output on the first step when the transport starts again:
    this._prevAftertouch = null;
    this._prevModulation = null;
    // this._view.render(); // was this actually necessary?
  }


  handleTrackNote(pitch, velocity) {
    // TODO
  }

  handleTrackCC(cc) {
    if (cc === MIDI.TRANSPORT_STOP) {
      this.handleTransportStop();
    }
  }

  handleLaunchpadCC(cc, value) {
    if (cc === MIDI.TRANSPORT_STOP) {
      this.handleTransportStop();
    } else {
      this._handleLaunchpadTopButton(cc - LAUNCHPAD.TOP_ROW_CC, value > 0);
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
            this.shiftPatternUp();
            break;
          case 1:
            this.shiftPatternDown();
            break;
          case 2:
            this.shiftPatternLeft();
            break;
          case 3:
            this.shiftPatternRight();
            break;
          case 4:
            this.reversePattern();
            break;
          case 5:
            if (gesture === GESTURE.DOUBLE_PRESS) {
              this._undoPatternStepsChange();
            } else {
              this._recordPatternStepsForUndo();
              this.randomizePattern();
            }
            break;
          case 6:
            if (gesture === GESTURE.SELECT) {
              this.copyPatternSteps();
            } else if (gesture === GESTURE.DOUBLE_PRESS) {
              this._recordPatternStepsForUndo();
              this.clearPattern();
            } else {
              this._undoPatternStepsChange();
            }
            break;
          case 7:
            if (gesture === GESTURE.DOUBLE_PRESS) {
              this._undoPatternStepsChange();
            } else {
              this._recordPatternStepsForUndo();
              this.pastePatternSteps();
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
              this._topButtonGesture.reset();
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
            this._rightButtonGesture.reset();
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

  handleClockTick(clockIndex) {
    if (clockIndex !== this._model.clockIndex) {
      this._model.clockIndex = clockIndex;
      this._view.renderClock();
    }
    if (clockIndex >= 0) {
      let aftertouch = 0;
      let modulation = 0;
      this._model.tracks.forEach((track) => {
        const note = track.noteForClock(clockIndex);
        if (note.enabled) {
          if (note.duration > 0) {
            outlet(OUTLET.NOTE, note.pitch, note.velocity, note.duration);
          }
        }
        aftertouch += note.aftertouch;
        modulation += note.modulation;
      });
      if (aftertouch !== this._prevAftertouch) {
        outlet(OUTLET.AFTERTOUCH, Math.min(Math.round(aftertouch), 127));
        this._prevAftertouch = aftertouch;
      }
      if (modulation !== this._prevModulation) {
        outlet(OUTLET.CC, 1, Math.min(Math.round(modulation), 127));
        this._prevModulation = modulation;
      }
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

  setTrackGateMode(mode, trackIndex = this._model.selectedTrackIndex, store = true) {
    this._model.tracks[trackIndex].gateMode = mode;
    if (trackIndex === this._model.selectedTrackIndex) {
      this._view.renderTrackGateMode(mode);
    }
    if (store) {
      this._storage.storeTrackGateMode(trackIndex, mode);
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

  setTrackGateSummingMode(mode, trackIndex = this._model.selectedTrackIndex, store = true) {
    this._model.tracks[trackIndex].gateSummingMode = mode;
    if (trackIndex === this._model.selectedTrackIndex) {
      this._view.renderTrackGateSummingMode(mode);
    }
    if (store) {
      this._storage.storeTrackGateSummingMode(trackIndex, mode);
    }
  }

  setTrackMaxAftertouch(max, trackIndex = this._model.selectedTrackIndex, store = true) {
    this._model.tracks[trackIndex].maxAftertouch = max;
    if (trackIndex === this._model.selectedTrackIndex) {
      this._view.renderTrackMaxAftertouch(max);
    }
    if (store) {
      this._storage.storeTrackMaxAftertouch(trackIndex, max);
    }
  }

  setTrackMaxModulation(max, trackIndex = this._model.selectedTrackIndex, store = true) {
    this._model.tracks[trackIndex].maxModulation = max;
    if (trackIndex === this._model.selectedTrackIndex) {
      this._view.renderTrackMaxModulation(max);
    }
    if (store) {
      this._storage.storeTrackMaxModulation(trackIndex, max);
    }
  }

  setTrackMute(mute, trackIndex = this._model.selectedTrackIndex, store = true) {
    this._model.tracks[trackIndex].mute = mute;
    this._view.renderTrackMute(trackIndex, mute);
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
    if (trackIndex === this._model.selectedTrackIndex) {
      this._view.renderPatternMute(patternIndex, mute);
    }
    if (store) {
      this._storage.storePatternMute(trackIndex, patternIndex, mute);
    }
  }

  _modifyPatternSteps(pattern, modify) {
    modify(pattern);
    this._view.renderGrid();
    this._storage.storePatternSteps(pattern.trackIndex, pattern.index, pattern.steps);
  }

  reversePattern(pattern = this._model.selectedPattern) {
    this._modifyPatternSteps(pattern,
      pattern => pattern.reverse()
    );
  }

  randomizePattern(pattern = this._model.selectedPattern) {
    this._modifyPatternSteps(pattern,
      pattern => pattern.randomize()
    );
  }

  invertPattern(pattern = this._model.selectedPattern) {
    this._modifyPatternSteps(pattern,
      pattern => pattern.invert()
    );
  }

  clearPattern(pattern = this._model.selectedPattern) {
    this._modifyPatternSteps(pattern,
      pattern => pattern.clear()
    );
  }

  shiftPatternLeft(pattern = this._model.selectedPattern) {
    this._modifyPatternSteps(pattern,
      pattern => pattern.shift(1)
    );
  }

  shiftPatternRight(pattern = this._model.selectedPattern) {
    this._modifyPatternSteps(pattern,
      pattern => pattern.shift(-1)
    );
  }

  shiftPatternUp(pattern = this._model.selectedPattern) {
    this._modifyPatternSteps(pattern,
      pattern => pattern.shift(NUMBER_OF.COLUMNS)
    );
  }

  shiftPatternDown(pattern = this._model.selectedPattern) {
    this._modifyPatternSteps(pattern,
      pattern => pattern.shift(-NUMBER_OF.COLUMNS)
    );
  }

  copyPatternSteps(pattern = this._model.selectedPattern) {
    this._patternStepsClipboard = pattern.steps.slice(); // slice to freeze this state
  }

  pastePatternSteps(pattern = this._model.selectedPattern) {
    if (this._patternStepsClipboard) {
      this._modifyPatternSteps(pattern,
        pattern => pattern.steps = this._patternStepsClipboard.slice() // slice to prevent a shared steps array between patterns
      );
    }
  }

  _recordPatternStepsForUndo(pattern = this._model.selectedPattern) {
    this._patternStepsUndo = pattern.steps.slice(); // slice to freeze this state
  }

  _undoPatternStepsChange(pattern = this._model.selectedPattern) {
    if (this._patternStepsUndo) {
      this._modifyPatternSteps(pattern,
        pattern => pattern.steps = this._patternStepsUndo
      );
      this._patternStepsUndo = null;
    }
  }

  reverseTrack(track = this._model.selectedTrack) {
    track.patterns.forEach(pattern =>
      this.reversePattern(pattern));
  }

  randomizeTrack(track = this._model.selectedTrack) {
    track.patterns.forEach(pattern =>
      this.randomizePattern(pattern));
  }

  clearTrack(track = this._model.selectedTrack) {
    track.patterns.forEach(pattern =>
      this.clearPattern(pattern));
  }

  copyTrackSteps(track = this._model.selectedTrack) {
    this._trackStepsClipboard = track.patterns.map(pattern => pattern.steps.slice()); // slice to freeze this state
  }

  pasteTrackSteps(track = this._model.selectedTrack) {
    if (this._trackStepsClipboard) {
      this._trackStepsClipboard.forEach((patternSteps, patternIndex) =>
        this._modifyPatternSteps(track.patterns[patternIndex],
          pattern => pattern.steps = patternSteps.slice() // slice to prevent a shared steps array between patterns
        )
      );
    }
  }
}
