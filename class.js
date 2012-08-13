this.class = function(d) {
  var c = d.init || function(){};
  // I think hasOwnProperty will be false in inheritence/mixin situations, not what I want...
  // TODO: support multiple arguments, for inheritence/mixin
  for(var p in d) /*if(d.hasOwnProperty(p))*/ c.prototype[p] = d[p];
  return c;
}

/*
Bar = class({
  init: function(v) {
    this.val = v;
  },
  baz: function() {
    log('in baz!')
    log(this.val)
    this.bam(this.val);
  },
  bam: function(v) {
    log(v+v)
  }
});

var bar1 = new Bar(123);
for(p in Bar.prototype) {
  if(Bar.hasOwnProperty(p)) {
    log("IN: " + p)
  } else log("OUT: " + p)
}
var bar2 = new Bar('asdf');

bar1.baz();
bar2.baz();

*/