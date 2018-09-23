export const STEP_DURATION = '16th';

// maps pattern index to the default type for that pattern:
export const PATTERN_TYPES = Object.freeze([
  'velocity +',
  'duration +',
  'modulate', // TODO implement subdivide (can probably ditch modulation or maybe ditch octave)
  'octave',
  'random mute',
  'scale gate',
  'scale gate',
  'scale gate',
]);

export const PITCH_CLASSES = Object.freeze([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]); // full chromatic scale

export const VALUE = 0; // TODO: This should actually be 1. This was introduced more as a constant for OFF
