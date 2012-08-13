this.Sequencer = class({

  init: function(launchpad,defaultValue) {
    this.launchpad = launchpad;    
    var seq = [];
    for(var i=0;i<64;i++) seq.push(defaultValue);
    this.sequence = seq;
  },

  get: function(stepIndex) {
    var seq = this.sequence;
    return seq[stepIndex % seq.length];
  },

  set: function(index,value) {
    if(index >=0 && index <=64) {
      this.sequence[index] = value;
    }    
  }

});