function include(n){var f=new File(n),t=[],e=f.eof,i=0;if(f.isopen){for(;i<e;i++)t+=f.readchars(1);f.close();eval(t+'');}else error("Missing required file: "+n);}
include('class.js');
include('launchpad.js');
include('sequencer.js');
include('controller.js');

log=function(msg){post(msg+'\n');};

//==========================================================================

launchpad = new Launchpad();
new Controller(launchpad);

function notein(pitch,velocity) {
  launchpad.notein(pitch,velocity);
}

function ctlin(cc,val) {
  launchpad.ctlin(cc,val);  
}

//==========================================================================

log('\nrefreshed '+(new Date()).toString());
