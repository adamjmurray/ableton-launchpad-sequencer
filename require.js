function include(n){var f=new File(n),t=[],e=f.eof,i=0;if(f.isopen){for(;i<e;i++)t+=f.readchars(1);f.close();eval(t+'');}else error("Missing required file: "+n);}
include('log.js');
include('class.js');
include('launchpad.js');
include('sequencer.js');
//==========================================================================

lp = new Launchpad();
lp.allOff();

seq = new Sequencer(lp,0);

function notein(pitch,velocity) {
  lp.notein(pitch,velocity);
}

function ctlin(cc,val) {
  lp.ctlin(cc,val);  
}

function toggleGrid(x,y,stepIndex) {
  var oldValue = seq.get(stepIndex);
  var newValue = 3 - oldValue;
  seq.set(stepIndex,newValue);
  lp.grid(x,y,newValue);
}

lp.on('gridDown', toggleGrid);
// lp.on('gridUp', toggleGrid);

lp.on('sceneDown', function(i) { lp.scene(i,[0,3])});
lp.on('sceneUp', function(i) { lp.scene(i)});

lp.on('arrowDown', function(i) { lp.arrow(i,[2,3])});
lp.on('arrowUp', function(i) { lp.arrow(i)});

lp.on('modeDown', function(i) { lp.mode(i,[3,2])});
lp.on('modeUp', function(i) { lp.mode(i)});


//==========================================================================
log('\nrefreshed '+(new Date()).toString());
