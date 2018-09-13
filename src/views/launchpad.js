import { LAUNCHPAD_CC, LAUNCHPAD_NOTE, LAUNCHPAD_RAPID_UPDATE, TRACKS, PATTERNS } from '../config';
import Defer from '../defer';

export default class Launchpad {

  static get OFF() { return this.color(0, 0); }
  static get GREEN() { return this.color(3, 0); }
  static get YELLOW() { return this.color(3, 2); }
  static get ORANGE() { return this.color(2, 3); }
  static get RED() { return this.color(0, 3); }
  static get GRID_COLORS() { return [this.OFF, this.GREEN, this.YELLOW, this.ORANGE, this.RED]; }

  static get STEP_COLOR() { return this.color(1, 1); } // color for current sequencer step, regardless of value

  static get INACTIVE_GREEN() { return this.color(2, 0); }
  static get INACTIVE_YELLOW() { return this.color(2, 1); }
  static get INACTIVE_ORANGE() { return this.color(1, 2); }
  static get INACTIVE_RED() { return this.color(0, 2); }
  static get INACTIVE_GRID_COLORS() { return [this.OFF, this.INACTIVE_GREEN, this.INACTIVE_YELLOW, this.INACTIVE_ORANGE, this.INACTIVE_RED]; }
  static get ACTIVE_GRID_COLORS() { return [this.STEP_COLOR, this.GREEN, this.YELLOW, this.ORANGE, this.RED]; }

  static get TRACK_COLOR() { return this.color(1, 2); }
  static get PATTERN_COLOR() { return this.color(2, 0); }

  static get MUTE_COLOR() { return this.color(0, 3); }
  static get INACTIVE_MUTE_COLOR() { return this.color(0, 1); }

  static color(green, red) {
    if ((0 <= green && green <= 3) && (0 <= red && red <= 3)) { return (16 * green) + red + 12; }
  }

  constructor() {
    this.patternOpsMode = false;
  }

  ctlout(cc, value) {
    outlet(LAUNCHPAD_CC, cc, value);
  }

  noteout(pitch, velocity) {
    outlet(LAUNCHPAD_NOTE, pitch, velocity);
  }

  allOff() {
    this.ctlout(0, 0);
  }

  track(track) {
    const color = track.mute ? Launchpad.MUTE_COLOR : Launchpad.TRACK_COLOR;
    this._top(track.index, color);
  }

  trackOff(track) {
    const color = track.mute ? Launchpad.INACTIVE_MUTE_COLOR : Launchpad.OFF;
    this._top(track.index, color);
  }

  stepValue(stepValue) {
    if (stepValue > 0) {
      this._top(stepValue + 3, Launchpad.GRID_COLORS[stepValue]);
    }
  }

  stepValueOff(stepValue) {
    if (stepValue > 0) {
      this._top(stepValue + 3, Launchpad.OFF);
    }
  }

  pattern(pattern) {
    const color = pattern.mute ? Launchpad.MUTE_COLOR : Launchpad.PATTERN_COLOR;
    this._right(pattern.index, color);
  }

  patternOff(pattern) {
    const color = pattern.mute ? Launchpad.INACTIVE_MUTE_COLOR : Launchpad.OFF;
    this._right(pattern.index, color);
  }

  grid(x, y, value) {
    this._grid(x, y, Launchpad.GRID_COLORS[value]);
  }

  activeStep(x, y) {
    this._grid(x, y, Launchpad.STEP_COLOR);
  }

  patternSteps(pattern, additionalDeferredCallback) {
    if (this.patternOpsMode) {   // Use the grid to show the pattern length by lighting up all the steps from the start to the end step
      const { start, end } = pattern;
      Defer.eachStep((x, y, index) => {
        const stepValue = pattern.getStep(index);
        const color = start <= index && index <= end
          ? Launchpad.ACTIVE_GRID_COLORS[stepValue]
          : Launchpad.INACTIVE_GRID_COLORS[stepValue];
        this._grid(x, y, color);
        if (additionalDeferredCallback != null) {
          additionalDeferredCallback(x, y, stepValue);
        }
      });
    } else {
      Defer.eachStep((x, y, index) => {
        const stepValue = pattern.getStep(index);
        this._grid(x, y, Launchpad.GRID_COLORS[stepValue]);
        if (additionalDeferredCallback != null) {
          additionalDeferredCallback(x, y, stepValue);
        }
      });
    }
  }

  render(state) {
    const { sequence, stepValue, trackIndex, trackMutes, patternIndex, patternMutes, isPatternOpsMode, startStepIndex, endStepIndex } = state;
    let colors;
    // Color order: grid from left-to-right/top-to-bottom, right colomn (patterns) top-to-bottom, top row left-to-right
    if (isPatternOpsMode) {
      colors = sequence.map((stepValue, index) =>
        index >= startStepIndex && index <= endStepIndex
          ? Launchpad.ACTIVE_GRID_COLORS[stepValue]
          : Launchpad.INACTIVE_GRID_COLORS[stepValue]);

      for (let i = 0; i < PATTERNS; i++) {
        colors.push(i === patternIndex ? Launchpad.PATTERN_COLOR : Launchpad.OFF);
      }
      colors.push(
        Launchpad.YELLOW,
        Launchpad.YELLOW,
        Launchpad.YELLOW,
        Launchpad.YELLOW,
        // Next 2 are for reverse and invert
        Launchpad.YELLOW,
        Launchpad.YELLOW,
        // Last 2 are copy & paste
        Launchpad.GREEN,
        Launchpad.RED,
      );
    } else {
      colors = sequence.map(stepValue => Launchpad.GRID_COLORS[stepValue]);

      for (let i = 0; i < PATTERNS; i++) {
        if (patternMutes[i]) {
          colors.push(i === patternIndex ? Launchpad.MUTE_COLOR : Launchpad.INACTIVE_MUTE_COLOR);
        }
        else {
          colors.push(i === patternIndex ? Launchpad.PATTERN_COLOR : Launchpad.OFF);
        }
      }
      for (let i = 0; i < TRACKS; i++) {
        if (trackMutes[i]) {
          colors.push(i === trackIndex ? Launchpad.MUTE_COLOR : Launchpad.INACTIVE_MUTE_COLOR);
        }
        else {
          colors.push(i === trackIndex ? Launchpad.TRACK_COLOR : Launchpad.OFF);
        }
      }
      for (let i = 0; i < 4; i++) {
        colors.push(i + 1 === stepValue ? Launchpad.GRID_COLORS[stepValue] : Launchpad.OFF);
      }
    }
    if (colors.length !== 80) {
      console.log("expected colors.length to be 80, got", colors.length);
      console.log(colors);
      return;
    }
    outlet(LAUNCHPAD_RAPID_UPDATE, colors);
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

