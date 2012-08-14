this.Controller = class({

  init: function(launchpad) {
    launchpad.allOff();

    this.launchpad = launchpad;
    this.track = 0;
    this.color = null;
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
        switch(index) {
          case 4: this.color = 'g'; break;
          case 5: this.color = 'y'; break;
          case 6: this.color = 'o'; break;
          case 7: this.color = 'r'; break;
        }
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
    log("Step pressed: " + step);
    var oldValue = seq.get(step);
    var newValue = 3 - oldValue;
    seq.set(step,newValue);
    launchpad.grid(x,y,newValue);
  }

});