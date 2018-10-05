import { DEFAULT } from '../config';
import GuiView from './GuiView';
import LaunchpadView from './LaunchpadView';

export default class View {

  constructor(model) {
    this._model = model;
    this._guiView = new GuiView(model);
    this._launchpadView = new LaunchpadView(model);
    this._selectedValue = DEFAULT.VALUE;
    this._clockIndex = -1;
  }

  render() {
    this._guiView.render();
    this._launchpadView.render();
  }

  renderTrack() {
    this._launchpadView.render();
    this._guiView.renderTrack();
    this._guiView.renderGrid();
  }

  renderSelectedTrackMute() {
    this._launchpadView.renderTrackButton(this._model.selectedTrackIndex);
    this._guiView.renderTrack();
  }

  renderPattern() {
    this._launchpadView.render();
    this._guiView.renderPattern();
    this._guiView.renderGrid();
  }

  renderSelectedPatternMute() {
    this._launchpadView.renderPatternButton(this._model.selectedPatternIndex);
    this._guiView.renderPattern();
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

  renderStep() {
    const { selectedStepIndex } = this._model;
    this._launchpadView.renderStepButton(selectedStepIndex);
    this._guiView.renderStep(selectedStepIndex);
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

  onModeChange() {
    this._launchpadView.render();
  }

  // // might not need this unless we're updating the scale GUI to reflect incoming track MIDI
  // // Otherwise I'm hoping it will be hooked up to pattr and not need explicit updating, even on load
  // onScaleChange(model) {

  // }
}
