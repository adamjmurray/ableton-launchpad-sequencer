this.Controller = class({

  PATTERNS: 8,

  TRACKS: 4,


  init: function(launchpad) {
    launchpad.allOff();
    this.launchpad = launchpad;
    
    var sequencers = [];
    for(var t=0;t<this.TRACKS;t++) {
      var track = [];
      for(var p=0;p<this.PATTERNS;p++) track.push(new Sequencer());            
      sequencers.push(track);      
    }
    this.sequencers = sequencers;

    var call = this;
    launchpad.on('topDown', function(index) {
      if(index <= 3) call.selectTrack(index);
      else call.selectValue(index-3);      
    });
    launchpad.on('rightDown', function(idx){ call.selectPattern(idx); });
    launchpad.on( 'gridDown', function(x,y){ call.setGridValue( x,y); });

    this.selectTrack(0);
    this.selectPattern(0);
    this.selectValue(1);
  },


  //==============================================================================
  

  setGridValue: function(x,y) {
    var step = x + y*8;
    var color = this.color;    
    var sequencer = this.sequencers[0][0];
    var newValue = this.value;    
    if(newValue === sequencer.get(step)) newValue = color = 0;
    sequencer.set(step, newValue);
    this.launchpad.grid(x,y, color);
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
      this.color = this._colorFor(value);
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


  //==============================================================================
  // private


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