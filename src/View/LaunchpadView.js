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
  if (stepIndex === sequencerStepIndex) {
    return COLOR.SEQUENCER_STEP;
  }
  const { selectedPattern } = model;
  const { startStepIndex, endStepIndex } = selectedPattern;
  const value = selectedPattern.steps[stepIndex];
  return startStepIndex <= stepIndex && stepIndex <= endStepIndex
    ? COLOR.ACTIVE_STEPS[value]
    : COLOR.INACTIVE_STEPS[value];
};

const colorsForGridButtons = (model) => {
  const selectedPattern = model.selectedPattern;
  const sequencerStepIndex = selectedPattern.stepIndexForClock(model.clockIndex);
  return model.selectedPattern.steps.map((_, stepIndex) =>
    colorForGridButton(stepIndex, model, sequencerStepIndex));
}

export default class LaunchpadView {

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
    this.setTopButtonColor(track.index, color);
  }

  trackOff(track) {
    const color = track.mute ? COLOR.INACTIVE_MUTE_COLOR : COLOR.OFF;
    this.setTopButtonColor(track.index, color);
  }

  renderTrackButton(trackIndex, model) {
    this.setTopButtonColor(trackIndex, colorForTrackButton(trackIndex, model));
  }

  renderValueButton(value, model) {
    this.setTopButtonColor(value + 3,
      value === model.selectedValue ? COLOR.STEP_VALUES[value] : COLOR.OFF);
  }

  renderPatternButton(patternIndex, model) {
    this.setRightButtonColor(patternIndex, colorForPatternButton(patternIndex, model));
  }

  renderStep(stepIndex, model) {
    this.setGridColor(stepIndex, colorForGridButton(stepIndex, model));
  }

  stepValue(stepValue) {
    if (stepValue > 0) {
      this.setTopButtonColor(stepValue + 3, COLOR.STEP_VALUES[stepValue]);
    }
  }

  stepValueOff(stepValue) {
    if (stepValue > 0) {
      this.setTopButtonColor(stepValue + 3, COLOR.OFF);
    }
  }

  pattern(pattern) {
    const color = pattern.mute ? COLOR.MUTE_COLOR : COLOR.PATTERN_COLOR;
    this.setRightButtonColor(pattern.index, color);
  }

  patternOff(pattern) {
    const color = pattern.mute ? COLOR.INACTIVE_MUTE_COLOR : COLOR.OFF;
    this.setRightButtonColor(pattern.index, color);
  }

  grid(x, y, value) {
    this._grid(x, y, COLOR.STEP_VALUES[value]);
  }

  activeStep(x, y) {
    this._grid(x, y, COLOR.SEQUENCER_STEP);
  }

  // patternSteps(pattern, additionalDeferredCallback) {
  //   if (this.patternOpsMode) {   // Use the grid to show the pattern length by lighting up all the steps from the start to the end step
  //     const { start, end } = pattern;
  //     Defer.eachStep((x, y, index) => {
  //       const stepValue = pattern.getStep(index);
  //       const color = start <= index && index <= end
  //         ? COLOR.ACTIVE_STEPS[stepValue]
  //         : COLOR.INACTIVE_STEPS[stepValue];
  //       this._grid(x, y, color);
  //       if (additionalDeferredCallback != null) {
  //         additionalDeferredCallback(x, y, stepValue);
  //       }
  //     });
  //   } else {
  //     Defer.eachStep((x, y, index) => {
  //       const stepValue = pattern.getStep(index);
  //       this._grid(x, y, COLOR.STEP_VALUES[stepValue]);
  //       if (additionalDeferredCallback != null) {
  //         additionalDeferredCallback(x, y, stepValue);
  //       }
  //     });
  //   }
  // }

  render(model) {
    // Color order: grid from left-to-right/top-to-bottom, right colomn (patterns) top-to-bottom, top row left-to-right
    let colors =
      colorsForGridButtons(model)
        .concat(
          model.selectedTrack.patterns.map((_, patternIndex) => colorForPatternButton(patternIndex, model))
        );
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
      console.log("expected colors.length to be 80, got", colors.length);
      console.log(colors);
      return;
    }
    outlet(OUTLET.LAUNCHPAD_RAPID_UPDATE, colors);
  }

  // ==============================================================================
  // private

  setTopButtonColor(index, color) {
    if (0 <= index && index <= 7) {
      this.ctlout(104 + index, color);
    }
  }

  setGridColor(stepIndex, color) {
    const x = stepIndex % NUMBER_OF.COLUMNS;
    const y = Math.floor(stepIndex / NUMBER_OF.COLUMNS);
    if ((0 <= x && x <= 7) && (0 <= y && y <= 7)) {
      this.noteout((16 * y) + x, color);
    }
  }

  setRightButtonColor(index, color) {
    if (0 <= index && index <= 7) {
      this.noteout((16 * index) + 8, color);
    }
  }
}

