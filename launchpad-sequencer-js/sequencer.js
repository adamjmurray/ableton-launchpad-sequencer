this.Sequencer = Class.define({

  init: function(defaultValue) {
    if(defaultValue===undefined || defaultValue===null) defaultValue=0;
    var seq = [];
    for(var i=0;i<64;i++) seq.push(defaultValue);
    this.sequence = seq;
  },

  get: function(index) {
    var seq = this.sequence;
    return seq[index % seq.length];
  },

  set: function(index,value) {
    if(index >=0 && index <=64) {
      this.sequence[index] = value;
    }    
  }

});