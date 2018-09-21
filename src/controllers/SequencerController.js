import GUI from '../View/GuiView';
import { NUMBER_OF } from '../Config';

// The controller for the sequencing application.
// Manages state and keeps the views updated.
export default class SequencerController {

  constructor(sequencer, launchpad) {
    this.sequencer = sequencer;
    this.launchpad = launchpad;
    this.gui = new GUI;
    this.reset(true);
  }

  setStepLength(stepLength) {
    this.sequencer.stepLength = stepLength;
  }

  // Clear all patterns and set all track and pattern properties to their default values.
  reset(firstTime) {
    if (!firstTime) {
      this.sequencer.reset(true);
    }
    this.track = 0;   // selected track index
    this.pattern = 0; // selected pattern index
    this.value = 1;   // selected step value
    this.clock = -1;  // current transport time, in steps
    this._updateSelectedPattern(true);
    if (!firstTime) {
      this.redraw();
    }
  }

  // Update the Launchpad and Max GUI lights to reflect the current sequencer state
  redraw() {
    const { /*state,*/ launchpad, gui } = this;

    launchpad.allOff(); // TODO: don't need this if using rapid update
    gui.clearGrid();

    // Rapid update POC (comment out the below to try it)
    // state.patternIndex = this.pattern;
    // state.trackIndex = this.track;
    // state.stepValue = this.value;
    // state.sequence = this.selectedPattern.sequence;
    // launchpad.render(state);

    this.selectValue(this.value, true);
    this.selectTrack(this.track, true);
    this.selectPattern(this.pattern);
    this.gui.scale(this.sequencer.scale);
    this.gui.stepLength(this.sequencer.stepLength);
  }

  // Quickly draw the Launchpad lights assuming all lights are currently off
  drawLaunchpad() {
    const { launchpad } = this;
    launchpad.track(this.selectedTrack);
    launchpad.stepValue(this.value);
    launchpad.pattern(this.selectedPattern);
    const pattern = this.selectedPattern;
    launchpad.patternSteps(pattern);
  }

  drawGrid(pattern) {
    if (pattern == null) {
      pattern = this.selectedPattern;
    }
    const { launchpad, gui } = this;
    launchpad.patternSteps(pattern, (x, y, stepValue) => gui.grid(x, y, stepValue));
  }

  drawPatternInfo() {
    this.gui.patternInfo(this.pattern, this.selectedPattern);
  }

  setGridValue(x, y) {
    const step = x + (y * 8);
    const pattern = this.selectedPattern;
    let { value } = this;
    if (value === pattern.getStep(step)) { // toggle off
      value = 0;
    }
    pattern.setStep(step, value);
    this.launchpad.grid(x, y, value);
    this.gui.grid(x, y, value);
  }

  selectTrack(index, skipRedraw) {
    if (0 > index || index > 3) return;
    const { launchpad, gui } = this;

    // turn off old selectedTrack button on the Launchpad
    launchpad.trackOff(this.selectedTrack);

    // switch to the new selectedTrack
    this.track = index;
    this._updateSelectedPattern(skipRedraw);

    // update the GUI
    gui.track(index);
    gui.trackMute(this.selectedTrack);
    gui.trackMultiplier(this.selectedTrack);
    gui.patternMute(this.selectedPattern);

    // update the Launchpad
    launchpad.track(this.selectedTrack);
    this.selectedTrack.patterns.forEach(pattern => {
      if (pattern === this.selectedPattern) {
        launchpad.pattern(pattern);
      } else {
        launchpad.patternOff(pattern);
      }
    });
  }

  selectValue(value, preventToggle) {
    if (0 > value || value > 4) return;
    this.launchpad.stepValueOff(this.value);
    if (this.value === value && !preventToggle) {
      value = 0;
    }
    this.value = value;
    this.launchpad.stepValue(value);
    this.gui.stepValue(value);
  }

  selectPattern(index, skipRedraw) {
    if (0 > index || index > 7) return;
    this.launchpad.patternOff(this.selectedPattern);
    this.pattern = index;
    this._updateSelectedPattern(skipRedraw);
    this.launchpad.pattern(this.selectedPattern);
    this.gui.pattern(index);
    this.gui.patternMute(this.selectedPattern);
  }

  setScale(pitchClasses) {
    if (pitchClasses[0] === -1) {  // special case message for empty scale
      pitchClasses = [];
    }
    this.sequencer.scale.pitchClasses = pitchClasses;
  }

  setClock(clock) {
    const oldClock = this.clock;
    if (oldClock !== clock) {
      this.clock = clock;
      this.sequencer.step(clock);
      this._drawActiveStep();
    }
  }

  stop() {
    this.setClock(-1);
    // Live sends "all notes off" to all connected MIDI devices when the transport stops,
    // which resets the Launchpad, so we need to re-sync the state:
    this.drawLaunchpad();
  }

  // @param t the track index
  // @param p the pattern index
  // @param stepValues an array of sequence step values
  setPattern(t, p, stepValues) {
    if (0 > t || t >= NUMBER_OF.TRACKS
      || 0 > p || p >= NUMBER_OF.PATTERNS
      || stepValues.length !== 64) {
      return;
    }
    this.sequencer.tracks[t].patterns[p].sequence = stepValues;
    if (t === this.track && p === this.pattern) { // GUI only show selected pattern state
      this._drawPattern(t, p);
    }
  }

