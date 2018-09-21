export const STEP_DURATION = '16th';

// maps pattern index to the default type for that pattern:
export const PATTERN_TYPES = Object.freeze([
  'scale gate',
  'scale +',
  'velocity +',
  'duration +',
  'octave',
  'scale -',
  'velocity -',
  'duration -'
]);

export const PITCH_CLASSES = Object.freeze([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]); // full chromatic scale