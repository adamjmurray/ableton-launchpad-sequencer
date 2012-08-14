this.class = function(d) {
  var c = d.init || function(){};
  // TODO: support multiple arguments, for inheritence/mixin
  for(var p in d) c.prototype[p] = d[p];
  return c;
}
