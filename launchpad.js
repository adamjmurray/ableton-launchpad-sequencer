this.note = function(note,velocity) {
  var pressed = (velocity > 0),
      x = note % 16,
      y = Math.floor(note / 16),
      gridIndex = x + y*8,
      evt = pressed ? 'down' : 'up';

  if(x > 7) {
    log(evt + ": track " + y);
  } else {
    log(evt + ": grid " + gridIndex + " (" + x + "," + y + ")");
  }
};

this.ctl = function(cc,val) {
  var pressed = (val > 0),
      index = (cc-104),
      evt = pressed ? 'down' : 'up';

  if(index < 4) {
    log(evt + ": screen " + index);
  } else {
    index -= 4;
    log(evt + ": mode " + index);
  }
};

