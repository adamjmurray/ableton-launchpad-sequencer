export default class GUI {

  // Max's LCD object expects [R,G,B] in 0-255 range
  static get GRID_COLORS() {
    return [
      [150, 150, 150], // off
      [0, 255, 0],     // green
      [255, 255, 0],   // yellow
      [255, 127, 0],   // orange
      [255, 0, 0],     // red
      [80, 130, 200]  // current step
    ];
  }
  static get START_END_COLOR() { return [200, 200, 255]; }
  static get NO_COLOR() { return [53, 53, 53]; } // background color in the GUI

  constructor() {
    this.oldlines = [];
  }

  track(trackIndex) {
    outlet(TRACK_INDEX, trackIndex);
  }

  stepValue(stepValue) {
    outlet(STEP_VALUE, stepValue);
  }

  pattern(patternIndex) {
    outlet(PATTERN_INDEX, patternIndex);
  }

  grid(x, y, value) {
    const left = (x * GUI_STEP_WIDTH) + 2;
    const top = (y * GUI_STEP_WIDTH) + 2;
    this.color(GUI.GRID_COLORS[value]);
    outlet(GRID, 'paintrect', left, top, left + GUI_BUTTON_WIDTH, top + GUI_BUTTON_WIDTH);
  }

  activeStep(x, y) {
    this.grid(x, y, 5);
  }

  clearGrid() {
    outlet(GRID, 'clear');
  }

  color(color) {
    outlet(GRID, 'frgb', color);
  }

  drawline(line) {
    outlet(GRID, 'linesegment', line);
  }

  trackInfo(trackIndex, track) {
    const trackNumber = trackIndex + 1;
    outlet(TRACK_INFO, trackNumber, track.pitch, track.velocity, track.duration);
  }

  trackMute(track) {
    outlet(TRACK_MUTE, track.mute);
  }

  trackMultiplier(track) {
    outlet(TRACK_MULTIPLIER, track.multiplier);
  }

  patternInfo(patternIndex, pattern) {
    // values in the Max GUI are numbers counting from 1, hence all the "+1"s
    const { start } = pattern;
    const { end } = pattern;
    outlet(PATTERN_INFO, patternIndex + 1, pattern.type, start + 1, end + 1);

    // start end/step indicators:
    const delta = GUI_BUTTON_WIDTH + 3;
    const startX = (start % 8) * GUI_STEP_WIDTH;
    const startY = Math.floor(start / 8) * GUI_STEP_WIDTH;
    const endX = (end % 8) * GUI_STEP_WIDTH;
    const endY = Math.floor(end / 8) * GUI_STEP_WIDTH;

    const lines = [
      [startX + delta, startY, startX, startY],
      [startX, startY, startX, startY + delta],
      [startX, startY + delta, startX + delta, startY + delta],
      [endX, endY, endX + delta, endY],
      [endX + delta, endY, endX + delta, endY + delta],
      [endX + delta, endY + delta, endX, endY + delta]
    ];

    this.color(GUI.NO_COLOR);
    for (var line of this.oldlines) { this.drawline(line); }
    this.color(GUI.START_END_COLOR);
    for (line of lines) { this.drawline(line); }
    this.oldlines = lines;
  }

  patternMute(pattern) {
    outlet(PATTERN_MUTE, pattern.mute);
  }

  scale(scale) {
    const scalePitchClasses = scale.pitchClasses;
    // GUI expects a list [{index}, {1/0}, ...] for index 0..11 (each other arg 1/0 is 1 of step enabled or 0 if not)
    const pitchClasses = [];
    for (let pc = 0; pc < 12; pc++) {
      pitchClasses.push(pc, scalePitchClasses.includes(pc) ? 0 : 1);
    }
    outlet(SCALE, pitchClasses);
  }

  stepLength(length) {
    outlet(STEP_LENGTH, length);
  }
}
