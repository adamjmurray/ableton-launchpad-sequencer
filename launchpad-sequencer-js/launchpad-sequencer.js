//========================================================
// Dependencies

function include(n){var f=new File(n),t=[],e=f.eof,i=0;if(f.isopen){for(;i<e;i++)t+=f.readchars(1);f.close();eval(t+'');}else error("Missing required file: "+n+"\n");}

include('class.js');
include('gui.js');
include('launchpad.js');
include('pattern.js');
include('sequencer.js');

log=function(msg){post(msg+'\n');};


//========================================================
// Constants

TRANSPORT_STOP = 123;


//========================================================
// Output to Max

outlets = 8;

noteOut = function(note, velocity) {
  outlet(0, note, velocity);
};

ctlOut = function(cc, value) {
  outlet(1, cc, value);
};

sequencerOut = function(track, pattern, value) {
  outlet(2, track, pattern, value);
};

pattrOut = function(trackIndex, patternIndex, sequenceValues) {
  // The Max patcher uses numbers (count from 1) instead of indexes.
  // We also reverse the order so it's easy to use [zl ecils] to control poly~ target
  outlet(3, sequenceValues, patternIndex+1, trackIndex+1);
};


//========================================================

gui = new GUI();
launchpad = new Launchpad(noteOut, ctlOut);
sequencer = new Sequencer(launchpad, sequencerOut, gui);


//========================================================
// Input from Max

function bang() { // (re)initialize on bang
  sequencer.reset();
}

function notein(pitch,velocity) {
  launchpad.notein(pitch,velocity);
}

function ctlin(cc,val) {
  if(cc === TRANSPORT_STOP) {
    // Live sends "all notes off" to all connected MIDI devices when the transport stops,
    // which resets the Launchpad, so we need to restore the state:
    sequencer.reset();


    // Also use this as an opportunity to record the sequencer state without affecting realtime audio performance
    sequencer.writeState(pattrOut);

  } else {
    launchpad.ctlin(cc,val);
  }
}

function track(trackIndex) {
  sequencer.selectTrack(trackIndex);
}

function stepValue(value) {
  sequencer.selectValue(value);
}

function pattern(patternIndex) {
  sequencer.selectPattern(patternIndex);
}

function clock(bars,beats,units) {
  // assume 4/4 with 1/16 note pulses
  var clockIndex = (bars-1)*16 + (beats-1)*4 + Math.round(units/120);
  sequencer.setClock(clockIndex);
}

function load(pattrPath) {
  // pattrPath looks like "track.1::pattern.1::sequence"
  var matches = /^track\.(\d)::pattern\.(\d)::sequence$/.exec(pattrPath);
  if(matches) {
    var trackNumber = parseInt(matches[1]);
    var patternNumber = parseInt(matches[2]);
    var sequenceValues = Array.prototype.slice.call(arguments, 1); // all the arguments after the first one
    sequencer.setPattern(trackNumber-1, patternNumber-1, sequenceValues);
  }
}


//========================================================
// TODO: comment out when not developing
log('\nrefreshed '+(new Date()).toString());
bang();