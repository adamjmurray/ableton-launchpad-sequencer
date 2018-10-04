export const GUI_COLOR = Object.freeze({ // Max's LCD object uses the format [R,G,B] in 0-255 range
  BACKGROUND: Object.freeze([53, 53, 53]),
  PATTERN_START_END: Object.freeze([200, 200, 255]), // the color of the bracket marking the first and last step in the pattern:
  STEP_VALUE: Object.freeze([ // maps step values to GUI colors
    Object.freeze([150, 150, 150]), // off
    Object.freeze([0, 255, 0]),     // green
    Object.freeze([255, 255, 0]),   // yellow
    Object.freeze([255, 127, 0]),   // orange
    Object.freeze([255, 0, 0]),     // red
    Object.freeze([80, 130, 200]),   // current step (TODO: why doesn't the launchpad colors use this format i.e. put this at end of array?)
  ]),
});

const lpColor = (green, red) => (16 * green) + red + 12; // + 12 is the flag for 'on' (see Launchpad programmer's reference)
const LP_OFF = lpColor(0, 0);
const LP_GREEN = lpColor(3, 0);
const LP_YELLOW = lpColor(3, 2);
const LP_ORANGE = lpColor(2, 3);
const LP_RED = lpColor(0, 3);
const LP_INACTIVE_GREEN = lpColor(2, 0);
const LP_INACTIVE_YELLOW = lpColor(2, 1);
const LP_INACTIVE_ORANGE = lpColor(1, 2);
const LP_INACTIVE_RED = lpColor(0, 2);
const LP_SEQUENCER_STEP = lpColor(1, 1);
const LP_TRACK_COLOR = lpColor(1, 2);
const LP_PATTERN_COLOR = lpColor(2, 0);
const LP_MUTE_COLOR = lpColor(0, 3);
const LP_INACTIVE_MUTE_COLOR = lpColor(0, 1);

export const LAUNCHPAD_COLOR = Object.freeze({
  OFF: LP_OFF,
  GREEN: LP_GREEN,
  YELLOW: LP_YELLOW,
  ORANGE: LP_ORANGE,
  RED: LP_RED,
  INACTIVE_GREEN: LP_INACTIVE_GREEN,
  INACTIVE_YELLOW: LP_INACTIVE_YELLOW,
  INACTIVE_ORANGE: LP_INACTIVE_ORANGE,
  INACTIVE_RED: LP_INACTIVE_RED,
  SEQUENCER_STEP: LP_SEQUENCER_STEP, // color for current sequencer step, regardless of value
  TRACK_COLOR: LP_TRACK_COLOR,
  PATTERN_COLOR: LP_PATTERN_COLOR,
  MUTE_COLOR: LP_MUTE_COLOR,
  INACTIVE_MUTE_COLOR: LP_INACTIVE_MUTE_COLOR, // mute color when the track/pattern is not selected (maybe rename this DESELECTED_MUTE_COLOR?)
  STEP_VALUES: Object.freeze([LP_OFF, LP_GREEN, LP_YELLOW, LP_ORANGE, LP_RED]), // maps step value to color
  INACTIVE_STEPS: Object.freeze([LP_OFF, LP_INACTIVE_GREEN, LP_INACTIVE_YELLOW, LP_INACTIVE_ORANGE, LP_INACTIVE_RED]), // maps step value to color in "pattern ops mode" for steps outside the pattern's start/end range
});

export const DEFAULT = Object.freeze({
  STEP_DURATION: '16th',
  PATTERN_TYPES: Object.freeze([ // maps pattern index to the default type for that pattern
    'velocity +',
    'duration +',
    'modulate', // TODO implement subdivide (can probably ditch modulation or maybe ditch octave)
    'octave',
    'random mute',
    'scale gate',
    'scale gate',
    'scale gate',
  ]),
  PITCH_CLASSES: Object.freeze([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), // full chromatic scale
  VALUE: 1,
});

export const GESTURE = Object.freeze({
  SELECT: 'select',
  TRIPLE_PRESS: 'triple press',
});

export const GUI = Object.freeze({
  STEP_WIDTH: 19,
  BUTTON_WIDTH: 13,
});

export const LAUNCHPAD = Object.freeze({
  TOP_ROW_CC: 104
});

export const MIDI = Object.freeze({
  TRANSPORT_STOP: 123, // MIDI CC number
});

export const MODE = Object.freeze({
  SEQUENCER: 'SEQUENCER',
  PATTERN_EDIT: 'PATTERN_EDIT',
});

export const NUMBER_OF = Object.freeze({
  TRACKS: 4, // number of tracks in the device
  PATTERNS: 8,  // number of patterns per track
  STEPS: 64, // number of sequencer steps per pattern
  ROWS: 8, // number of steps per row in the pattern grid
  COLUMNS: 8, // number of steps per column in the pattern grid
  STEP_VALUES: 5, // number of step values (off, green, yellow, orange, and red)
  OUTLETS: 18, // number of outlets from the [js] object running this script
});

export const OUTLET = Object.freeze({
  LAUNCHPAD_NOTE: 0,
  LAUNCHPAD_CC: 1,
  NOTE: 2,
  CC: 3,
  AFTERTOUCH: 4,
  STORAGE: 5,
  TRACK_INDEX: 6,
  STEP_VALUE: 7,
  PATTERN_INDEX: 8,
  GRID: 9,
  TRACK_INFO: 10,
  TRACK_MUTE: 11,
  PATTERN_INFO: 12,
  PATTERN_MUTE: 13,
  SCALE: 14,
  STEP_DURATION: 15,
  TRACK_MULTIPLIER: 16,
  LAUNCHPAD_RAPID_UPDATE: 17,
});

// Maps step values to device values
export const STEP_VALUE = Object.freeze({
  OFF: 0,
  GATE_DURATION: Object.freeze([null, 1, 2, 4, 8]),
  OCTAVES: Object.freeze([null, 12, 24, -12, -24]),
  MIDI_CC: Object.freeze([null, 0, 42, 85, 127]),
});
