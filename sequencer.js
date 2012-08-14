this.Sequencer = class({

  init: function(launchpad,defaultValue) {
    this._launchpad = launchpad;    
    var seq = [];
    for(var i=0;i<64;i++) seq.push(defaultValue);
    this._sequence = seq;
  },

  get: function(index) {
    var seq = this._sequence;
    return seq[index % seq.length];
  },

  set: function(index,value) {
    if(index >=0 && index <=64) {
      this._sequence[index] = value;
    }    
  }

});