import GuiView from './GuiView';
import LaunchpadView from './LaunchpadView';

export default class View {

  constructor() {
    this._guiView = new GuiView;
    this._launchpadView = new LaunchpadView;
  }

  onRefresh(model) {
    // TODO: update everything
  }

  onTrackChange(model) {
    // TODO: update track buttons
    this.onGridChange(model);
  }

  onPatternChange(model) {
    // TODO: update pattern buttons
    this.onGridChange(model);
  }

  onValueChange(model) {

  }

  onGridChange(model) {

  }

  onStepChange(model) {
    // Do we need to pass in the stepIndex or should we put a selectedStepIndex in the model?
  }

  onClockChange(model) {
    // TODO: keep track of previous clock value so we can update that button as well
  }

  onModeChange(model) {

  }

  // // might not need this unless we're updating the scale GUI to reflect incoming track MIDI
  // // Otherwise I'm hoping it will be hooked up to pattr and not need explicit updating, even on load
  // onScaleChange(model) {

  // }




  renderGlobalSettings() {
    // support rendering individual settings?
  }

  renderTrackSettings() {

  }
}
