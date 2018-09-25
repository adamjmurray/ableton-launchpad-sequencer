import { LAUNCHPAD_COLOR as COLOR, MODE, NUMBER_OF, OUTLET } from '../config';

const colorForTrackButton = (trackIndex, model) => {
  const muted = model.tracks[trackIndex].muted;
  const selected = trackIndex === model.selectedTrackIndex;
  if (muted) {
    return selected ? COLOR.MUTE_COLOR : COLOR.INACTIVE_MUTE_COLOR;
  } else {
    return selected ? COLOR.TRACK_COLOR : COLOR.OFF
  }
};

const colorForPatternButton = (patternIndex, model) => {
  const muted = model.selectedTrack.patterns[patternIndex].muted;
  const selected = patternIndex === model.selectedPatternIndex;
  if (muted) {
    return selected ? COLOR.MUTE_COLOR : COLOR.INACTIVE_MUTE_COLOR;
  } else {
    return selected ? COLOR.PATTERN_COLOR : COLOR.OFF
  }
};

const colorForGridButton = (stepIndex, model, sequencerStepIndex = model.selectedPattern.stepIndexForClock(model.clockIndex)) => {
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

const colorsForGridButtons = (model) => {
  const selectedPattern = model.selectedPattern;
  const sequencerStepIndex = selectedPattern.stepIndexForClock(model.clockIndex);
  return model.selectedPattern.steps.map((_, stepIndex) =>
    colorForGridButton(stepIndex, model, sequencerStepIndex));
}

export default class LaunchpadView {

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

  clear() {
    outlet(OUTLET.LAUNCHPAD_CC, 0, 0);
  }

  renderTrackButton(trackIndex, model) {
    this._setTopButtonColor(trackIndex, colorForTrackButton(trackIndex, model));
  }

  renderValueButton(value, model) {
    if (value > 0) {
      this._setTopButtonColor(value + 3,
        value === model.selectedValue ? COLOR.STEP_VALUES[value] : COLOR.OFF);
    }
  }

  renderPatternButton(patternIndex, model) {
    this._setRightButtonColor(patternIndex, colorForPatternButton(patternIndex, model));
  }

  renderStepButton(stepIndex, model) {
    this._setGridColor(stepIndex, colorForGridButton(stepIndex, model));
  }

  render(model) {
    // Color order: grid from left-to-right/top-to-bottom, right column (patterns) top-to-bottom, top row left-to-right
    let colors = [
      ...colorsForGridButtons(model),
      ...(
        model.selectedTrack.patterns.map((_, patternIndex) =>
          colorForPatternButton(patternIndex, model))
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
        colors.push(colorForTrackButton(trackIndex, model));
      })
      const selectValue = model.selectedValue;
      for (let value = 1; value < 5; value++) {
        colors.push(value === selectValue ? COLOR.STEP_VALUES[value] : COLOR.OFF);
      }
    }
    if (colors.length !== 80) {
      console.error("expected colors.length to be 80, got", colors.length, colors);
      return;
    }
    outlet(OUTLET.LAUNCHPAD_RAPID_UPDATE, colors);
  }
}
