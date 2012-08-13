this.Launchpad = class({

  init: function() {
    this.callbacks = {};
  },

  on: function(eventName,callback) {
    var callbacks = this.callbacks[eventName];
    if(callbacks) {
      callbacks.push(callback);
    } else {
      callbacks = this.callbacks[eventName] = [callback];
    }
  },

  _notify: function(eventName, args) {
    var callbacks = this.callbacks[eventName];
    if(callbacks) {
      for(var i=0,l=callbacks.length;i<l;i++) {
        // I am pretty sure "this" is wrong!
        callbacks[i].apply(this,args);
      }
    }
  },

  notein: function(pitch,velocity) {
    var pressed = (velocity > 0),
        x = pitch % 16,
        y = Math.floor(pitch / 16),
        gridIndex = x + y*8,
        evt = pressed ? 'down' : 'up';

    if(x > 7) {
      log(evt + ": track " + y);
    } else {
      log(evt + ": grid " + gridIndex + " (" + x + "," + y + ")");
    }
  },

  ctlin: function(cc,value) {
    var index = (cc-104),
        eventType = (value > 0) ? 'Down' : 'Up';

    if(index < 4) {
      this._notify('screen'+eventType, [index]);      
    } 
    else {
      index -= 4;
      this._notify('mode'+eventType, [index]);      
    }
  },

  clip: function(value,low,high) {
    if(value < low) value = low;
    if(value > high) value = high;
    return value;
  },
  
  ctlout: function(cc,val) {
    outlet(0,'ctl',cc,val);
  },
  
  noteout: function(note,velocity) {
    outlet(0,'note',note,velocity);
  },
  
  allOn: function(brightness) {
    if(!brightness) brightness=3;
    // convert brightness values 0,1,2,3 to 0,125,126,127
    // (0=off, 125=low, 126=med, 127=high)
    var b = this.clip(brightness,0,3);
    if(b > 0) b += 124; 
    this.ctlout(0,b);
  },
    
  allOff: function() {
    this.ctlout(0,0);
  }
});


