import { LAUNCHPAD_COLOR as COLOR, MODE, NUMBER_OF, OUTLET } from '../config';

export default class LaunchpadView {

  constructor(model) {
    // TODO: Make model public?
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
      outlet(OUTLET.LAUNCHPAD_CC, 104 + index, color);
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
    const muted = model.tracks[trackIndex].muted;
    const selected = trackIndex === model.selectedTrackIndex;
    if (muted) {
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
    const muted = model.selectedTrack.patterns[patternIndex].muted;
    const selected = patternIndex === model.selectedPatternIndex;
    if (muted) {
      return selected ? COLOR.MUTE_COLOR : COLOR.INACTIVE_MUTE_COLOR;
    } else {
      return selected ? COLOR.PATTERN_COLOR : COLOR.OFF
    }
  };

  _colorForGridButton(
    stepIndex,
    sequencerStepIndex = this._model.selectedPattern.stepIndexForClock(this._model.clockIndex)
  ) {
    const model = this._model;
    const { selectedPattern } = model;
    const value = selectedPattern.steps[stepIndex];
    if (model.mode === MODE.SEQUENCER) {
      return stepIndex === sequencerStepIndex
        ? COLOR.SEQUENCER_STEP
        : COLOR.STEP_VALUES[value];
    } else {
      const { startStepIndex, endStepIndex } = selectedPattern;
      return startStepIndex <= stepIndex && stepIndex <= endStepIndex
        ? COLOR.ACTIVE_STEPS[value]
        : COLOR.INACTIVE_STEPS[value];
    }
  };

  _colorsForGridButtons() {
    // TODO: move this into render()?
    const model = this._model;
    const selectedPattern = model.selectedPattern;
    const sequencerStepIndex = selectedPattern.stepIndexForClock(model.clockIndex);
    return model.selectedPattern.steps.map((_, stepIndex) =>
      this._colorForGridButton(stepIndex, sequencerStepIndex));
  }
}
