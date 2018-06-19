export default {
  NOOP: () => { }, // the "no operation" function

  DEFER_DELAY: 20, // How often (in ms) to schedule chunks of work. See Defer class.

  // Model lengths:
  TRACKS: 4,
  PATTERNS: 8,  // patterns per track
  STEPS: 64, // sequencer steps per pattern
  ROW_LENGTH: 8,  // steps per row in the grid
  VALUES: 5, // number of distinct step values, currently off, green, yellow, orange, red
  DEFAULT_STEP_LENGTH: '16th',

  // MIDI CCs
  TRANSPORT_STOP: 123, // MIDI CC number

  // GUI settings
  GUI_STEP_WIDTH: 19,
  GUI_BUTTON_WIDTH: 13,

  // Outlets
  LAUNCHPAD_NOTE: 0,
  LAUNCHPAD_CC: 1,
  NOTE: 2,
  CC: 3,
  AFTERTOUCH: 4,
  PATTR: 5,
  TRACK_INDEX: 6,
  STEP_VALUE: 7,
  PATTERN_INDEX: 8,
  GRID: 9,
  TRACK_INFO: 10,
  TRACK_MUTE: 11,
  PATTERN_INFO: 12,
  PATTERN_MUTE: 13,
  SCALE: 14,
  STEP_LENGTH: 15,
  TRACK_MULTIPLIER: 16,

  // Pattern settings:
  DEFAULT_PATTERN_TYPES: [
    'scale gate',
    'scale +',
    'velocity +',
    'duration +',
    'octave',
    'scale -',
    'velocity -',
    'duration -'
  ],
  GATE_DURATIONS: [null, 1, 2, 4, 8],
  OCTAVES: [null, 12, 24, -12, -24],
  MODS: [null, 0, 42, 85, 127],
}
