# A subset of the 12-note chromatic scale.
# Determines which notes are used in the "scale +" and "scale -" patterns.
class Scale

  constructor: ->
    @steps = [0...12] # full chromatic scale by default

  pitchOffset: (scaleStep) ->
    scaleLength = @steps.length
    octave = 12 * Math.floor(scaleStep/scaleLength)
    index = scaleStep % scaleLength
    index += scaleLength if index < 0 # support negative indexes
    @steps[index] + octave
