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
    log(eventName + " : " + args);
    var callbacks = this.callbacks[eventName];
    if(callbacks) {
      for(var i=0,l=callbacks.length;i<l;i++) {
        // I am pretty sure "this" is wrong!
        callbacks[i].apply(this,args);
      }
    }
  },

  notein: function(pitch,velocity) {
    var x = pitch % 16,
        y = Math.floor(pitch / 16),
        gridIndex = x + y*8,
        eventType = (velocity > 0) ? 'Down' : 'Up';

    if(x > 7) {
      this._notify('track'+eventType, [y]);
    } else {
      this._notify('grid'+eventType, [x,y,gridIndex]);      
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

  _clip: function(value,low,high) {
    if(value===null || value===undefined || isNaN(value) || value < low) value = low;
    if(value > high) value = high;
    return value;
  },
  
  ctlout: function(cc,val) {
    outlet(0,'ctl',cc,val);
  },
  
  noteout: function(note,velocity) {
    outlet(0,'note',note,velocity);
  },

  gridButton: function(x,y,color) {
    x = this._clip(x,0,8);
    y = this._clip(y,0,7);
    c = this._color(color);
    this.noteout(16*y + x, c);  
  },
  
  allOn: function(brightness) {
    if(!brightness) brightness=3;
    // convert brightness values 0,1,2,3 to 0,125,126,127
    // (0=off, 125=low, 126=med, 127=high)
    var b = this._clip(brightness,0,3);
    if(b > 0) b += 124; 
    this.ctlout(0,b);
  },
    
  allOff: function() {
    this.ctlout(0,0);
  },

  _color: function(color) {
    var g,r;
    if(color instanceof Array) {
      g = parseInt(color[0]);
      r = parseInt(color[1]);
    }
    else if(typeof(color)==="string") {
      switch(color.toLowerCase()) {
        case 'green':
        case 'g':
          g=3; r=0; break;
        case 'yellow':
        case 'y':
          g=3; r=2; break;
        case 'amber':
        case 'a':
          g=1; r=1; break;
        case 'orange':
        case 'o':
          g=2; r=3; break;
        case 'red':
        case 'r':
          g=0; r=3; break;
        default:
          g=0; r=0;   
      }    
    }
    else if(typeof(color)==="boolean") { 
      g = color ? 3 : 0;
      r = 0;
    }
    else {
      g = parseInt(color);
      r = 0;
    }
    
    g = this._clip(g,0,3);
    r = this._clip(r,0,3);
    return 16*g + r;
  }

});


