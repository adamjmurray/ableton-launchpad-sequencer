import { DEFAULT } from '../config';
import GuiView from './GuiView';
import LaunchpadView from './LaunchpadView';

export default class View {

  constructor(model) {
    this._guiView = new GuiView(model);
    this._launchpadView = new LaunchpadView(model);
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
      this._launchpadView.render();
      this._guiView.renderTrackButton(newIndex);
      // TODO: render GUI grid
      this._selectedTrackIndex = newIndex;
    }
  }

  onPatternChange(model) {
    const previousIndex = this._selectedPatternIndex;
    const newIndex = model.selectedPatternIndex;
    if (newIndex !== previousIndex) {
      this._launchpadView.render();
      this._guiView.renderPatternButton(newIndex);
      // TODO: render GUI grid
      this._selectedPatternIndex = newIndex;
    }
  }

  onValueChange(model) {
    const previousValue = this._selectedValue;
    const newValue = model.selectedValue;
    if (newValue !== previousValue) {
      this._launchpadView.renderValueButton(previousValue);
      this._launchpadView.renderValueButton(newValue);
      this._guiView.renderValueButton(newValue);
      this._selectedValue = newValue;
    }
  }

  onGridChange(model) {
    this._launchpadView.render();
    // TODO: redraw GUI
  }

  onStepChange(model) {
    this._launchpadView.renderStepButton(model.selectedStepIndex);
    // TODO: GUI
  }

  onClockChange(model) {
    const previousClockIndex = this._clockIndex;
    const newClockIndex = model.clockIndex;
    if (newClockIndex !== previousClockIndex) {
      const pattern = model.selectedPattern;
      const previousStepIndex = pattern.getStepIndexForClock(previousClockIndex);
      const newStepIndex = pattern.getStepIndexForClock(newClockIndex);
      this._launchpadView.renderStep(previousStepIndex);
      this._launchpadView.renderSequencerStep(newStepIndex);
      // TODO: GUI
    }
  }

  onModeChange(model) {
    this._launchpadView.render();
  }

  // // might not need this unless we're updating the scale GUI to reflect incoming track MIDI
  // // Otherwise I'm hoping it will be hooked up to pattr and not need explicit updating, even on load
  // onScaleChange(model) {

  // }
}
