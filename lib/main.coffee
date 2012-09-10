#========================================================
# Intialize the objects

gui = new GUI()

launchpad = new Launchpad
launchpad.noteout = (pitch, velocity) -> outlet(0, pitch, velocity)
launchpad.ctlout = (cc, value) -> outlet(1, cc, value)

sequencer = new Sequencer(launchpad, gui,
  (pitch, velocity, duration) ->
    duration *= 250 # TODO: figure out how to sync with tempo
    outlet(2, pitch, velocity, duration)
)
launchpad.onRightDown = (idx) -> sequencer.selectPattern(idx)
launchpad.onGridDown = (x,y) -> sequencer.setGridValue(x,y)
launchpad.onTopDown = (index) ->
  if index <= 3 # left 4 top buttons
    sequencer.selectTrack(index)
  else # right 4
    sequencer.selectValue(index-3)

pattr = new Pattr(sequencer)


#========================================================
# Setup I/O with Max

bang = -> sequencer.redraw()
factoryReset = -> sequencer.factoryReset()

notein = (pitch, velocity) -> launchpad.notein(pitch, velocity)
ctlin = (cc, val) ->
  if cc == TRANSPORT_STOP
    sequencer.setClock(-1)

    # Live sends "all notes off" to all connected MIDI devices when the transport stops,
    # which resets the Launchpad, so we need to re-sync the state:
    sequencer.drawLaunchpad()
    # sequencer.redraw() # this is slower

    # Also use this as an opportunity to record the sequencer state without affecting realtime audio performance
    save()
  else
    launchpad.ctlin(cc, val)


track = (trackIndex) -> sequencer.selectTrack(trackIndex)

stepValue = (value) -> sequencer.selectValue(value)

pattern = (patternIndex) -> sequencer.selectPattern(patternIndex)

grid = (x,y) -> sequencer.setGridValue(x,y)

basePitch = (pitch) -> sequencer.selectedTrack?.basePitch = pitch

startStep = (stepNumber) -> sequencer.selectedPattern.setStart(stepNumber-1)

endStep = (stepNumber) -> sequencer.selectedPattern.setEnd(stepNumber-1)


clock = (bars,beats,units) ->
  # assume 4/4 with 1/16 note pulses
  clockIndex = (bars-1)*16 + (beats-1)*4 + Math.round(units/120)
  sequencer.setClock(clockIndex)


save = -> pattr.save()

load = (pattrPath, values...) -> pattr.load(pattrPath, values...)


log 'reloaded at: ' + new Date