# A subset of the 12-note chromatic scale.
# Determines which notes are used in the "scale +" and "scale -" patterns.
class Scale

  constructor: ->
    @_steps = [0...12] # full chromatic scale by default
    @_memo = {} # we memoize for performance

  setSteps: (steps) ->
    @_steps = steps
    @_memo = {}

  getSteps: -> @_steps
    
  overrideStep: (step, enabled) ->
    if enabled
      if not @_stepsCopy? # backup the original scale
        @_stepsCopy = @_steps[..]
        @_steps = []

      index = @_steps.indexOf(step)
      if index < 0
        @_steps.push step

    else
      index = @_steps.indexOf(step)
      if index >= 0
        @_steps.splice(index, 1)
        if @_steps.length == 0 # restore the original scale when no more overrides
          @_steps = @_stepsCopy
          @_stepsCopy = null

    @_memo = {}
    return


  map: (pitch, scaleOffset) ->
    return pitch if scaleOffset == 0

    memoIdx = pitch + 128 * scaleOffset
    memoVal = @_memo[memoIdx]
    return memoVal if memoVal?
    
    scaleLength = @_steps.length
    if scaleLength == 0
      # no scale, just add (or subtract) octaves
      mappedVal = pitch + 12 * scaleOffset

    else
      octave = Math.floor(pitch / 12) * 12
      pitchClass = pitch % 12

      # find the nearest pitch class in the scale that's not higher than the given pitch's pitch class
      found = false
      for pc,index in @_steps
        if pc == pitchClass
          found = true
          break
        if pc > pitchClass
          found = true
          index -= 1 if scaleOffset > 0 # we went one past
          break

      # TODO: I think maybe index should be 0 if scaleOffset < 0 in this case?
      index -= 1 if not found and scaleOffset > 0 # went one past

      index += scaleOffset
      octave += 12 * Math.floor(index/scaleLength)

      index %= scaleLength
      index += scaleLength if index < 0 # support negative indexes

      mappedVal = @_steps[index] + octave

    @_memo[memoIdx] = mappedVal
    return mappedVal

    # Using a singleton scale simplifies some of the code.
Scale.instance = new Scale