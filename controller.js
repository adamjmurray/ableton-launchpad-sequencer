this.Controller = class({

  init: function(launchpad) {
    launchpad.allOff();

    this.launchpad = launchpad;
    this.track = 0;
    this.color = null;
    this.colorValue = 0;
    this.colorTopIndex = 4;
    this.pattern = 0;

    this.sequencer = new Sequencer();

    var call = this;
    launchpad.on('topDown', function(index) {
      call.pressTop(index);
    });
    launchpad.on('rightDown', function(index) {
      call.selectPattern(index); 
    });
    launchpad.on('gridDown', function(x,y) {
      call.pressGrid(x,y);
    });

    this.selectTrack(0);
    this.selectPattern(0);
    this.selectValue(1);
  },

  pressTop: function(index) {
    if(index <= 3) {
      this.selectTrack(index);
    } else {
      this.selectValue(index-3);
    }
  },

  pressGrid: function(x,y) {
    var step = x + y*8;
    var color = this.color;    
    var seq = this.sequencer;
    var oldValue = seq.get(step);
    var newValue = this.value;    
    if(newValue === oldValue) newValue = color = 0;
    seq.set(step,newValue);
    this.launchpad.grid(x,y,color);
  },

  selectTrack: function(index) {
    if(index >= 0 && index <= 3) {
      this.launchpad.top(this.track);
      this.track = index;
      this.launchpad.top(index,'a');
    }
  },

  selectValue: function(value) {
    if(value >= 0 && value <= 4) { 
      if(this.value !== 0) this.launchpad.top(this.value+3);    
      this.value = value;
      this.color = this.colorFor(value);
      if(value !== 0) this.launchpad.top(value+3, this.color);
    }
  },

  selectPattern: function(index) {
    if(index >= 0 && index <= 7) {
      this.launchpad.right(this.pattern);
      this.pattern = index;
      this.launchpad.right(index,[2,0]);
    }
  },

  colorFor: function(value) {
    switch(value) {
      case 1: return 'g';
      case 2: return 'y';
      case 3: return 'o';
      case 4: return 'r';
      default: return 0;
    }
  }

});