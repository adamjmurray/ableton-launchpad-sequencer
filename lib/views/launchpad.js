/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
class Launchpad {
  static initClass() {
  
  
    this.OFF =    this.color(0,0);
    this.GREEN =  this.color(3,0);
    this.YELLOW = this.color(3,2);
    this.ORANGE = this.color(2,3);
    this.RED =    this.color(0,3);
    this.GRID_COLORS = [this.OFF, this.GREEN, this.YELLOW, this.ORANGE, this.RED];
  
    this.STEP_COLOR =    this.color(1,1); // color for current sequencer step, regardless of value
  
    this.INACTIVE_GREEN =  this.color(2,0);
    this.INACTIVE_YELLOW = this.color(2,1);
    this.INACTIVE_ORANGE = this.color(1,2);
    this.INACTIVE_RED =    this.color(0,2);
    this.INACTIVE_GRID_COLORS = [this.OFF, this.INACTIVE_GREEN, this.INACTIVE_YELLOW, this.INACTIVE_ORANGE, this.INACTIVE_RED];
    this.ACTIVE_GRID_COLORS = [this.STEP_COLOR, this.GREEN, this.YELLOW, this.ORANGE, this.RED];
  
    this.TRACK_COLOR =   this.color(1,2);
    this.PATTERN_COLOR = this.color(2,0);
  
    this.MUTE_COLOR =          this.color(0,3);
    this.INACTIVE_MUTE_COLOR = this.color(0,1);
  }

  static color(green,red) {
    if ((0 <= green && green <= 3) && (0 <= red && red <= 3)) { return (16*green) + red; }
  }


  constructor() {
    this.patternOpsMode = false;
  }


  ctlout(cc, value) {
    outlet(LAUNCHPAD_CC, cc, value);
  }


  noteout(pitch, velocity) {
    outlet(LAUNCHPAD_NOTE, pitch, velocity);
  }


  allOff() {
    this.ctlout(0,0);
  }


  track(track) {
    const color = track.mute ? Launchpad.MUTE_COLOR : Launchpad.TRACK_COLOR;
    this._top(track.index, color);
  }

  trackOff(track) {
    const color = track.mute ? Launchpad.INACTIVE_MUTE_COLOR : Launchpad.OFF;
    this._top(track.index, color);
  }


  stepValue(stepValue) {
    if (stepValue > 0) { this._top(stepValue+3, Launchpad.GRID_COLORS[stepValue]); }
  }

  stepValueOff(stepValue) {
    if (stepValue > 0) { this._top(stepValue+3, Launchpad.OFF); }
  }


  pattern(pattern) {
    const color = pattern.mute ? Launchpad.MUTE_COLOR : Launchpad.PATTERN_COLOR;
    this._right(pattern.index, color);
  }

  patternOff(pattern) {
    const color = pattern.mute ? Launchpad.INACTIVE_MUTE_COLOR : Launchpad.OFF;
    this._right(pattern.index, color);
  }


  grid(x, y, value) {
    this._grid(x, y, Launchpad.GRID_COLORS[value]);
  }


  activeStep(x, y) {
    this._grid(x, y, Launchpad.STEP_COLOR);
  }


  patternSteps(pattern, additionalDeferredCallback) {
    const self = this;
    if (this.patternOpsMode) {   // Use the grid to show the pattern length by lighting up all the steps from the start to the end step
      const { start } = pattern;
      const { end } = pattern;
      Defer.eachStep(function(x,y,index) {
        const stepValue = pattern.getStep(index);
        const color = start <= index && index <= end ? Launchpad.ACTIVE_GRID_COLORS[stepValue] : Launchpad.INACTIVE_GRID_COLORS[stepValue];
        self._grid(x, y, color);
        if (additionalDeferredCallback != null) { additionalDeferredCallback(x, y, stepValue); }
      });
    } else {
      Defer.eachStep(function(x,y,index) {
        const stepValue = pattern.getStep(index);
        self._grid(x, y, Launchpad.GRID_COLORS[stepValue]);
        if (additionalDeferredCallback != null) { additionalDeferredCallback(x, y, stepValue); }
      });
    }
  }


  // ==============================================================================
  // private

  _top(index, color) {
    if (0 <= index && index <= 7) { this.ctlout(104+index, color); }
  }

  _grid(x, y, color) {
    if ((0 <= x && x <= 7) && (0 <= y && y <= 7)) { this.noteout((16*y) + x, color); }
  }

  _right(index, color) {
    if (0 <= index && index <= 7) { this.noteout((16*index) + 8, color); }
  }
}
Launchpad.initClass();
