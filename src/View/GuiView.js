import { GUI_COLOR as COLOR, GUI, NUMBER_OF, OUTLET } from '../config';

const { STEP_WIDTH, BUTTON_WIDTH } = GUI;

// These need to match the [route] objects connected to the GUI outlet in the Max patch.
const GRID = 'grid';
const DURATION = 'duration';
const SCALE = 'scale';
const TRACK = 'track';
const PATTERN = 'pattern';
const VALUE = 'value';
const INDEX = 'index';
const PITCH = 'pitch';
const VELOCITY = 'velocity';
const GATE = 'gate';
const MULTIPLIER = 'multiplier';
const MUTE = 'mute';
const START = 'start';
const END = 'end';

export default class GuiView {

  constructor(model) {
    this._model = model;
    this._oldlines = [];
  }

  clearGrid() {
    outlet(OUTLET.GRID, 'clear');
  }

  renderDuration(duration) {
    outlet(OUTLET.GUI, DURATION, duration);
  }

  renderScale(pitchClasses) {
    outlet(OUTLET.GUI, SCALE, scale.pitchClasses);
  }

  renderTrack(track) {
    this.renderTrackIndex(track.index);
    this.renderTrackPitch(track.pitch);
    this.renderTrackVelocity(track.velocity);
    this.renderTrackGate(track.gate);
    this.renderTrackMultiplier(track.durationMultiplier);
    this.renderTrackMute(track.mute);
  }

  renderTrackIndex(index) {
    outlet(OUTLET.GUI, TRACK, INDEX, index);
  }

  renderTrackPitch(pitch) {
    outlet(OUTLET.GUI, TRACK, PITCH, pitch);
  }

  renderTrackVelocity(velocity) {
    outlet(OUTLET.GUI, TRACK, VELOCITY, velocity);
  }

  renderTrackGate(gate) {
    outlet(OUTLET.GUI, TRACK, GATE, gate);
  }

  renderTrackMultiplier(multiplier) {
    outlet(OUTLET.GUI, TRACK, MULTIPLIER, multiplier);
  }

  renderTrackMute(mute) {
    outlet(OUTLET.GUI, TRACK, MUTE, mute);
  }

  renderValueButton(value) {
    outlet(OUTLET.GUI, VALUE, value);
  }

  renderPattern(pattern) {
    this.renderPatternIndex(pattern.index);
    this.renderPatternStart(pattern.start, false);
    this.renderPatternEnd(pattern.end, false);
    this.renderPatternMute(pattern.mute);
    this.renderGrid(pattern);
  }

  renderPatternIndex(index) {
    outlet(OUTLET.GUI, PATTERN, INDEX, index);
  }

  renderPatternStart(start, renderGrid = true) {
    outlet(OUTLET.GUI, PATTERN, START, start);
    if (renderGrid) this.renderGrid();
  }

  renderPatternEnd(end, renderGrid = true) {
    outlet(OUTLET.GUI, PATTERN, END, end);
    if (renderGrid) this.renderGrid();
  }

  renderPatternMute(mute) {
    outlet(OUTLET.GUI, PATTERN, MUTE, mute);
  }

  renderGrid(pattern = this._model.selectedPattern) {
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

    const sequencerStepIndex = this._stepIndexForClock;
    pattern.steps.forEach((_, stepIndex) => this.renderStep(stepIndex, sequencerStepIndex));
  }

  render() {
    this.renderTrack(this._model.selectedTrack);
    this.renderValueButton();
    this.renderPattern(this._model.selectedPattern);
    this.renderGrid();
  }

  get _stepIndexForClock() {
    const { clockIndex, selectedPattern } = this._model;
    return clockIndex < 0 ? -1 : selectedPattern.stepIndexForClock(clockIndex);
  }

  renderStep(stepIndex, sequencerStepIndex = this._stepIndexForClock) {
    const x = stepIndex % NUMBER_OF.COLUMNS;
    const y = Math.floor(stepIndex / NUMBER_OF.COLUMNS);
    const value = this._model.selectedPattern.steps[stepIndex];
    const color = stepIndex === sequencerStepIndex ? COLOR.SEQUENCER_STEP : COLOR.STEP_VALUE[value];
    const left = (x * STEP_WIDTH) + 2;
    const top = (y * STEP_WIDTH) + 2;
    this.setColor(color);
    outlet(OUTLET.GUI, GRID, 'paintrect', left, top, left + BUTTON_WIDTH, top + BUTTON_WIDTH);
  }

  setColor(color) {
    outlet(OUTLET.GUI, GRID, 'frgb', color);
  }

  drawline(line) {
    outlet(OUTLET.GUI, GRID, 'linesegment', line);
  }

  trackMute(track) {
    outlet(OUTLET.GUI, TRACK, MUTE, track.mute);
  }

  trackMultiplier(track) {
    outlet(OUTLET.GUI, TRACK, MULTIPLIER, track.multiplier);
  }

  patternMute(pattern) {
    outlet(OUTLET.GUI, PATTERN, MUTE, pattern.mute);
  }

  scale(scale) {
    const scalePitchClasses = scale.pitchClasses;
    // GUI expects a list [{index}, {1/0}, ...] for index 0..11 (each other arg 1/0 is 1 of step enabled or 0 if not)
    const pitchClasses = [];
    for (let pc = 0; pc < 12; pc++) {
      pitchClasses.push(pc, scalePitchClasses.includes(pc) ? 0 : 1);
    }
    outlet(OUTLET.GUI, SCALE, pitchClasses);
  }

  stepLength(length) {
    outlet(OUTLET.GUI, DURATION, length);
  }
}
