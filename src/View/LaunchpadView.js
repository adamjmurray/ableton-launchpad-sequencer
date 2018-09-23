import { LAUNCHPAD_COLOR as COLOR, DEFAULT, NUMBER_OF, OUTLET } from '../config';

const colorForTrackButton = (trackIndex, model, track = model.tracks[trackIndex]) => {
  const muted = track.muted;
  const selected = trackIndex === model.selectedTrackIndex;
  if (muted) {
    return selected ? COLOR.MUTE_COLOR : COLOR.INACTIVE_MUTE_COLOR;
  } else {
    return selected ? COLOR.TRACK_COLOR : COLOR.OFF
  }
}

const colorForPatternButton = (patternIndex, model, pattern = model.patterns[patternIndex]) => {
  const muted = pattern.muted;
  const selected = patternIndex === model.selectedPatternIndex;
  if (muted) {
    return selected ? COLOR.MUTE_COLOR : COLOR.INACTIVE_MUTE_COLOR;
  } else {
    return selected ? COLOR.PATTERN_COLOR : COLOR.OFF
  }
}

export default class LaunchpadView {

  constructor() {
    this._selectedTrackIndex = 0;
    this._selectedPatternIndex = 0;
    this._selectedValue = DEFAULT.STEP_VALUE;
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
      model.tracks.forEach((track, index) => {
        colors.push(colorForTrackButton(index, model, track));
      })
      // for (let i = 0; i < NUMBER_OF.TRACKS; i++) {
      //   model.tracks[i];
      //   if (trackMutes[i]) {
      //     colors.push(i === trackIndex ? COLOR.MUTE_COLOR : COLOR.INACTIVE_MUTE_COLOR);
      //   }
      //   else {
      //     colors.push(i === trackIndex ? COLOR.TRACK_COLOR : COLOR.OFF);
      //   }
      // }
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

  setTopButtonColor(index, color) {
    if (0 <= index && index <= 7) {
      this.ctlout(104 + index, color);
    }
  }

  _grid(x, y, color) {
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

