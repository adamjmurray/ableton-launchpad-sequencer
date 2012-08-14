function include(n){var f=new File(n),t=[],e=f.eof,i=0;if(f.isopen){for(;i<e;i++)t+=f.readchars(1);f.close();eval(t+'');}else error("Missing required file: "+n);}
include('class.js');
include('launchpad.js');
include('sequencer.js');

log=function(msg){post(msg+'\n');};
//==========================================================================

launchpad = new Launchpad();
launchpad.allOff();

seq = new Sequencer(launchpad,0);

function notein(pitch,velocity) {
  launchpad.notein(pitch,velocity);
}

function ctlin(cc,val) {
  launchpad.ctlin(cc,val);  
}

function toggleGrid(x,y,stepIndex) {
  var oldValue = seq.get(stepIndex);
  var newValue = 3 - oldValue;
  seq.set(stepIndex,newValue);
  launchpad.grid(x,y,newValue);
}

launchpad.on('gridDown', toggleGrid);
// launchpad.on('gridUp', toggleGrid);

launchpad.on('rightDown', function(i) { launchpad.right(i,[0,3])});
launchpad.on('rightUp', function(i) { launchpad.right(i)});

launchpad.on('topDown', function(i) { launchpad.top(i,[2,2])});
launchpad.on('topUp', function(i) { launchpad.top(i)});


//==========================================================================
log('\nrefreshed '+(new Date()).toString());
