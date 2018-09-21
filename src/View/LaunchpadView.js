import { COLOR as ALL_COLORS, NUMBER_OF, OUTLET } from '../Config';
import Defer from '../defer';

const COLOR = ALL_COLORS.LAUNCHPAD;

export default class LaunchpadView {
  constructor() {
    this.patternOpsMode = false;
  }

  ctlout(cc, value) {
    outlet(OUTLET.LAUNCHPAD_CC, cc, value);
  }

  noteout(pitch, velocity) {
    outlet(OUTLET.LAUNCHPAD_NOTE, pitch, velocity);
  }

  allOff() {
    this.ctlout(0, 0);
  }

  track(track) {
    const color = track.mute ? COLOR.MUTE_COLOR : COLOR.TRACK_COLOR;
    this._top(track.index, color);
  }

  trackOff(track) {
    const color = track.mute ? COLOR.INACTIVE_MUTE_COLOR : COLOR.OFF;
    this._top(track.index, color);
  }

  stepValue(stepValue) {
    if (stepValue > 0) {
      this._top(stepValue + 3, COLOR.STEP_VALUES[stepValue]);
    }
  }

  stepValueOff(stepValue) {
    if (stepValue > 0) {
      this._top(stepValue + 3, COLOR.OFF);
    }
  }

  pattern(pattern) {
    const color = pattern.mute ? COLOR.MUTE_COLOR : COLOR.PATTERN_COLOR;
    this._right(pattern.index, color);
  }

  patternOff(pattern) {
    const color = pattern.mute ? COLOR.INACTIVE_MUTE_COLOR : COLOR.OFF;
    this._right(pattern.index, color);
  }

  grid(x, y, value) {
    this._grid(x, y, COLOR.STEP_VALUES[value]);
  }

  activeStep(x, y) {
    this._grid(x, y, COLOR.SEQUENCER_STEP);
  }

  patternSteps(pattern, additionalDeferredCallback) {
    if (this.patternOpsMode) {   // Use the grid to show the pattern length by lighting up all the steps from the start to the end step
      const { start, end } = pattern;
      Defer.eachStep((x, y, index) => {
        const stepValue = pattern.getStep(index);
        const color = start <= index && index <= end
          ? COLOR.ACTIVE_STEPS[stepValue]
          : COLOR.INACTIVE_STEPS[stepValue];
        this._grid(x, y, color);
        if (additionalDeferredCallback != null) {
          additionalDeferredCallback(x, y, stepValue);
        }
      });
    } else {
      Defer.eachStep((x, y, index) => {
        const stepValue = pattern.getStep(index);
        this._grid(x, y, COLOR.STEP_VALUES[stepValue]);
        if (additionalDeferredCallback != null) {
          additionalDeferredCallback(x, y, stepValue);
        }
      });
    }
  }

  render(state) {
    // TODO: update to work with the Device model
    const { sequence, stepValue, trackIndex, trackMutes, patternIndex, patternMutes, isPatternOpsMode, startStepIndex, endStepIndex } = state;
    let colors;
    // Color order: grid from left-to-right/top-to-bottom, right colomn (patterns) top-to-bottom, top row left-to-right
    if (isPatternOpsMode) {
      colors = sequence.map((stepValue, index) =>
        index >= startStepIndex && index <= endStepIndex
          ? COLOR.ACTIVE_STEPS[stepValue]
          : COLOR.INACTIVE_STEPS[stepValue]);

      for (let i = 0; i < NUMBER_OF.PATTERNS; i++) {
        colors.push(i === patternIndex ? COLOR.PATTERN_COLOR : COLOR.OFF);
      }
      colors.push(
        COLOR.YELLOW,
        COLOR.YELLOW,
        COLOR.YELLOW,
        COLOR.YELLOW,
        // Next 2 are for reverse and invert
        COLOR.YELLOW,
        COLOR.YELLOW,
        // Last 2 are copy & paste
        COLOR.GREEN,
        COLOR.RED,
      );
    } else {
      colors = sequence.map(stepValue => COLOR.STEP_VALUES[stepValue]);

      for (let i = 0; i < NUMBER_OF.PATTERNS; i++) {
        if (patternMutes[i]) {
          colors.push(i === patternIndex ? COLOR.MUTE_COLOR : COLOR.INACTIVE_MUTE_COLOR);
        }
        else {
          colors.push(i === patternIndex ? COLOR.PATTERN_COLOR : COLOR.OFF);
        }
      }
      for (let i = 0; i < NUMBER_OF.TRACKS; i++) {
        if (trackMutes[i]) {
          colors.push(i === trackIndex ? COLOR.MUTE_COLOR : COLOR.INACTIVE_MUTE_COLOR);
        }
        else {
          colors.push(i === trackIndex ? COLOR.TRACK_COLOR : COLOR.OFF);
        }
      }
      for (let i = 0; i < 4; i++) {
        colors.push(i + 1 === stepValue ? COLOR.STEP_VALUES[stepValue] : COLOR.OFF);
      }
    }
    if (colors.length !== 80) {
      console.log("expected colors.length to be 80, got", colors.length);
      console.log(colors);
      return;
    }
    outlet(OUTLET.LAUNCHPAD_RAPID_UPDATE, colors);
  }

  // ==============================================================================
  // private

  _top(index, color) {
    if (0 <= index && index <= 7) {
      this.ctlout(104 + index, color);
    }
  }

  _grid(x, y, color) {
    if ((0 <= x && x <= 7) && (0 <= y && y <= 7)) {
      this.noteout((16 * y) + x, color);
    }
  }

  _right(index, color) {
    if (0 <= index && index <= 7) {
      this.noteout((16 * index) + 8, color);
    }
  }
}

