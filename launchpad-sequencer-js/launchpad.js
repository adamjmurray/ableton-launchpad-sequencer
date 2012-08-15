this.Launchpad = Class.define({

  init: function() {
    this.callbacks = {};
  },

  on: function(evt,callback) {
    var valid = /^((top)|(grid)|(right))((Up)|(Down))$/;
    if(valid.test(evt)) {
      var callbacks = this.callbacks[evt];
      if(callbacks) {
        callbacks.push(callback);
      } else {
        this.callbacks[evt] = [callback];
      }
    }
  },

  ctlin: function(cc,value) {
    var index = (cc-104),
        eventType = (value > 0) ? 'Down' : 'Up';
    this._notify('top'+eventType, [index]);      
  },

  notein: function(pitch,velocity) {
    var x = pitch % 16,
        y = Math.floor(pitch / 16),
        eventType = (velocity > 0) ? 'Down' : 'Up';
    if(x > 7) {
      this._notify('right'+eventType, [y]);
    } else {
      this._notify('grid'+eventType, [x,y]);      
    }
  },

  top: function(index,color) {
    if(index >= 0 && index <= 7) {
      this._ctlout(104+index, color);    
    }
  },
    
  grid: function(x,y,color) {
    if(x >= 0 && x <= 7 && y >=0 && y <= 7) {
      this._noteout(16*y + x, color);  
    }
  },

  right: function(index,color) {
    if(index >= 0 && index <= 7) {
      this._noteout(16*index + 8, color);  
    }
  },
    
  allOff: function() {
    this._ctlout(0,0);
  },


  //==============================================================================
  // private

  _notify: function(eventName, args) {
    var callbacks = this.callbacks[eventName];
    if(callbacks) {
      for(var i=0,l=callbacks.length;i<l;i++) {
        callbacks[i].apply(this,args);
      }
    }
  },

  _noteout: function(note,velocity) {
    outlet(0,'note',note,velocity);
  },

  _ctlout: function(cc,val) {
    outlet(0,'ctl',cc,val);
  }

});


//==============================================================================
// class methods

/**
 * Given green & red intensities from 0-3 (off-brightest), return the MIDI color value.
 * The return value of this method can be passed to the top(), grid(), and right() methods.
 */
this.Launchpad.color = function(green,red) {
  if(green >= 0 && green <= 3 && red >= 0 && red <= 3) {
    return 16*green + red;
  } else {
    return null;
  }
};

