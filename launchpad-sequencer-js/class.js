this.Class = {
  define: function(definition) {
    var constructor = definition.init || function(){};
    // TODO: support multiple arguments, for inheritence/mixin
    for(var property in definition) constructor.prototype[property] = definition[property];
    return constructor;
  }
};
