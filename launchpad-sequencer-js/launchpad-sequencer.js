outlets = 3;

function include(n){var f=new File(n),t=[],e=f.eof,i=0;if(f.isopen){for(;i<e;i++)t+=f.readchars(1);f.close();eval(t+'');}else error("Missing required file: "+n+"\n");}
include('class.js');
include('launchpad.js');
include('pattern.js');
include('controller.js');

log=function(msg){post(msg+'\n');};

//==========================================================================

ALL_NOTES_OFF = 123;

launchpad = new Launchpad();
controller = new Controller(launchpad);

function notein(pitch,velocity) {
  launchpad.notein(pitch,velocity);
}


function ctlin(cc,val) {
  if(cc === ALL_NOTES_OFF) {
    // Live sends this when the transport is stopped, and also sends "all notes off" to
    // all connected MIDI devices, which resets the Launchpad, so we need to restore the state:
    controller.reset();
    saveAll();

  } else {
    launchpad.ctlin(cc,val);
  }
}

function pulse(bars,beats,units) {
  // assume 4/4 with 1/16 note pulses
  var stepIndex = (bars-1)*16 + (beats-1)*4 + Math.round(units/120);
  controller.setStepIndex(stepIndex);
}

/**
 * Initialize
 */
function bang() {
  launchpad.allOff();
  controller.selectTrack(0);
  controller.selectPattern(0);
  controller.selectValue(1);
}

function saveAll() {
  controller.writeState(function(trackIndex, patternIndex, sequenceValues) {
    // The Max patcher uses numbers (count from 1) instead of indexes.
    // We also reverse the order so it's easy to use [zl ecils] to control poly~ target
    outlet(2, sequenceValues, patternIndex+1, trackIndex+1);
  });
}

function load(pattrPath) {
  // pattrPath looks like "track.1::pattern.1::sequence"
  var matches = /^track\.(\d)::pattern\.(\d)::sequence$/.exec(pattrPath);
  if(matches) {
    var trackNumber = parseInt(matches[1]);
    var patternNumber = parseInt(matches[2]);
    var sequenceValues = Array.prototype.slice.call(arguments, 1); // all the arguments after the first one
    controller.setPattern(trackNumber-1, patternNumber-1, sequenceValues);
  }
}

//==========================================================================
// TODO: comment out when not developing
log('\nrefreshed '+(new Date()).toString());
bang();