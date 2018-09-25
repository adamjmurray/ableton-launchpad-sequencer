import { DEFAULT } from '../config';
import GuiView from './GuiView';
import LaunchpadView from './LaunchpadView';

export default class View {

  constructor() {
    this._guiView = new GuiView;
    this._launchpadView = new LaunchpadView;
    this._selectedTrackIndex = 0;
    this._selectedPatternIndex = 0;
    this._selectedValue = DEFAULT.VALUE;
    this._clockIndex = -1;
  }

  render(model) {
    this._guiView.render(model);
    this._launchpadView.render(model);
  }

  onTrackChange(model) {
    const previousIndex = this._selectedTrackIndex;
    const newIndex = model.selectedTrackIndex;
    if (newIndex !== previousIndex) {
      this._launchpadView.renderTrackButton(previousIndex, model);
      this._launchpadView.renderTrackButton(newIndex, model);
      this._guiView.renderTrackButton(newIndex);
      this._selectedTrackIndex = newIndex;
    }
  }

  onPatternChange(model) {
    const previousIndex = this._selectedPatternIndex;
    const newIndex = model.selectedPatternIndex;
    if (newIndex !== previousIndex) {
      this._launchpadView.renderPatternButton(previousIndex, model);
      this._launchpadView.renderPatternButton(newIndex, model);
      this._guiView.renderPatternButton(newIndex);
      this._selectedPatternIndex = newIndex;
    }
  }

  onValueChange(model) {
    const previousValue = this._selectedValue;
    const newValue = model.selectedValue;
    if (newValue !== previousValue) {
      this._launchpadView.renderValueButton(previousValue, model);
      this._launchpadView.renderValueButton(newValue, model);
      this._guiView.renderValueButton(newValue);
      this._selectedValue = newValue;
    }
  }

  onGridChange(model) {
    // TODO: redraw grid
    this._launchpadView.render(model); // fast LED updating requires a full re-render
  }

  onStepChange(model) {
    // Do we need to pass in the stepIndex or should we put a selectedStepIndex in the model?
  }

  onClockChange(model) {
    const previousClockIndex = this._clockIndex;
    const newClockIndex = model.clockIndex;
    if (newClockIndex !== previousClockIndex) {
      const pattern = model.selectedPattern;
      const previousStepIndex = pattern.getStepIndexForClock(previousClockIndex);
      const newStepIndex = pattern.getStepIndexForClock(newClockIndex);
      this._launchpadView.renderStep(previousStepIndex, model);
      this._launchpadView.renderSequencerStep(newStepIndex);
      // TODO: GUI
    }
  }

  onModeChange(model) {
    this._launchpadView.render(model);
  }

  // // might not need this unless we're updating the scale GUI to reflect incoming track MIDI
  // // Otherwise I'm hoping it will be hooked up to pattr and not need explicit updating, even on load
  // onScaleChange(model) {

  // }
}
