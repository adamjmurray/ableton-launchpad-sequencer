class GUI

  @GRID_COLORS = [ # Max's LCD object expects [R,G,B] in 0-255 range
    [150,150,150] # off
    [0,255,0]     # green
    [255,255,0]   # yellow
    [255,127,0]   # orange
    [255,0,0]     # red
    [80,130,200]  # current step
  ]

  @START_END_COLOR = [200,200,255]
  @TRANSPARENT = [0,0,0,255]

  constructor:->
    @oldlines = []

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
    @color GUI.GRID_COLORS[value]
    outlet 8, 'paintrect', left, top, left+GUI_BUTTON_WIDTH, top+GUI_BUTTON_WIDTH
    return

  activeStep: (x, y) ->
    @grid x, y, 5
    return

  clearGrid: ->
    outlet 8, 'clear'
    return

  trackInfo: (trackIndex, track) ->
    trackNumber = trackIndex + 1
    outlet(9, trackNumber, track.basePitch, track.baseVelocity, track.durationScale)
    return

  patternInfo: (patternIndex, pattern) ->
    # values in the Max GUI are numbers counting from 1, hence all the "+1"s
    start = pattern.start
    end = pattern.end
    outlet 10, patternIndex+1, pattern.type, start+1, end+1

    # start end/step indicators:
    delta = GUI_BUTTON_WIDTH + 3
    startX = (start % 8)*GUI_STEP_WIDTH
    startY = Math.floor(start/8)*GUI_STEP_WIDTH
    endX   = (end % 8)*GUI_STEP_WIDTH
    endY   = Math.floor(end/8)*GUI_STEP_WIDTH

    lines = [
      [startX + delta, startY, startX, startY]
      [startX, startY, startX, startY + delta]
      [startX, startY + delta, startX + delta, startY + delta]
      [endX, endY, endX + delta, endY]
      [endX + delta, endY, endX + delta, endY + delta]
      [endX + delta, endY + delta, endX, endY + delta]
    ]

    @color GUI.TRANSPARENT
    @drawline(line) for line in @oldlines
    @color GUI.START_END_COLOR
    @drawline(line) for line in lines
    @oldlines = lines
    return


  color: (color) ->
    outlet 8, 'frgb', color
    return

  drawline: (line) ->
    outlet 8, 'linesegment', line
    return
