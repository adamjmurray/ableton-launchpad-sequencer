class LaunchpadController

  # Pattern "Ops" modes
  @LENGTH_MODE: 0 # pattern start/end (length)
  @STEPS_MODE: 1  # pattern step values

  constructor: (@launchpad, @sequencerController) ->
    @heldTop     = null # top button held down (only the first is recorded if there are multiple held down).
    @heldGridX   = null # x index of grid button held down (only the first is recorded if there are multiple held down).
    @heldGridY   = null # y index of grid button held down (only the first is recorded if there are multiple held down).
    @heldGridXLatest = null # the most recently held down grid button
    @heldGridYLatest = null # the most recently held down grid button
    @trackMultiPress = 0
    @patternMultiPress = 0


  ctlin: (cc, value) ->
    index = cc - 104
    if value > 0
      @_onTopDown(index)
      @heldTop = index unless @heldTop?
    else
      # @_onTopUp(index)
      @heldTop = null if @heldTop == index
    return


  notein: (pitch, velocity) ->
    x = pitch % 16
    y = Math.floor(pitch / 16)
    if x > 7
      if velocity > 0 then @_onRightDown(y) # else @_onRightUp(y)
    else
      if velocity > 0
        @_onGridDown(x,y)
        @heldGridXLatest = x
        @heldGridYLatest = y
        unless @heldGridX?
          @heldGridX = x
          @heldGridY = y
      else
        # @_onGridUp(x,y)
        if @heldGridXLatest == x and @heldGridYLatest == y
          @heldGridXLatest = null
          @heldGridYLatest = null
        if @heldGridX == x and @heldGridY == y
          @heldGridX = @heldGridXLatest
          @heldGridY = @heldGridYLatest
    return



  # ==============================================================================
  # private

  # Launchpad button event handlers
  _onTopDown: (buttonIndex) ->
    @patternMultiPress = 0
    if @patternOpsMode
      # shift up, down, left, right, copy, paste, length mode, steps modes
      switch buttonIndex
        when 0 then @sequencerController.rotate(8)
        when 1 then @sequencerController.rotate(-8)
        when 2 then @sequencerController.rotate(1)
        when 3 then @sequencerController.rotate(-1)
        when 4 then @sequencerController.reverse()
        when 5 then @sequencerController.invert()
        when 6 then @sequencerController.copyPattern()
        when 7 then @sequencerController.pastePattern()

    else if buttonIndex <= 3
      if @sequencerController.track == buttonIndex # track already selected
        @trackMultiPress += 1
        if @trackMultiPress >= 3
          @trackMultiPress = 0
          @sequencerController.toggleSelectedTrackMute() # toggle mute
      else
        @trackMultiPress = 1
        @sequencerController.selectTrack(buttonIndex)

    else
      # set step value
      @trackMultiPress = 0
      @sequencerController.selectValue(buttonIndex-3)

    return


  _onRightDown: (buttonIndex) ->
    @trackMultiPress = 0
    if @patternOpsMode
      # heldTop check prevents bad UX with an extra press
      return if @heldTop?
      @_patternOpsMode(false)

    if @sequencerController.pattern == buttonIndex # pattern already selected
      @patternMultiPress += 1
      if @patternMultiPress >= 3
        @patternMultiPress = 0
        if @heldTop?
          # it was held the whole time, because a top button press would have reset @patternMultiPress
          @_patternOpsMode(true)
        else
          @sequencerController.toggleSelectedPatternMute() # toggle mute
    else
      @patternMultiPress = 1
      @sequencerController.selectPattern(buttonIndex)
    return


  _onGridDown: (x,y) ->
    if @patternOpsMode
      if @heldGridX?
        start = x + y*ROW_LENGTH
        end = @heldGridX + @heldGridY*ROW_LENGTH
        @sequencerController.selectedPattern.setRange(start, end)

        # redraw range:
        launchpad.patternSteps(@sequencerController.selectedPattern)
        @sequencerController.drawPatternInfo()

    else
      @trackMultiPress = 0
      @patternMultiPress = 0
      @sequencerController.setGridValue(x,y)
    return


  # enter the mode for pattern operations (set start/end, shift, copy, paste)
  _patternOpsMode: (enabled) ->
    @patternOpsMode = enabled
    launchpad = @launchpad
    launchpad.patternOpsMode = enabled
    if enabled
      # Top lights change to indicate we're in this mode.
      # Left 4 are for shifting
      launchpad._top(0, Launchpad.YELLOW)
      launchpad._top(1, Launchpad.YELLOW)
      launchpad._top(2, Launchpad.YELLOW)
      launchpad._top(3, Launchpad.YELLOW)

      # Next 2 are for reverse and invert
      launchpad._top(4, Launchpad.YELLOW)
      launchpad._top(5, Launchpad.YELLOW)

      # Last 2 are copy & paste
      launchpad._top(6, Launchpad.GREEN)
      launchpad._top(7, Launchpad.RED)

      launchpad.patternSteps(@sequencerController.selectedPattern)
    else
      @launchpad.allOff()
      @sequencerController.drawLaunchpad()
    return

