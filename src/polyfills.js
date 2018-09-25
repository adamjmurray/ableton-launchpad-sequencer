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
