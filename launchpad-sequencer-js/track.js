this.Track = Class.define({

  DEFAULT_PATTERN_TYPES: [
    'gate',
    'pitch',
    'velocity'
  ],

  init: function(basePitch) {
    if(basePitch===undefined || basePitch===null) basePitch = 60;
    this.basePitch = basePitch;

    var patterns = [];
    for(var p=0; p<PATTERNS; p++) {
      patterns.push( new Pattern(this.DEFAULT_PATTERN_TYPES[p]) );
    }
    this.patterns = patterns;
  }

});
