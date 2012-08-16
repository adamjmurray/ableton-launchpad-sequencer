this.Sequencer = Class.define({

  PATTERNS: 8,

  TRACKS: 4,

  GRID_COLORS:[
    Launchpad.color(0,0), // off
    Launchpad.color(3,0), // green
    Launchpad.color(3,2), // yellow
    Launchpad.color(2,3), // orange
    Launchpad.color(0,3)  // red
  ],

  STEP_COLOR: Launchpad.color(1,1), // color for current sequencer step, regardless of value
  TRACK_COLOR: Launchpad.color(1,2),
  PATTERN_COLOR: Launchpad.color(2,0),

  init: function(launchpad, output) {
    this.launchpad = launchpad;
    this.output = output;

    this.track = 0; // selected track index
    this.pattern = 0; // selected pattern index
    this.value = 1;
    this.clock = -1;
    
    this.patterns = [];
    for(var t=0;t<this.TRACKS;t++) {
      var track = [];
      for(var p=0;p<this.PATTERNS;p++) track.push(new Pattern());
      this.patterns.push(track);
    }
    this._updateSelectedPattern();

    var call = this;
    launchpad.on('topDown', function(index) {
      if(index <= 3) call.selectTrack(index);
      else call.selectValue(index-3);      
    });
    launchpad.on('rightDown', function(idx){ call.selectPattern(idx); });
    launchpad.on( 'gridDown', function(x,y){ call.setGridValue( x,y); });
  },


  //==============================================================================

  /**
   * Update the Launchpad lights to reflect the current sequencer state
   */
  reset: function() {
    this.launchpad.allOff();
    this.setClock(this.clock);
    this.selectValue(this.value);
    this.selectTrack(this.track, true);
    this.selectPattern(this.pattern);
  },

  setGridValue: function(x,y) {
    var step = x + y*8;
    var selectedPattern = this.selectedPattern;
    var newValue = this.value;    

    if(newValue === selectedPattern.get(step)) newValue = 0; // toggle off
    selectedPattern.setStep(step, newValue);

    this.launchpad.grid(x,y, this.GRID_COLORS[newValue]);
  },

  selectTrack: function(index, skipRedraw) {
    if(index >= 0 && index <= 3) {
      this.launchpad.top(this.track, 0);
      this.track = index;
      this.launchpad.top(index, this.TRACK_COLOR);
      this._updateSelectedPattern(skipRedraw);
    }
  },

  selectValue: function(value) {
    if(value >= 0 && value <= 4) { 
      if(this.value !== 0) this.launchpad.top(this.value+3, 0);    
      this.value = value;
      if(value !== 0) this.launchpad.top(value+3, this.GRID_COLORS[value]);
    }
  },

  selectPattern: function(index, skipRedraw) {
    if(index >= 0 && index <= 7) {
      this.launchpad.right(this.pattern, 0);
      this.pattern = index;
      this.launchpad.right(index, this.PATTERN_COLOR);
      this._updateSelectedPattern(skipRedraw);
    }
  },

  setClock: function(clock) {
    var
      output = this.output,
      selectedPattern = this.selectedPattern,
      oldClock = this.clock,
      oldX = oldClock % 8,
      oldY = Math.floor(oldClock/8) % 8,
      x = clock % 8,
      y = Math.floor(clock/8) % 8;

    // TODO: be careful, this likely won't work once we allow for changing start & end steps per pattern
    if(oldClock >= 0) this.launchpad.grid(oldX,oldY, this.GRID_COLORS[selectedPattern.get(oldClock)]);

    if(this.clock !== clock) {
      this.clock = clock;
      if(clock >= 0) {
        this.launchpad.grid(x,y, this.STEP_COLOR);
        for(var t = 0, ts = this.TRACKS; t < ts; t++) {
          for(var p = 0, ps = this.PATTERNS; p < ps; p++) {
            var step = this.patterns[t][p].get(clock);
            if(step > 0) { // a simple filter for preliminary testing. TODO: interpret what these patterns mean
              output(t,p,step);
            }
          }
        }
      }
    }
  },

  /**
   * @param track the track index
   * @param pattern the pattern index
   * @param sequence an array of sequence values
   */
  setPattern: function(track, pattern, sequence) {
    if(track >= 0 && track <= 7 && pattern >= 0 && pattern <= 7 && sequence.length===64) {
      this.patterns[track][pattern].sequence = sequence;
      if(track === this.track && pattern === this.pattern) {
        this._drawPattern(track,pattern);
      }
    }
  },

  /**
   * Given an output function(trackIndex, patternIndex, sequenceValues)
   * output the state of the sequencing application.
   */
  writeState: function(output) {
    for(var t = 0, ts = this.TRACKS; t < ts; t++) {
      for(var p = 0, ps = this.PATTERNS; p < ps; p++) {
        output(t, p, this.patterns[t][p].sequence);
      }
    }
  },


  //==============================================================================
  // private

  _updateSelectedPattern: function(skipRedraw) {
    this.selectedPattern = this.patterns[this.track][this.pattern];
    if(!skipRedraw) this._drawPattern(this.track, this.pattern);
  },

  _drawPattern: function(track,pattern) {
    var pattern = this.patterns[track][pattern];
    if(!pattern) return;
    for(var x=0;x<8;x++) {
      for(var y=0;y<8;y++) {
        var step = x + y*8;
        this.launchpad.grid(x,y, this.GRID_COLORS[pattern.get(step)]);
      }
    }
  }

});