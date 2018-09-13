const color = (green, red) => (16 * green) + red + 12; // + 12 is the flag for 'on' (see Launchpad programmer's reference)

export const OFF = color(0, 0);
export const GREEN = color(3, 0);
export const YELLOW = color(3, 2);
export const ORANGE = color(2, 3);
export const RED = color(0, 3);

export const INACTIVE_GREEN = color(2, 0);
export const INACTIVE_YELLOW = color(2, 1);
export const INACTIVE_ORANGE = color(1, 2);
export const INACTIVE_RED = color(0, 2);

export const SEQUENCER_STEP = color(1, 1);  // color for current sequencer step, regardless of value

export const TRACK_COLOR = color(1, 2);
export const PATTERN_COLOR = color(2, 0);
export const MUTE_COLOR = color(0, 3);
export const INACTIVE_MUTE_COLOR = color(0, 1); // mute color when the track/pattern is not selected (maybe rename this DESELECTED_MUTE_COLOR?)

// maps step value to color:
export const STEP_VALUES = Object.freeze([OFF, GREEN, YELLOW, ORANGE, RED])

// maps step value to color in "pattern ops mode" for steps in the pattern's start/end range:
export const ACTIVE_STEPS = Object.freeze([SEQUENCER_STEP, GREEN, YELLOW, ORANGE, RED]);

// maps step value to color in "pattern ops mode" for steps outside the pattern's start/end range:
export const INACTIVE_STEPS = Object.freeze([OFF, INACTIVE_GREEN, INACTIVE_YELLOW, INACTIVE_ORANGE, INACTIVE_RED]);
