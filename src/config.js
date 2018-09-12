
export const NOOP = () => { }; // the "no operation" function

export const DEFER_DELAY = 20; // How often (in ms) to schedule chunks of work. See Defer class.

// Model lengths:
export const TRACKS = 4;
export const PATTERNS = 8;  // patterns per track
export const STEPS = 64; // sequencer steps per pattern
export const ROW_LENGTH = 8;  // steps per row in the grid
export const VALUES = 5; // number of distinct step values, currently off, green, yellow, orange; red
export const DEFAULT_STEP_LENGTH = '16th';

// MIDI CCs
export const TRANSPORT_STOP = 123; // MIDI CC number

// GUI settings
export const GUI_STEP_WIDTH = 19;
export const GUI_BUTTON_WIDTH = 13;

// Outlets
export const LAUNCHPAD_NOTE = 0;
export const LAUNCHPAD_CC = 1;
export const NOTE = 2;
export const CC = 3;
export const AFTERTOUCH = 4;
export const PATTR = 5;
export const TRACK_INDEX = 6;
export const STEP_VALUE = 7;
export const PATTERN_INDEX = 8;
export const GRID = 9;
export const TRACK_INFO = 10;
export const TRACK_MUTE = 11;
export const PATTERN_INFO = 12;
export const PATTERN_MUTE = 13;
export const SCALE = 14;
export const STEP_LENGTH = 15;
export const TRACK_MULTIPLIER = 16;
export const LAUNCHPAD_RAPID_UPDATE = 17;

// Pattern settings:
export const DEFAULT_PATTERN_TYPES = [
  'scale gate',
  'scale +',
  'velocity +',
  'duration +',
  'octave',
  'scale -',
  'velocity -',
  'duration -'
]
export const GATE_DURATIONS = [null, 1, 2, 4, 8];
export const OCTAVES = [null, 12, 24, -12, -24];
export const MODS = [null, 0, 42, 85, 127]; // MIDI CC modulation values for each step value

