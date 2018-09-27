import { GUI_COLOR as COLOR, GUI, NUMBER_OF, OUTLET } from '../config';

const { STEP_WIDTH, BUTTON_WIDTH } = GUI;

export default class GuiView {

  constructor(model) {
    this._model = model;
    this._oldlines = [];
  }

  clear() {
    outlet(OUTLET.GRID, 'clear');
  }

  // track(trackIndex) {
  //   outlet(OUTLET.TRACK_INDEX, trackIndex);
  // }

  // stepValue(stepValue) {
  //   outlet(OUTLET.STEP_VALUE, stepValue);
  // }

  // pattern(patternIndex) {
  //   outlet(OUTLET.PATTERN_INDEX, patternIndex);
  // }

  // renderTrackButton(trackIndex) {
  //   outlet(OUTLET.TRACK_INDEX, trackIndex);
  // }

  renderTrack() {
    const track = this._model.selectedTrack;
    const trackIndex = this._model.selectedTrackIndex;
    outlet(OUTLET.TRACK_INDEX, trackIndex);

    // If we have dedicated pattrs / GUI elements (by having a copy of the GUI for each track/pattern via bpatchers),
    // then we probably don't need any of this:
    const trackNumber = trackIndex + 1;
    // TODO: what about rendering the durationMultiplier?
    outlet(OUTLET.TRACK_INFO, trackNumber, track.pitch, track.velocity, track.gate);
    outlet(OUTLET.TRACK_MUTE, track.mute);
  }

  renderValueButton() {
    outlet(OUTLET.STEP_VALUE, this._model.selectedValue);
  }

  renderPattern() {
    const pattern = this._model.selectedPattern;
    const patternIndex = this._model.selectedPatternIndex;
    outlet(OUTLET.PATTERN_INDEX, patternIndex);

    // If we have dedicated pattrs / GUI elements (by having a copy of the GUI for each track/pattern via bpatchers),
    // then we probably don't need any of this:
    const { type, startStepIndex, endStepIndex } = pattern;
    outlet(OUTLET.PATTERN_INFO,
      patternIndex + 1, type, startStepIndex + 1, endStepIndex + 1);
    outlet(OUTLET.PATTERN_MUTE, pattern.mute);
  }

  renderGrid() {
    const pattern = this._model.selectedPattern;
    const { startStepIndex: start, endStepIndex: end } = pattern

    // Draw start end/step indicators:
    const delta = BUTTON_WIDTH + 3;
    const startX = (start % 8) * STEP_WIDTH;
    const startY = Math.floor(start / 8) * STEP_WIDTH;
    const endX = (end % 8) * STEP_WIDTH;
    const endY = Math.floor(end / 8) * STEP_WIDTH;
    const lines = [
      [startX + delta, startY, startX, startY],
      [startX, startY, startX, startY + delta],
      [startX, startY + delta, startX + delta, startY + delta],
      [endX, endY, endX + delta, endY],
      [endX + delta, endY, endX + delta, endY + delta],
      [endX + delta, endY + delta, endX, endY + delta],
    ];
    // draw the old lines with the background color to erase them:
    this.setColor(COLOR.BACKGROUND);
    this._oldlines.forEach(oldLine => this.drawline(oldLine));

    this.setColor(COLOR.PATTERN_START_END);
    lines.forEach(line => this.drawline(line));
    this._oldlines = lines;

    pattern.steps.forEach((value, index) => {
      const x = index % NUMBER_OF.COLUMNS;
      const y = Math.floor(index / NUMBER_OF.COLUMNS);
      this.drawStep(x, y, value);
    });
  }

  render() {
    this.renderTrack();
    this.renderPattern();
    this.renderGrid();
  }

  renderStep(stepIndex) {
    const x = stepIndex % NUMBER_OF.COLUMNS;
    const y = Math.floor(stepIndex / NUMBER_OF.COLUMNS);
    const value = this._model.selectedPattern.steps[stepIndex];
    this.drawStep(x, y, value);
  }

  drawStep(x, y, value) {
    const left = (x * STEP_WIDTH) + 2;
    const top = (y * STEP_WIDTH) + 2;
    this.setColor(COLOR.STEP_VALUE[value]);
    outlet(OUTLET.GRID, 'paintrect', left, top, left + BUTTON_WIDTH, top + BUTTON_WIDTH);
  }

  activeStep(x, y) {
    this.grid(x, y, 5);
  }

  setColor(color) {
    outlet(OUTLET.GRID, 'frgb', color);
  }

  drawline(line) {
    outlet(OUTLET.GRID, 'linesegment', line);
  }

  // trackInfo(trackIndex, track) {
  //   const trackNumber = trackIndex + 1;
  //   outlet(OUTLET.TRACK_INFO, trackNumber, track.pitch, track.velocity, track.duration);
  // }

  trackMute(track) {
    outlet(OUTLET.TRACK_MUTE, track.mute);
  }

  trackMultiplier(track) {
    outlet(OUTLET.TRACK_MULTIPLIER, track.multiplier);
  }

  // patternInfo(patternIndex, pattern) {
  //   // values in the Max GUI are numbers counting from 1, hence all the "+1"s
  //   const { start } = pattern;
  //   const { end } = pattern;
  //   outlet(OUTLET.PATTERN_INFO, patternIndex + 1, pattern.type, start + 1, end + 1);

  //   // start end/step indicators:
  //   const delta = BUTTON_WIDTH + 3;
  //   const startX = (start % 8) * STEP_WIDTH;
  //   const startY = Math.floor(start / 8) * STEP_WIDTH;
  //   const endX = (end % 8) * STEP_WIDTH;
  //   const endY = Math.floor(end / 8) * STEP_WIDTH;
  //   const lines = [
  //     [startX + delta, startY, startX, startY],
  //     [startX, startY, startX, startY + delta],
  //     [startX, startY + delta, startX + delta, startY + delta],
  //     [endX, endY, endX + delta, endY],
  //     [endX + delta, endY, endX + delta, endY + delta],
  //     [endX + delta, endY + delta, endX, endY + delta]
  //   ];
  //   this.setColor(COLOR.BACKGROUND);
  //   this._oldlines.forEach(oldLine => this.drawline(oldLine));
  //   this.setColor(COLOR.PATTERN_START_END);
  //   lines.forEach(line => this.drawline(line));
  //   this._oldlines = lines;
  // }

  patternMute(pattern) {
    outlet(OUTLET.PATTERN_MUTE, pattern.mute);
  }

  scale(scale) {
    const scalePitchClasses = scale.pitchClasses;
    // GUI expects a list [{index}, {1/0}, ...] for index 0..11 (each other arg 1/0 is 1 of step enabled or 0 if not)
    const pitchClasses = [];
    for (let pc = 0; pc < 12; pc++) {
      pitchClasses.push(pc, scalePitchClasses.includes(pc) ? 0 : 1);
    }
    outlet(OUTLET.SCALE, pitchClasses);
  }

  stepLength(length) {
    outlet(OUTLET.STEP_DURATION, length);
  }
}
