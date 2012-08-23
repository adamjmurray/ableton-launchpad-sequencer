//========================================================
// Dependencies

function include(n){var f=new File(n),t=[],e=f.eof,i=0;if(f.isopen){for(;i<e;i++)t+=f.readchars(1);f.close();eval(t+'');}else error("Missing required file: "+n+"\n");}

include('class.js');
include('gui.js');
include('launchpad.js');
include('pattern.js');
include('track.js');
include('sequencer.js');

log=function(msg){post(msg+'\n');};

//========================================================
// Constants

TRANSPORT_STOP = 123;
GUI_STEP_WIDTH = 19;

TRACKS= 4;
PATTERNS = 8; // patterns per track
STEPS = 64;   // sequencer steps per pattern
ROW_LENGTH = 8; // steps per row in the grid


//========================================================
// Output to Max

outlets = 11;

noteOut = function(note, velocity) {
  outlet(0, note, velocity);
};

ctlOut = function(cc, value) {
  outlet(1, cc, value);
};

sequencerOut = function(pitch, velocity, duration) {
  duration *= 250; // TODO: figure out how to sync with tempo
  outlet(2, pitch, velocity, duration);
};

trackPattrOut = function(trackIndex, track) {
  // The Max patcher uses numbers (count from 1) instead of indexes.
  // We also reverse the order so it's easy to use [zl ecils] to control poly~ target
  outlet(3, track.basePitch, trackIndex+1);
};

patternPattrOut = function(trackIndex, patternIndex, pattern) {
  // The Max patcher uses numbers (count from 1) instead of indexes.
  // We also reverse the order so it's easy to use [zl ecils] to control poly~ target
  outlet(4, pattern.type, pattern.start, pattern.end, pattern.sequence, patternIndex+1, trackIndex+1);
};


//========================================================

gui = new GUI();
launchpad = new Launchpad(noteOut, ctlOut);
sequencer = new Sequencer(launchpad, sequencerOut, gui);


//========================================================
// Input from Max

function bang() { // (re)initialize on bang
  sequencer.redraw();
}

function factoryReset() {
  sequencer.factoryReset();
}

function notein(pitch,velocity) {
  launchpad.notein(pitch,velocity);
}

function ctlin(cc,val) {
  if(cc === TRANSPORT_STOP) {
    // Live sends "all notes off" to all connected MIDI devices when the transport stops,
    // which resets the Launchpad, so we need to re-sync the state:
    sequencer.setClock(-1);
    sequencer.redraw();

    // Also use this as an opportunity to record the sequencer state without affecting realtime audio performance
    save();

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

function grid(x,y) {
  sequencer.setGridValue(x,y);
}

/**
 * sets the basePitch for the current track
 */
function basePitch(pitch) {
  sequencer.selectedTrack.basePitch = pitch;
}

function startStep(stepNumber) {
  // set current pattern's starting step index
  sequencer.selectedPattern.setStart(stepNumber-1);
}

function endStep(stepNumber) {
  // set current pattern's ending step index
  sequencer.selectedPattern.setEnd(stepNumber-1);
}

function clock(bars,beats,units) {
  // assume 4/4 with 1/16 note pulses
  var clockIndex = (bars-1)*16 + (beats-1)*4 + Math.round(units/120);
  sequencer.setClock(clockIndex);
}

function load(pattrPath) {
  // pattrPaths look like:
  // track.1::basePitch 60.
  // track.1::pattern.1::sequence 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
  // track.1::pattern.1::ptype gate
  // track.1::pattern.1::start 0
  // track.1::pattern.1::end 63

  var matches =/^track\.(\d+)::(.*)/.exec(pattrPath);
  if(matches) {
    var trackIndex = parseInt(matches[1]) - 1,
        track = sequencer.tracks[trackIndex],
        subpath = matches[2],
        values = Array.prototype.slice.call(arguments, 1); // all the arguments after the first one
    if(!track) return;

    if(subpath === 'basePitch') {
      track.basePitch = parseInt(values[0]);
    }
    else {
      matches = /^pattern\.(\d+)::(.*)/.exec(subpath);
      if(matches) {
        var patternIndex = parseInt(matches[1]) - 1,
            pattern = track.patterns[patternIndex],
            property = matches[2];
        if(!pattern) return;

        switch(property) {
          case 'ptype':    pattern.setType(values[0]);  break;
          case 'start':    pattern.setStart(values[0]);  break;
          case 'end':      pattern.setEnd(values[0]);  break;
          case 'sequence': sequencer.setPattern(trackIndex, patternIndex, values); break;
        }
      }
    }
  }
  else if(pattrPath == 'dump') { // dump done
    sequencer.redraw();
  }
}


function save() {
  sequencer.writeState(trackPattrOut, patternPattrOut);
}

//========================================================
// TODO: comment out when not developing
log('\nrefreshed '+(new Date()).toString());
