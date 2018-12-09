import { DEFAULT } from '../config';
import GuiView from './GuiView';
import LaunchpadView from './LaunchpadView';

export default class View {

  constructor(model) {
    this._model = model;
    this._guiView = new GuiView(model);
    this._launchpadView = new LaunchpadView(model);
    this._selectedValue = null;
    this._clockIndex = -1;
  }

  render() {
    this._guiView.render();
    this._launchpadView.render();
  }

  renderTrack() {
    this._launchpadView.render();
    this._guiView.renderTrack(this._model.selectedTrack);
    this._guiView.renderPattern(this._model.selectedPattern);
    this._guiView.renderGrid();
  }

  renderDuration(duration) {
    this._guiView.renderDuration(duration);
  }

  renderScale(pitchClasses) {
    this._guiView.renderScale(pitchClasses);
  }

  renderTrackIndex() {
    this._guiView.renderTrackIndex(this._model.selectedTrackIndex);
    this._launchpadView.renderTrackButton(this._model.selectedTrackIndex);
  }

  renderTrackPitch() {
    this._guiView.renderTrackPitch(this._model.selectedTrack.pitch);
  }

  renderTrackVelocity() {
    this._guiView.renderTrackVelocity(this._model.selectedTrack.velocity);
  }

  renderTrackGate() {
    this._guiView.renderTrackGate(this._model.selectedTrack.gate);
  }

  renderTrackGateSummingMode(mode = this._model.selectedTrack.gateSummingMode) {
    this._guiView.renderTrackGateSummingMode(mode);
  }

  renderTrackMultiplier() {
    this._guiView.renderTrackMultiplier(this._model.selectedTrack.durationMultiplier);
  }

  renderTrackMute(trackIndex, mute) {
    if (trackIndex === this._model.selectedTrackIndex) {
      this._guiView.renderTrackMute(mute);
    }
    this._guiView.renderTrackSelectorMute(trackIndex, mute);
    this._launchpadView.renderTrackButton(trackIndex);
  }

  renderPatternIndex() {
    this._guiView.renderPatternIndex(this._model.selectedPatternIndex);
    this._launchpadView.renderPatternButton(this._model.selectedPatternIndex);
  }

  renderPattern() {
    this._guiView.renderPattern(this._model.selectedPattern);
    this._launchpadView.render();
  }

  renderPatternStart() {
    this._guiView.renderPatternStart(this._model.selectedPattern.startStepIndex);
    this._launchpadView.render();
  }

  renderPatternEnd() {
    this._guiView.renderPatternEnd(this._model.selectedPattern.endStepIndex);
    this._launchpadView.render();
  }

  renderPatternMute(patternIndex, mute) {
    if (patternIndex === this._model.selectedPatternIndex) {
      this._guiView.renderPatternMute(mute);
    }
    this._guiView.renderPatternSelectorMute(patternIndex, mute);
    this._launchpadView.renderPatternButton(patternIndex);
  }

  renderValue() {
    const previousValue = this._selectedValue;
    const newValue = this._model.selectedValue;
    if (newValue !== previousValue) {
      this._launchpadView.renderValueButton(previousValue);
      this._launchpadView.renderValueButton(newValue);
      this._guiView.renderValueButton(newValue);
      this._selectedValue = newValue;
    }
  }

  renderGrid() {
    this._launchpadView.render(); // full render is faster than updating each grid button
    this._guiView.renderGrid();
  }

  renderStep(stepIndex) {
    this._launchpadView.renderStepButton(stepIndex);
    this._guiView.renderStep(stepIndex);
  }

  renderClock() {
    const previousClockIndex = this._clockIndex;
    const newClockIndex = this._model.clockIndex;
    if (newClockIndex !== previousClockIndex) {
      const pattern = this._model.selectedPattern;
      const previousStepIndex = pattern.stepIndexForClock(previousClockIndex);
      const newStepIndex = pattern.stepIndexForClock(newClockIndex);
      this._launchpadView.renderStepButton(previousStepIndex);
      this._launchpadView.renderStepButton(newStepIndex);
      this._guiView.renderStep(previousStepIndex);
      this._guiView.renderStep(newStepIndex);
      this._clockIndex = newClockIndex;
    }
  }
}
