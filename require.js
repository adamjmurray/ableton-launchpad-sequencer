function require(n){var f=new File(n),t=[],e=f.eof,i=0;if(f.isopen){for(;i<e;i++)t+=f.readchars(1);f.close();eval(t+'');}else error("Missing required file: "+n);}

require('log.js');
require('class.js');
require('launchpad.js');


lp = new Launchpad;

function notein(pitch,velocity) {
  lp.notein(pitch,velocity);
}

function ctlin(cc,val) {
  lp.ctlin(cc,val);  
}

lp.on('screenUp', function(screenIndex) {
  lp.allOff();
});

lp.on('modeDown', function(screenIndex) {
  lp.allOn();
});


lp.on('gridDown', function(x,y) {
  this.gridButton(x,y,3);
});

lp.on('gridUp', function(x,y) {
  this.gridButton(x,y);
});



//=====================================
log('\nrefreshed '+(new Date()).toString());
