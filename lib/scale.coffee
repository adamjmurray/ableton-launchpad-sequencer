# A subset of the 12-note chromatic scale.
# Determines which notes are used in the "scale +" and "scale -" patterns.
class Scale

  constructor: ->
    @steps = [0...12] # full chromatic scale by default


  map: (pitch, scaleOffset) ->
    return pitch if scaleOffset == 0

    scaleLength = @steps.length
    if scaleLength == 0
      # no scale, just add (or subtract) octaves
      pitch + 12 * scaleOffset

    else
      octave = Math.floor(pitch / 12) * 12
      pitchClass = pitch % 12

      # find the nearest pitch class in the scale that's not higher than the given pitch's pitch class
      found = false
      for pc,index in @steps
        if pc == pitchClass
          found = true
          break
        if pc > pitchClass
          found = true
          index -= 1 if scaleOffset > 0 # we went one past
          break

      index -= 1 if not found and scaleOffset > 0 # went one past

      index += scaleOffset
      octave += 12 * Math.floor(index/scaleLength)

      index %= scaleLength
      index += scaleLength if index < 0 # support negative indexes

      @steps[index] + octave


# Using a singleton scale simplifies some of the code.
Scale.instance = new Scale