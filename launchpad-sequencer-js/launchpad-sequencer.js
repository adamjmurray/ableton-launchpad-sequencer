outlets = 3;

function include(n){var f=new File(n),t=[],e=f.eof,i=0;if(f.isopen){for(;i<e;i++)t+=f.readchars(1);f.close();eval(t+'');}else error("Missing required file: "+n+"\n");}
include('class.js');
include('launchpad.js');
include('sequencer.js');
include('controller.js');

log=function(msg){post(msg+'\n');};

//==========================================================================

launchpad = new Launchpad();
controller = new Controller(launchpad);

function notein(pitch,velocity) {
  launchpad.notein(pitch,velocity);
}

function ctlin(cc,val) {
  if(cc === 123) { // All notes off. Live sends this when the transport is stopped
    // Live also sends all-notes-off to all connected MIDI devices, which resets the Launchpad,
    // so we need to restore the state:
    controller.reset();
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

//==========================================================================
// TODO: comment out when not developing
log('\nrefreshed '+(new Date()).toString());
bang();