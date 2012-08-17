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
    for(var i=0;i<64;i++) seq.push(defaultValue);
    this.sequence = seq;

    this.start = 0;
    this.end = 63;
    this._updateLength();
  },

  get: function(offset) {
    return this.sequence[this.start + (offset % this.length)];
  },

  setType: function(type) {
    this.type = type;
  },

  setStep: function(index,value) {
    if(index >=0 && index <=63) {
      this.sequence[index] = value;
    }    
  },

  setStart: function(index) {
    if(index >=0 && index <=63) {
      this.start = index;
      if(this.start > this.end) this.end = this.start;
      this._updateLength();
    }
  },

  setEnd: function(index) {
    if(index >=0 && index <=63) {
      this.end = index;
      if(this.start > this.end) this.start = this.end;
      this._updateLength();
    }
  },

  _updateLength: function() {
    this.length = this.end - this.start + 1;
  }
});
