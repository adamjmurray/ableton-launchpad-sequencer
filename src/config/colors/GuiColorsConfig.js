export const BACKGROUND = Object.freeze([53, 53, 53]);

// the color of the bracket marking the first and last step in the pattern:
export const PATTERN_START_END = Object.freeze([200, 200, 255]);

// maps step values to GUI colors:
export const STEP_VALUE = Object.freeze([
  // Max's LCD object uses the format [R,G,B] in 0-255 range
  [150, 150, 150], // off
  [0, 255, 0],     // green
  [255, 255, 0],   // yellow
  [255, 127, 0],   // orange
  [255, 0, 0],     // red
  [80, 130, 200]   // current step (TODO: why doesn't the launchpad colors use this format i.e. put this at end of array?)
]);
