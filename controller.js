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
      call.topPressed(index);
    });
    launchpad.on('rightDown', function(index) {
      call.rightPressed(index); 
    });
    launchpad.on('gridDown', function(x,y) {
      call.gridPressed(x,y);
    });
  },

  topPressed: function(index) {
    if(index >= 0 && index <= 7) {      
      if(index <= 3) {
        this.launchpad.top(this.track);
        this.track = index;
        this.launchpad.top(index,'a');
      }
      else {
        this.launchpad.top(this.colorTopIndex);
        this.colorTopIndex = index;
        this.stepValue = index-3;
        this.color = this._colorFor(this.stepValue);
        this.launchpad.top(index,this.color);
      }
    }        
  },

  rightPressed: function(index) {
    if(index >= 0 && index <= 7) {
      this.launchpad.right(this.pattern);
      this.pattern = index;
      this.launchpad.right(index,[2,0]);
    }
  },

  gridPressed: function(x,y) {
    var step = x + y*8;
    var seq = this.sequencer;
    var oldValue = seq.get(step);
    var newValue = this.stepValue;
    var color = this.color;
    if(newValue == oldValue) {
      newValue = color = 0;
    }
    seq.set(step,newValue);
    this.launchpad.grid(x,y,color);
  },

  _colorFor: function(value) {
    switch(value) {
      case 1: return 'g';
      case 2: return 'y';
      case 3: return 'o';
      case 4: return 'r';
      default: return 0;
    }
  }

});