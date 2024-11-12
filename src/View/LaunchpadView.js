import { LAUNCHPAD, LAUNCHPAD_COLOR as COLOR, MODE, NUMBER_OF, OUTLET } from "../config";
import {
  ledIndexToX,
  ledIndexToY,
  xyToLedIndex,
  stepIndexToX,
  stepIndexToY,
  xyToStepIndex,
  stepToLedIndex,
} from "../converters";

const SYSEX_PREAMBLE = Object.freeze([240, 0, 32, 41, 2, 12, 3]);
const SYSEX_END = 247;
const SYSEX_MODE_RGB = 3;

export default class LaunchpadView {
  constructor(model) {
    this._model = model;
  }

  clear() {
    outlet(OUTLET.LAUNCHPAD_CC, 0, 0);
  }

  renderTrackButton(trackIndex) {
    this.#setTopButtonColor(trackIndex, this.#colorForTrackButton(trackIndex));
  }

  renderValueButton(value) {
    if (value > 0) {
      this.#setTopButtonColor(value + 3, this.#colorForValueButton(value));
    }
  }

  renderPatternButton(patternIndex) {
    this.#setRightButtonColor(patternIndex, this.#colorForPatternButton(patternIndex));
  }

  renderStepButton(stepIndex) {
    console.log("renderStepButton():", stepIndex);
    this.#renderStep(stepIndex);
  }

