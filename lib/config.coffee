TRACKS     = 4
PATTERNS   = 8  # patterns per track
STEPS      = 64 # sequencer steps per pattern
ROW_LENGTH = 8  # steps per row in the grid

DEFAULT_STEP_LENGTH = '16th'

TRANSPORT_STOP = 123 # MIDI CC number

NOOP = -> # the "no operation" function

GUI_STEP_WIDTH = 19
GUI_BUTTON_WIDTH = 13

DEFER_DELAY = 20 # How often (in ms) to schedule chunks of work. See Defer class.

# Max outlets
outlets = 17
LAUNCHPAD_NOTE = 0
LAUNCHPAD_CC   = 1
NOTE           = 2
CC             = 3
AFTERTOUCH     = 4
PATTR          = 5
TRACK_INDEX    = 6
STEP_VALUE     = 7
PATTERN_INDEX  = 8
GRID           = 9
TRACK_INFO     = 10
TRACK_MUTE     = 11
PATTERN_INFO   = 12
PATTERN_MUTE   = 13
SCALE          = 14
STEP_LENGTH    = 15
TRACK_MULTIPLIER = 16

if not @console?
  # Simulate the console with the Max window, for debugging and interoperability with Node.js
  @console =
    log: (msg) -> post(msg+"\n")
    error: (msg) -> error(msg+"\n")
