# The code in this file redirects all incoming messages from the Max patcher to an appropriate controller method.

#--------------------------------------------------------------
# Core Max messages
#
bang  = ->
  sequencerController.redraw()
  return

reset = ->
  sequencerController.reset()
  return

#--------------------------------------------------------------
# Launchpad MIDI in
#
notein = (pitch, velocity) ->
  launchdpadController.notein(pitch, velocity)
  return

ctlin = (cc, val) ->
  if cc != TRANSPORT_STOP
    launchdpadController.ctlin(cc, val)
  else
    sequencerController.stop()
    save() # this is a good time to save state without affecting realtime audio performance
  return

#--------------------------------------------------------------
# Live Track MIDI in
#
note = (pitch, velocity) ->
  midiController.note(pitch, velocity)
  return

#--------------------------------------------------------------
# Global
#
stepLength = (stepLength) ->
  sequencerController.setStepLength(stepLength);
  return

clock = (clockIndex) ->
  sequencerController.setClock(clockIndex)
  return

scale = (scaleSteps...) ->
  sequencerController.setScale(scaleSteps)
  return

#--------------------------------------------------------------
# GUI Launchpad Buttons
#
track = (trackIndex) ->
  sequencerController.selectTrack(trackIndex)
  return

stepValue = (value) ->
  sequencerController.selectValue(value)
  return

pattern = (patternIndex) ->
  sequencerController.selectPattern(patternIndex)
  return

grid = (x,y) ->
  sequencerController.setGridValue(x,y)
  return

#--------------------------------------------------------------
# Track Settings
#
basePitch = (pitch) ->
  sequencerController.setSelectedTrackPitch(pitch)
  return

baseVelocity = (velocity) ->
  sequencerController.setSelectedTrackVelocity(velocity)
  return

durationScale = (scale) ->
  sequencerController.setSelectedTrackDurationScale(scale)
  return

trackMute = (mute) ->
  sequencerController.setSelectedTrackMute(mute)
  return

trackMultiplier = (multiplier) ->
  sequencerController.setSelectedTrackStepLengthMultiplier(multiplier)
  return

#--------------------------------------------------------------
# Pattern Settings
#
startStep = (stepNumber)->
  sequencerController.setSelectedPatternStartStep(stepNumber-1)
  return

endStep = (stepNumber) ->
  sequencerController.setSelectedPatternEndStep(stepNumber-1)
  return

patternType = (type) ->
  sequencerController.setSelectedPatternType(type)
  return

patternMute = (mute) ->
  sequencerController.setSelectedPatternMute(mute)
  return

#--------------------------------------------------------------
# Pattern Operations
#
random = ->
  sequencerController.random()
  return

randomFill = ->
  sequencerController.randomFill()
  return

randomThin = ->
  sequencerController.randomFill(0)
  return

fill = ->
  sequencerController.fill()
  return

clear = ->
  sequencerController.fill(0)
  return

firstColumn = ->
  sequencerController.firstColumn()
  return

reverse = ->
  sequencerController.reverse()
  return

replace = ->
  sequencerController.replace()
  return

shiftleft = ->
  sequencerController.rotate(1)
  return

shiftup = ->
  sequencerController.rotate(ROW_LENGTH)
  return

shiftright = ->
  sequencerController.rotate(-1)
  return

shiftdown = ->
  sequencerController.rotate(-ROW_LENGTH)
  return

#--------------------------------------------------------------
# Persistence
#
copy = ->
  sequencerController.copyPattern()
  return

paste = ->
  sequencerController.pastePattern()
  return

save = ->
  storageController.save()
  return

load = (path, values...) ->
  storageController.load(path, values...)
  return

importFile = (filepath) ->
  storageController.import(filepath)
  return

exportFile = (filepath) ->
  storageController.export(filepath)
  return