  toggleSelectedTrackMute() {
    this.muteTrack(this.track);
  }

  setSelectedTrackMute(mute) {
    this.muteTrack(this.track, mute);
  }

  muteTrack(trackIdx, mute) {
    const track = this.sequencer.tracks[trackIdx];
    if (track == null) return;
    track.mute = mute != null ? mute : !track.mute; // if no value is given, then toggle
    this.launchpad.track(track);
    if (track === this.selectedTrack) { // GUI only shows the selected track state
      this.gui.trackMute(track);
    }
  }

  toggleSelectedPatternMute() {
    this.mutePattern(this.track, this.pattern);
  }

  setSelectedPatternMute(mute) {
    this.mutePattern(this.track, this.pattern, mute);
  }

  mutePattern(trackIdx, patternIdx, mute) {
    const pattern = this.sequencer.tracks[trackIdx] != null
      ? this.sequencer.tracks[trackIdx].patterns[patternIdx]
      : undefined;
    if (pattern == null) return;
    pattern.mute = mute != null ? mute : !pattern.mute; // if no value is given, then toggle
    this.launchpad.pattern(pattern);
    if (pattern === this.selectedPattern) { // GUI only show selected pattern state
      this.gui.patternMute(pattern);
    }
  }

  // Copy the given pattern to the clipboard.
  copyPattern() {
    const pattern = this.selectedPattern.toJSON();
    pattern.sequence = pattern.sequence.slice(); // make a copy so we get a snapshot of the sequence at this moment
    this.patternClipboard = pattern;
  }

  // Update the give target pattern to match the one in the clipboard
  pastePattern() {
    const pattern = this.patternClipboard;
    if (pattern == null) return;
    this.selectedPattern.fromJSON(pattern);
    this.selectPattern(this.pattern); // this redraws everything needed
  }

  // Rotate (shift with wrap-around) the selected pattern within it's start/end range.
  rotate(amount) {
    this.selectedPattern.rotate(amount);
    this.drawGrid();
  }

  reverse() {
    this.selectedPattern.reverse();
    this.drawGrid();
  }

  invert() {
    this.selectedPattern.invert();
    this.drawGrid();
  }

  random() {
    this.selectedPattern.random();
    this.drawGrid();
  }

  randomFill(value = this.value) {
    this.selectedPattern.randomFill(value);
    this.drawGrid();
  }

  fill(value = this.value) {
    this.selectedPattern.fill(value);
    this.drawGrid();
  }

  replace(value = this.value) {
    this.selectedPattern.replace(value);
    this.drawGrid();
  }

  firstColumn(value = this.value) {
    this.selectedPattern.firstColumn(value);
    this.drawGrid();
  }

  setSelectedTrackPitch(pitch) {
    this.selectedTrack.pitch = pitch;
  }

  setSelectedTrackVelocity(velocity) {
    this.selectedTrack.velocity = velocity;
  }

  setSelectedTrackDurationScale(scale) {
    this.selectedTrack.duration = scale;
  }

  setSelectedTrackStepLengthMultiplier(multiplier) {
    this.selectedTrack.multiplier = multiplier;
  }

  setSelectedPatternStartStep(stepIndex) {
    this.selectedPattern.start = stepIndex;
    this.drawPatternInfo();
  }

  setSelectedPatternEndStep(stepIndex) {
    this.selectedPattern.end = stepIndex;
    this.drawPatternInfo();
  }

  setSelectedPatternType(type) {
    this.selectedPattern.type = type;
  }

  // ==============================================================================
  // private

  _updateSelectedPattern(skipRedraw) {
    const trackIndex = this.track;
    const patternIndex = this.pattern;
    this.selectedTrack = this.sequencer.tracks[trackIndex];
    this.selectedPattern = this.selectedTrack.patterns[patternIndex];
    if (!skipRedraw) {
      this._drawPattern(trackIndex, patternIndex);
    }
  }

  _drawPattern(trackIndex, patternIndex) {
    const track = this.sequencer.tracks[trackIndex];
    const pattern = track != null ? track.patterns[patternIndex] : undefined;
    if (pattern == null) return;

    this.gui.trackInfo(trackIndex, track);
    this.gui.patternInfo(patternIndex, pattern);

    this.drawGrid(pattern);
    // and force the active step to show its value:
    this.activeStep = -1;
    this._drawActiveStep();
  }

  _drawActiveStep() {
    const clock = this.selectedTrack.clockForMultiplier(this.clock);
    if (clock == null) return;

    const { selectedPattern, launchpad, gui } = this;
    const oldActiveStep = this.activeStep;
    const activeStep = selectedPattern.stepIndexForClock(clock);

    // remove old active step indicators
    if (oldActiveStep >= 0) {
      const oldX = oldActiveStep % 8;
      const oldY = Math.floor(oldActiveStep / 8) % 8;
      const oldValue = selectedPattern.getStep(oldActiveStep);
      if (!launchpad.patternOpsMode) {
        launchpad.grid(oldX, oldY, oldValue);
      }
      gui.grid(oldX, oldY, oldValue);
    }

    this.activeStep = activeStep;

    // show the new active step indicators
    if (activeStep >= 0) {
      const x = activeStep % 8;
      const y = Math.floor(activeStep / 8) % 8;
      if (!launchpad.patternOpsMode) {
        launchpad.activeStep(x, y);
      }
      gui.activeStep(x, y);
    }
  }
}
