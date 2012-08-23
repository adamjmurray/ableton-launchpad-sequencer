/**
 * A pattern corresponds to the 8x8 grid of buttons on the Launchpad.
 *
 * It consists of 64 steps with integer values (typically 0-4 for off,green,yellow,orange,red lights),
 * a start step, and an end step.
 */
this.Pattern = Class.define({

  init: function(type, defaultValue) {
    this.type = type;
    if(defaultValue===undefined || defaultValue===null) defaultValue=0;

    var seq = [];
    for(var i=0; i<STEPS; i++) seq.push(defaultValue);
    this.sequence = seq;

    this.start = 0;
    this.end = STEPS-1;
    this._updateLength();
  },

  setType: function(type) {
    this.type = type;
  },

  setStart: function(index) {
    if(index >=0 && index < STEPS) {
      this.start = parseInt(index);
      if(this.start > this.end) this.end = this.start;
      this._updateLength();
    }
  },

  setEnd: function(index) {
    if(index >=0 && index < STEPS) {
      this.end = parseInt(index);
      if(this.start > this.end) this.start = this.end;
      this._updateLength();
    }
  },

  getStep: function(index) {
    return this.sequence[index];
  },

  setStep: function(index,value) {
    if(index >=0 && index < STEPS) {
      this.sequence[index] = value;
    }
  },

  /**
   * Given a clock index (in steps) return the active step in this pattern,
   * taking into account the start and end step.
   */
  stepForClock: function(clock) {
    if(clock >= 0) {
      return (clock % this.length) + this.start;
    } else {
      return -1;
    }
  },

  getStepForClock: function(clock) {
    return this.getStep(this.stepForClock(clock));
  },

  _updateLength: function() {
    this.length = this.end - this.start + 1;
  }
});
