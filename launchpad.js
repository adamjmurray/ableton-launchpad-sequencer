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
      var gridIndex = x + y*8;
      this._notify('grid'+eventType, [x,y,gridIndex]);      
    }
  },


  top: function(index,color) {
    if(index >= 0 && index <= 7) {
      c = this._color(color);
      this._ctlout(104+index, c);    
    }
  },
    
  grid: function(x,y,color) {
    if(x >= 0 && x <= 7 && y >=0 && y <= 7) {
      c = this._color(color);
      this._noteout(16*y + x, c);  
    }
  },

  right: function(index,color) {
    if(index >= 0 && index <= 7) {
      c = this._color(color);
      this._noteout(16*index + 8, c);  
    }
  },
  
  allOn: function(brightness) {
    if(!brightness) brightness=3;
    // convert brightness values 0,1,2,3 to 0,125,126,127
    // (0=off, 125=low, 126=med, 127=high)
    var b = this._clip(brightness,0,3);
    if(b > 0) b += 124; 
    this._ctlout(0,b);
  },
    
  allOff: function() {
    this._ctlout(0,0);
  },

  //-------------------------------------------------------------
  // private

  _clip: function(value,low,high) {
    if(value===null || value===undefined || isNaN(value) || value < low) value = low;
    if(value > high) value = high;
    return value;
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
      g = color ? 2 : 0;
      r = 0;
    }
    else {
      g = parseInt(color);
      r = 0;
    }
    
    g = this._clip(g,0,3);
    r = this._clip(r,0,3);
    return 16*g + r;
  },

  _notify: function(eventName, args) {
    // log(eventName + " : " + args);
    var callbacks = this.callbacks[eventName];
    if(callbacks) {
      for(var i=0,l=callbacks.length;i<l;i++) {
        // I am pretty sure "this" is wrong!
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