  render() {
    const model = this._model;
    // Color order: grid from left-to-right/top-to-bottom, right column (patterns) top-to-bottom, top row left-to-right
    // let colors = [
    //   ...this.#colorsForGridButtons(),
    //   ...model.selectedTrack.patterns.map((_, patternIndex) => this.#colorForPatternButton(patternIndex)),
    // ];
    // if (model.mode === MODE.PATTERN_EDIT) {
    //   colors.push(
    //     COLOR.YELLOW,
    //     COLOR.YELLOW,
    //     COLOR.YELLOW,
    //     COLOR.YELLOW,
    //     // Next 2 are for reverse and invert
    //     COLOR.YELLOW,
    //     COLOR.YELLOW,
    //     // Last 2 are copy & paste
    //     COLOR.GREEN,
    //     COLOR.RED
    //   );
    // } else {
    //   model.tracks.forEach((_, trackIndex) => {
    //     colors.push(this.#colorForTrackButton(trackIndex));
    //   });
    //   for (let value = 1; value < 5; value++) {
    //     colors.push(this.#colorForValueButton(value));
    //   }
    // }
    // if (colors.length !== 80) {
    //   console.error(
    //     `Error in LaunchpadView.render(): Expected colors.length to be 80, but was ${colors.length}.`,
    //     colors
    //   );
    //   return;
    // }
    // outlet(OUTLET.LAUNCHPAD_RAPID_UPDATE, colors);

    outlet(OUTLET.LAUNCHPAD_RAPID_UPDATE, SYSEX_PREAMBLE);
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        this.#setCellColor(x, y);
      }
    }
    outlet(OUTLET.LAUNCHPAD_RAPID_UPDATE, SYSEX_END);
  }

  //--------------------------------------------------------
  // Private methods

  // TODO: Decide how to represent color. Maybe as hexadecimal numbers?
  // then we can do things like
  // (0xaabbcc >> 8 & 0xff).toString(16)
  // where 8 could be 0 or 16

  #setTopButtonColor(index, color) {
    if (0 <= index && index <= 7) {
      outlet(OUTLET.LAUNCHPAD_CC, LAUNCHPAD.TOP_ROW_CC + index, color);
    }
  }

  #setRightButtonColor(index, color) {
    if (0 <= index && index <= 7) {
      outlet(OUTLET.LAUNCHPAD_NOTE, 16 * index + 8, color);
    }
  }

  // #setGridColor(stepIndex, color) {
  //   const x = stepIndex % NUMBER_OF.COLUMNS;
  //   const y = Math.floor(stepIndex / NUMBER_OF.COLUMNS);
  //   if (0 <= x && x <= 7 && 0 <= y && y <= 7) {
  //     outlet(OUTLET.LAUNCHPAD_NOTE, 16 * y + x, color);
  //   }
  // }

  #colorForTrackButton(trackIndex) {
    const model = this._model;
    const mute = model.tracks[trackIndex].mute;
    const selected = trackIndex === model.selectedTrackIndex;
    if (mute) {
      return selected ? COLOR.MUTE_COLOR : COLOR.INACTIVE_MUTE_COLOR;
    } else {
      return selected ? COLOR.TRACK_COLOR : COLOR.OFF;
    }
  }

  #colorForValueButton(value) {
    return this._model.selectedValue === value ? COLOR.STEP_VALUES[value] : COLOR.OFF;
  }

  #colorForPatternButton(patternIndex) {
    const model = this._model;
    const mute = model.selectedTrack.patterns[patternIndex].mute;
    const selected = patternIndex === model.selectedPatternIndex;
    if (mute) {
      return selected ? COLOR.MUTE_COLOR : COLOR.INACTIVE_MUTE_COLOR;
    } else {
      return selected ? COLOR.PATTERN_COLOR : COLOR.OFF;
    }
  }

  // TODO: this is duplciated in GuiView. Can we refactor?
  get #stepIndexForClock() {
    const { clockIndex, selectedTrack, selectedPatternIndex } = this._model;
    return clockIndex < 0 ? -1 : selectedTrack.patternStepIndexForClock(clockIndex, selectedPatternIndex);
  }

  #colorForGridButton(stepIndex, sequencerStepIndex = this.#stepIndexForClock) {
    const model = this._model;
    const { selectedPattern } = model;
    const value = selectedPattern.steps[stepIndex];
    const { startStepIndex, endStepIndex } = selectedPattern;
    switch (model.mode) {
      case MODE.SEQUENCER:
        if (stepIndex === sequencerStepIndex) {
          return COLOR.SEQUENCER_STEP;
        }
        return startStepIndex <= stepIndex && stepIndex <= endStepIndex
          ? COLOR.STEP_VALUES[value]
          : COLOR.INACTIVE_STEPS[value];

      case MODE.PATTERN_EDIT:
        if (startStepIndex <= stepIndex && stepIndex <= endStepIndex) {
          return COLOR.STEP_VALUES[value];
        }
        return COLOR.OFF;

      default:
        console.log(`ERROR in #colorForGridButton(). Unexpected mode "${model.mode}"`);
    }
  }

  #colorsForGridButtons() {
    const sequencerStepIndex = this.#stepIndexForClock;
    return this._model.selectedPattern.steps.map((_, stepIndex) =>
      this.#colorForGridButton(stepIndex, sequencerStepIndex)
    );
  }

  #renderGrid(x, y) {
    outlet(OUTLET.LAUNCHPAD_RAPID_UPDATE, SYSEX_PREAMBLE);
    this.#setCellColor(x, y);
    outlet(OUTLET.LAUNCHPAD_RAPID_UPDATE, SYSEX_END);
  }

  #renderStep(stepIndex) {
    outlet(OUTLET.LAUNCHPAD_RAPID_UPDATE, SYSEX_PREAMBLE);
    this.#setStepColor(stepIndex);
    outlet(OUTLET.LAUNCHPAD_RAPID_UPDATE, SYSEX_END);
  }

  #setCellColor(x, y, color) {
    if (x >= 0 && x < NUMBER_OF.COLUMNS && y >= 0 && y < NUMBER_OF.ROWS) {
      this.#setStepColor(xyToStepIndex(x, y), color);
    }
  }

  #setStepColor(stepIndex, color) {
    color ??= this._model.selectedPattern.steps[stepIndex] ?? 0;
    this.#setGridColor(stepIndexToX(stepIndex), stepIndexToY(stepIndex), color);
  }

  #setGridColor(x, y, color) {
    color = COLOR.STEP_VALUES[color];
    const r = (color >> 16) & 0xff;
    const g = (color >> 8) & 0xff;
    const b = color & 0xff;
    // color rgb is 0-255 range (inclusive), launchpad wants 0-127 range
    console.log("setGridColor", { x, y, color, r, g, b });

    outlet(
      OUTLET.LAUNCHPAD_RAPID_UPDATE,
      SYSEX_MODE_RGB,
      xyToLedIndex(x, y),
      Math.floor(r / 2),
      Math.floor(g / 2),
      Math.floor(b / 2)
    );
  }
}
