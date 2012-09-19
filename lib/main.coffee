#========================================================
# Intialize the application

launchpad = new Launchpad
sequencer = new Sequencer(launchpad)
storage   = new Storage(sequencer)


#==============================================================
# Handlers for input from Max.
# Each method below handles the Max messages of the same name

bang  = ->
  sequencer.redraw()
  return

reset = ->
  sequencer.reset()
  return


notein = (pitch, velocity) ->
  launchpad.notein(pitch, velocity)
  return

ctlin = (cc, val) ->
  if cc != TRANSPORT_STOP
    launchpad.ctlin(cc, val)
  else
    sequencer.setClock(-1)
    # Live sends "all notes off" to all connected MIDI devices when the transport stops,
    # which resets the Launchpad, so we need to re-sync the state:
    sequencer.drawLaunchpad()
    save() # this is a good time to save state without affecting realtime audio performance
  return


clock = (bars,beats,units) ->
  # assume 4/4 with 1/16 note pulses
  clockIndex = (bars-1)*16 + (beats-1)*4 + Math.round(units/120)
  sequencer.setClock(clockIndex)
  return


track = (trackIndex) ->
  sequencer.selectTrack(trackIndex)
  return

stepValue = (value) ->
  sequencer.selectValue(value)
  return

pattern = (patternIndex) ->
  sequencer.selectPattern(patternIndex)
  return

grid = (x,y) ->
  sequencer.setGridValue(x,y)
  return


# track properties
basePitch = (pitch) ->
  sequencer.selectedTrack.basePitch = pitch
  return

baseVelocity = (velocity) ->
  sequencer.selectedTrack.baseVelocity = velocity
  return

durationScale = (scale) ->
  sequencer.selectedTrack.durationScale = scale
  return

trackMute = (mute) ->
  sequencer.muteSelectedTrack(mute)
  return


# pattern properties
startStep = (stepNumber)->
  sequencer.selectedPattern.setStart(stepNumber-1)
  sequencer.drawPatternInfo()
  return

endStep = (stepNumber) ->
  sequencer.selectedPattern.setEnd(stepNumber-1)
  sequencer.drawPatternInfo()
  return

patternType = (type) ->
  sequencer.selectedPattern.setType(type)
  return

patternMute = (mute) ->
  sequencer.muteSelectedPattern(mute)
  return


# pattern actions
clear = ->
  sequencer.selectedPattern.clear()
  sequencer.drawGrid()
  return

random = ->
  sequencer.selectedPattern.random()
  sequencer.drawGrid()
  return

copy = ->
  storage.copyPattern(sequencer.selectedPattern)
  return

paste = ->
  storage.pastePattern(sequencer.selectedPattern)
  sequencer.drawGrid()
  return


save = ->
  storage.save()
  return

load = (path, values...) ->
  storage.load(path, values...)
  return


#==============================================================
# Debugging stuff

log 'reloaded at: ' + new Date
