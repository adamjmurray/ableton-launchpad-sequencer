

#========================================================
# Output to Max

outlets = 11


#sequencerOut = function(pitch, velocity, duration) {
#duration *= 250; // TODO: figure out how to sync with tempo
#outlet(2, pitch, velocity, duration);
#};
#
#trackPattrOut = function(trackIndex, track) {
#// The Max patcher uses numbers (count from 1) instead of indexes.
#// We also reverse the order so it's easy to use [zl ecils] to control poly~ target
#outlet(3, track.basePitch, trackIndex+1);
#};
#
#patternPattrOut = function(trackIndex, patternIndex, pattern) {
#// The Max patcher uses numbers (count from 1) instead of indexes.
#// We also reverse the order so it's easy to use [zl ecils] to control poly~ target
#outlet(4, pattern.type, pattern.start, pattern.end, pattern.sequence, patternIndex+1, trackIndex+1);
#};


#========================================================

# gui = new GUI();
launchpad = new Launchpad
launchpad.noteout = (pitch, velocity) -> outlet(0, pitch, velocity)
launchpad.ctlout = (cc, value) -> outlet(1, cc, value)


launchpad.onGridDown = (x,y) ->
  launchpad.grid(x, y, Launchpad.color(3,3))
#sequencer = new Sequencer(launchpad, sequencerOut, gui);


#========================================================
# Input from Max


notein = (pitch, velocity) -> launchpad.notein(pitch, velocity)


ctlin = (cc, val) ->
#  if(cc === TRANSPORT_STOP) {
#    // Live sends "all notes off" to all connected MIDI devices when the transport stops,
#    // which resets the Launchpad, so we need to re-sync the state:
#  sequencer.setClock(-1);
#    sequencer.redraw();
#
#    // Also use this as an opportunity to record the sequencer state without affecting realtime audio performance
#    save();
#} else {
  launchpad.ctlin(cc, val)


launchpad.allOff()
log 'reloaded at: ' + new Date