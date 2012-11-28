
launchpad = new Launchpad
sequencer = new Sequencer(launchpad)
storage   = new Storage(sequencer)
controller= new Controller(sequencer)

#==============================================================
# Handlers for input from Max.
# Each method below handles the Max messages of the same name
#
#--------------------------------------------------------------
#  Init
bang  = ->
  sequencer.redraw()
  return

reset = ->
  sequencer.reset()
  return

#--------------------------------------------------------------
# Launchpad MIDI in
#
notein = (pitch, velocity) ->
  launchpad.notein(pitch, velocity)
  return

ctlin = (cc, val) ->
  if cc != TRANSPORT_STOP
    launchpad.ctlin(cc, val)
  else
    sequencer.stop()
    save() # this is a good time to save state without affecting realtime audio performance
  return

#--------------------------------------------------------------
# Live Track MIDI in
#
note = (pitch, velocity) ->
  controller.note(pitch, velocity)
  return

#--------------------------------------------------------------
# Global
#
stepLength = (stepLength) ->
  sequencer.stepLength = stepLength
  return

clock = (clockIndex) ->
  sequencer.setClock(clockIndex)
  return
  
scale = (scaleSteps...) ->
  scaleSteps = [] if scaleSteps[0] == -1 # special case message for empty scale
  sequencer.scale.setSteps(scaleSteps)
  return

#--------------------------------------------------------------
# GUI Launchpad Buttons 
#
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

#--------------------------------------------------------------
# Track Settings
#
basePitch = (pitch) ->
  sequencer.selectedTrack.pitch = pitch
  return

baseVelocity = (velocity) ->
  sequencer.selectedTrack.velocity = velocity
  return

durationScale = (scale) ->
  sequencer.selectedTrack.duration = scale
  return

trackMute = (mute) ->
  sequencer.muteSelectedTrack(mute)
  return

trackMultiplier = (multiplier) ->
  sequencer.selectedTrack.multiplier = multiplier
  return

#--------------------------------------------------------------
# Pattern Settings
#
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

#--------------------------------------------------------------
# Pattern Operations
#
random = ->
  sequencer.random()
  return

randomFill = ->
  sequencer.randomFill()
  return

randomThin = ->
  sequencer.randomFill(0)
  return

fill = ->
  sequencer.fill()
  return

clear = ->
  sequencer.fill(0)
  return

firstColumn = ->
  sequencer.firstColumn()
  return

reverse = ->
  sequencer.reverse()
  return

replace = ->
  sequencer.replace()
  return

shiftleft = ->
  sequencer.rotate(1)
  return

shiftup = ->
  sequencer.rotate(ROW_LENGTH)
  return

shiftright = ->
  sequencer.rotate(-1)
  return

shiftdown = ->
  sequencer.rotate(-ROW_LENGTH)
  return

#--------------------------------------------------------------
# Persistence
#
copy = ->
  sequencer.copyPattern()
  return

paste = ->
  sequencer.pastePattern()
  return

save = ->
  storage.save()
  return

load = (path, values...) ->
  storage.load(path, values...)
  return

importFile = (filepath) ->
  storage.import(filepath)
  return

exportFile = (filepath) ->
  storage.export(filepath)
  return


#==============================================================
# Debugging stuff

console.log 'reloaded at: ' + new Date
