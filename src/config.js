export const GUI_COLOR = Object.freeze({ // Max's LCD object uses the format [R,G,B] in 0-255 range
  BACKGROUND: Object.freeze([27, 27, 27]),
  PATTERN_START_END: Object.freeze([200, 200, 255]), // the color of the bracket marking the first and last step in the pattern:
  STEP_VALUE: Object.freeze([ // maps step values to GUI colors
    Object.freeze([150, 150, 150]), // off
    Object.freeze([0, 255, 0]),     // green
    Object.freeze([255, 255, 0]),   // yellow
    Object.freeze([255, 127, 0]),   // orange
    Object.freeze([255, 0, 0]),     // red
    Object.freeze([80, 130, 200]),   // current step (TODO: why doesn't the launchpad colors use this format i.e. put this at end of array?)
  ]),
  SEQUENCER_STEP: Object.freeze([80, 130, 200]),  // TODO: can we replace the last item in STEP_VALUE above?
});

const lpColor = (green, red) => (16 * green) + red + 4; // + 4 ensures writes to both buffers in case the Launchpad is in double buffering mode
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
  STEP_DURATION: '1/16',
  MODULATION_SUMMING_MODE: 'add',
  MODULATION_SLEW: 0,
  PATTERN_TYPES: Object.freeze([ // maps pattern index to the default type for that pattern
    'velocity',
    'duration',
    'aftertouch',
    'modulation',
    'random mute',
    'gate',
    'gate',
    'gate',
  ]),
  PITCH: 60,
  VELOCITY: 70,
  GATE: 0.9,
  GATE_MODE: 'pitch',
  GATE_SUMMING_MODE: 'add',
  VALUE: 1,
  SAVE_DELAY: 2000,
  SCALE_ROOT: 0,
  SCALE_OFFSETS: Object.freeze([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), // full chromatic scale
});

export const GESTURE = Object.freeze({
  SELECT: 'select',
  DOUBLE_PRESS: 'double press',
  TRIPLE_PRESS: 'triple press',
});

export const GUI = Object.freeze({
  STEP_WIDTH: 18,
  BUTTON_WIDTH: 12,
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
  GATE: Object.freeze({
    PITCH: 'pitch',
    VELOCITY: 'velocity',
  }),
  GATE_SUMMING: Object.freeze({
    ADD: 'add',
    ADD_x3: 'addx3',
    ADD_x4: 'addx4',
    LOWEST: 'low',
    HIGHEST: 'high',
    RANDOM: 'rand',
    RANDOM_WITH_0: 'rand+0',
    MULTI: 'multi',
  }),
});

export const NUMBER_OF = Object.freeze({
  GATES: 3, // number of gate-type patterns in a track
  TRACKS: 4, // number of tracks in the device
  PATTERNS: 8,  // number of patterns per track
  STEPS: 64, // number of sequencer steps per pattern
  ROWS: 8, // number of steps per row in the pattern grid
  COLUMNS: 8, // number of steps per column in the pattern grid
  STEP_VALUES: 5, // number of step values (off, green, yellow, orange, and red)
});

export const OUTLET = Object.freeze({
  NOTE: 0,
  CC: 1,
  AFTERTOUCH: 2,
  LAUNCHPAD_NOTE: 3,
  LAUNCHPAD_CC: 4,
  LAUNCHPAD_RAPID_UPDATE: 5,
  GUI: 6,
  STORAGE: 7,
});

export const PATTERN = Object.freeze({ // maps pattern types to pattern indexes
  VELOCITY: 0,
  DURATION: 1,
  AFTERTOUCH: 2,
  MODULATION: 3,
  MUTE: 4,
  GATE1: 5,
  GATE2: 6,
  GATE3: 7,
});

// Maps step values to device values
export const STEP_VALUE = Object.freeze({
  OFF: 0,
  GATE_DURATION: Object.freeze([null, 1, 2, 4, 8]),
  DURATION: Object.freeze([1, 2, 4, 8, 16]),
  OCTAVES: Object.freeze([null, 12, 24, -12, -24]),
});

export const STORAGE = Object.freeze({
  DURATION: 'duration',
  SCALE_OFFSETS: 'scale',
  SCALE_ROOT: 'root',
  MODULATION_SUMMING_MODE: 'modsum',
  MODULATION_SLEW: 'modslew',
  TRACKS: 'tracks',
  PITCH: 'pitch',
  VELOCITY: 'velocity',
  GATE: 'gate',
  GATE_MODE: 'gatemode',
  MULTIPLIER: 'multiplier',
  GATE_SUMMING_MODE: 'gatesum',
  MUTE: 'mute',
  PATTERNS: 'patterns',
  STEPS: 'steps',
  START: 'start',
  END: 'end',
});
