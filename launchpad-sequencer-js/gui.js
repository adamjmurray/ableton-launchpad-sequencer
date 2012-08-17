this.GUI = Class.define({

  GRID_COLORS: [ // Max's LCD object expects [R,G,B] in 0-255 range
    [150,150,150],  // off
    [0,255,0],   // green
    [255,255,0], // yellow
    [255,127,0], // orange
    [255,0,0],   // red
    [80,130,200]// current step
  ],

  track: function(trackIndex) {
    outlet(4, trackIndex);
  },

  stepValue: function(stepValue) {
    outlet(5, stepValue);
  },

  pattern: function(patternIndex) {
    outlet(6, patternIndex);
  },

  grid: function(x, y, value) {
    var left = x*GUI_STEP_WIDTH + 2,
        top  = y*GUI_STEP_WIDTH + 2;
    outlet(7, 'frgb', this.GRID_COLORS[value]);
    outlet(7, 'paintrect', left, top, left+13, top+13);
  },

  clearGrid: function() {
    outlet(7, 'clear');
  },

  patternType: function(type) {
    outlet(8, type || "");
  }

});