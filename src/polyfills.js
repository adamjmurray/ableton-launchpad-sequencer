if (typeof console === 'undefined') {
  const logToMaxConsoleWith = log => (...values) => {
    values.forEach(message => {
      if (message && message.toString) {
        var s = message.toString();
        if (s.indexOf("[object ") >= 0) {
          s = JSON.stringify(message);
        }
        log(s);
      }
      else if (message === null) {
        log("<null>");
      }
      else {
        log(message);
      }
    });
    log("\n");
  }

  console = {
    log: logToMaxConsoleWith((string) => post(string)),
    error: logToMaxConsoleWith((string) => error(string)),
  };
}


// modulo function that always returns a positive number
Number.prototype.mod = function(divisor) {
  const value = this % divisor;
  return value >= 0 ? value : value + divisor;
};

Array.prototype.fill = function(value) {
  for (var i = 0; i < this.length; i++) {
    this[i] = value;
  }
}

Array.prototype.includes = function(value) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === value) return true;
  }
  return false;
}
