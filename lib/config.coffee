TRACKS     = 4
PATTERNS   = 8  # patterns per track
STEPS      = 64 # sequencer steps per pattern
ROW_LENGTH = 8  # steps per row in the grid

TRANSPORT_STOP = 123 # MIDI CC number

NOOP = -> # the "no operation" function

GUI_STEP_WIDTH = 19
GUI_BUTTON_WIDTH = 13

DEFER_DELAY = 20 # How often to schedule chunks of work. See Defer class.

# Max outlets
outlets = 14
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
