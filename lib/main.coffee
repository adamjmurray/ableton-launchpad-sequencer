#========================================================
# Intialize the application

launchpad = new Launchpad
launchpad.noteout = (pitch, velocity) -> outlet(0, pitch, velocity)
launchpad.ctlout  = (cc, value)       -> outlet(1, cc, value)

sequencer = new Sequencer(launchpad)
launchpad.onRightDown = (idx) -> sequencer.selectPattern(idx)
launchpad.onGridDown  = (x,y) -> sequencer.setGridValue(x,y)
launchpad.onTopDown   = (idx) -> if idx <= 3 then sequencer.selectTrack(idx) else sequencer.selectValue(idx-3)

storage = new Storage(sequencer)


#==============================================================
# Handlers for input from Max.
# Each method below handles the Max messages of the same name

bang  = -> sequencer.redraw()
reset = -> sequencer.reset()


notein = (pitch, velocity) ->
  launchpad.notein(pitch, velocity)

ctlin = (cc, val) ->
  if cc != TRANSPORT_STOP
    launchpad.ctlin(cc, val)
  else
    sequencer.setClock(-1)
    # Live sends "all notes off" to all connected MIDI devices when the transport stops,
    # which resets the Launchpad, so we need to re-sync the state:
    sequencer.drawLaunchpad()
    save() # this is a good time to save state without affecting realtime audio performance


clock = (bars,beats,units) ->
  # assume 4/4 with 1/16 note pulses
  clockIndex = (bars-1)*16 + (beats-1)*4 + Math.round(units/120)
  sequencer.setClock(clockIndex)


track     = (trackIndex)   -> sequencer.selectTrack(trackIndex)
stepValue = (value)        -> sequencer.selectValue(value)
pattern   = (patternIndex) -> sequencer.selectPattern(patternIndex)
grid      = (x,y)          -> sequencer.setGridValue(x,y)

# track properties
basePitch     = (pitch)    -> sequencer.selectedTrack.basePitch = pitch
baseVelocity  = (velocity) -> sequencer.selectedTrack.baseVelocity = velocity
durationScale = (scale)    -> sequencer.selectedTrack.durationScale = scale

# pattern properties
startStep = (stepNumber)   -> sequencer.selectedPattern.setStart(stepNumber-1)
endStep   = (stepNumber)   -> sequencer.selectedPattern.setEnd(stepNumber-1)
patternType = (type)       -> sequencer.selectedPattern.setType(type)

# pattern actions
clear = -> sequencer.selectedPattern.clear(); sequencer.drawGrid()

save = ()                  -> storage.save()
load = (path, values...)   -> storage.load(path, values...)


#==============================================================
# Debugging stuff

log 'reloaded at: ' + new Date
