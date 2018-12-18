import { LAUNCHPAD, LAUNCHPAD_COLOR as COLOR, MODE, NUMBER_OF, OUTLET } from '../config';

export default class LaunchpadView {

  constructor(model) {
    this._model = model;
  }

  clear() {
    outlet(OUTLET.LAUNCHPAD_CC, 0, 0);
  }

  renderTrackButton(trackIndex) {
    this._setTopButtonColor(trackIndex, this._colorForTrackButton(trackIndex));
  }

  renderValueButton(value) {
    if (value > 0) {
      this._setTopButtonColor(value + 3, this._colorForValueButton(value));
    }
  }

  renderPatternButton(patternIndex) {
    this._setRightButtonColor(patternIndex, this._colorForPatternButton(patternIndex));
  }

  renderStepButton(stepIndex) {
    this._setGridColor(stepIndex, this._colorForGridButton(stepIndex));
  }

  render() {
    const model = this._model;
    // Color order: grid from left-to-right/top-to-bottom, right column (patterns) top-to-bottom, top row left-to-right
    let colors = [
      ...this._colorsForGridButtons(),
      ...(
        model.selectedTrack.patterns.map((_, patternIndex) =>
          this._colorForPatternButton(patternIndex))
      ),
    ];
    if (model.mode === MODE.PATTERN_EDIT) {
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
      model.tracks.forEach((_, trackIndex) => {
        colors.push(this._colorForTrackButton(trackIndex));
      })
      for (let value = 1; value < 5; value++) {
        colors.push(this._colorForValueButton(value));
      }
    }
    if (colors.length !== 80) {
      console.error(`Error in LaunchpadView.render(): Expected colors.length to be 80, but was ${colors.length}.`, colors);
      return;
    }
    outlet(OUTLET.LAUNCHPAD_RAPID_UPDATE, colors);
  }

  //--------------------------------------------------------
  // Private methods

  _setTopButtonColor(index, color) {
    if (0 <= index && index <= 7) {
      outlet(OUTLET.LAUNCHPAD_CC, LAUNCHPAD.TOP_ROW_CC + index, color);
    }
  }

  _setRightButtonColor(index, color) {
    if (0 <= index && index <= 7) {
      outlet(OUTLET.LAUNCHPAD_NOTE, (16 * index) + 8, color);
    }
  }

  _setGridColor(stepIndex, color) {
    const x = stepIndex % NUMBER_OF.COLUMNS;
    const y = Math.floor(stepIndex / NUMBER_OF.COLUMNS);
    if ((0 <= x && x <= 7) && (0 <= y && y <= 7)) {
      outlet(OUTLET.LAUNCHPAD_NOTE, (16 * y) + x, color);
    }
  }

  _colorForTrackButton(trackIndex) {
    const model = this._model;
    const mute = model.tracks[trackIndex].mute;
    const selected = trackIndex === model.selectedTrackIndex;
    if (mute) {
      return selected ? COLOR.MUTE_COLOR : COLOR.INACTIVE_MUTE_COLOR;
    } else {
      return selected ? COLOR.TRACK_COLOR : COLOR.OFF
    }
  };

  _colorForValueButton(value) {
    return this._model.selectedValue === value ? COLOR.STEP_VALUES[value] : COLOR.OFF;
  }

  _colorForPatternButton(patternIndex) {
    const model = this._model;
    const mute = model.selectedTrack.patterns[patternIndex].mute;
    const selected = patternIndex === model.selectedPatternIndex;
    if (mute) {
      return selected ? COLOR.MUTE_COLOR : COLOR.INACTIVE_MUTE_COLOR;
    } else {
      return selected ? COLOR.PATTERN_COLOR : COLOR.OFF
    }
  };

  // TODO: this is duplciated in GuiView. Can we refactor?
  get _stepIndexForClock() {
    const { clockIndex, selectedTrack, selectedPatternIndex } = this._model;
    return clockIndex < 0 ? -1 : selectedTrack.patternStepIndexForClock(clockIndex, selectedPatternIndex);
  }

  _colorForGridButton(stepIndex, sequencerStepIndex = this._stepIndexForClock) {
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
    }
  };

  _colorsForGridButtons() {
    const sequencerStepIndex = this._stepIndexForClock;
    return this._model.selectedPattern.steps.map((_, stepIndex) =>
      this._colorForGridButton(stepIndex, sequencerStepIndex));
  }
}
