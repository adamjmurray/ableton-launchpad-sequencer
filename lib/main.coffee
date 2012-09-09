
gui = new GUI()

launchpad = new Launchpad
launchpad.noteout = (pitch, velocity) -> outlet(0, pitch, velocity)
launchpad.ctlout = (cc, value) -> outlet(1, cc, value)

sequencer = new Sequencer(launchpad, gui,
  (pitch, velocity, duration) ->
    duration *= 250 # TODO: figure out how to sync with tempo
    outlet(2, pitch, velocity, duration)
)
launchpad.onRightDown = (idx) -> sequencer.selectPattern(idx)
launchpad.onGridDown = (x,y) -> sequencer.setGridValue(x,y)
launchpad.onTopDown = (index) ->
  if index <= 3 # left 4 top buttons
    sequencer.selectTrack(index)
  else # right 4
    sequencer.selectValue(index-3)


#========================================================
# I/O with Max

bang = -> sequencer.redraw()
factoryReset = -> sequencer.factoryReset()

notein = (pitch, velocity) -> launchpad.notein(pitch, velocity)
ctlin = (cc, val) ->
  if cc == TRANSPORT_STOP
    # Live sends "all notes off" to all connected MIDI devices when the transport stops,
    # which resets the Launchpad, so we need to re-sync the state:
    sequencer.setClock(-1)
    sequencer.redraw()

    # Also use this as an opportunity to record the sequencer state without affecting realtime audio performance
    save()
  else
    launchpad.ctlin(cc, val)


track = (trackIndex) -> sequencer.selectTrack(trackIndex)
stepValue = (value) -> sequencer.selectValue(value)
pattern = (patternIndex) -> sequencer.selectPattern(patternIndex)
grid = (x,y) -> sequencer.setGridValue(x,y)
basePitch = (pitch) -> sequencer.selectedTrack?.basePitch = pitch
startStep = (stepNumber) -> sequencer.selectedPattern.setStart(stepNumber-1)
endStep = (stepNumber) -> sequencer.selectedPattern.setEnd(stepNumber-1)


clock = (bars,beats,units) ->
  # assume 4/4 with 1/16 note pulses
  clockIndex = (bars-1)*16 + (beats-1)*4 + Math.round(units/120)
  sequencer.setClock(clockIndex)


load = (pattrPath, values...) ->
  if(pattrPath == 'dump') # we're done
    sequencer.redraw()
    return

  # pattrPaths look like:
  # track.1::basePitch 60.
  # track.1::pattern.1::sequence 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
  # track.1::pattern.1::ptype gate
  # track.1::pattern.1::start 0
  # track.1::pattern.1::end 63
  matches =/^track\.(\d+)::(.*)/.exec(pattrPath)
  return unless matches?

  trackIndex = parseInt(matches[1]) - 1
  subpath = matches[2]
  track = sequencer.tracks[trackIndex]
  return unless track?

  if subpath == 'basePitch'
    track.basePitch = parseInt(values[0])
  else
    matches = /^pattern\.(\d+)::(.*)/.exec(subpath)
    return unless matches?

    patternIndex = parseInt(matches[1]) - 1
    property = matches[2]
    pattern = track.patterns[patternIndex]
    return unless pattern?

    switch property
      when 'ptype' then pattern.setType(values[0])
      when 'start' then pattern.setStart(values[0])
      when 'end' then pattern.setEnd(values[0])
      when 'sequence' then sequencer.setPattern(trackIndex, patternIndex, values)


save = -> sequencer.writeState(
  (trackIndex, track) -> outlet(3, track.basePitch, trackIndex+1), # trackPattrOut

  (trackIndex, patternIndex, pattern) -> # patternPattrOut
    outlet 4,
      pattern.type, pattern.start, pattern.end, pattern.sequence,
      patternIndex+1, trackIndex+1
)


log 'reloaded at: ' + new Date