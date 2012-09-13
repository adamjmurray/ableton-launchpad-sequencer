class GUI

  @GRID_COLORS = [ # Max's LCD object expects [R,G,B] in 0-255 range
    [150,150,150] # off
    [0,255,0]     # green
    [255,255,0]   # yellow
    [255,127,0]   # orange
    [255,0,0]     # red
    [80,130,200]  # current step
  ]

  track: (trackIndex) ->
    outlet(5, trackIndex)
    return

  stepValue: (stepValue) ->
    outlet(6, stepValue)
    return

  pattern: (patternIndex) ->
    outlet(7, patternIndex)
    return

  grid: (x, y, value) ->
    left = x*GUI_STEP_WIDTH + 2
    top  = y*GUI_STEP_WIDTH + 2
    outlet(8, 'frgb', GUI.GRID_COLORS[value])
    outlet(8, 'paintrect', left, top, left+13, top+13)
    return

  activeStep: (x, y) ->
    @grid(x, y, 5)
    return

  clearGrid: ->
    outlet(8, 'clear')
    return

  trackInfo: (trackIndex, track) ->
    trackNumber = trackIndex + 1
    outlet(9, trackNumber, track.basePitch, track.baseVelocity, track.durationScale)
    return

  patternInfo: (patternIndex, pattern) ->
    # values in the Max GUI are numbers counting from 1, hence all the "+1"s
    outlet(10, patternIndex+1, pattern.type, pattern.start+1, pattern.end+1)
    return
