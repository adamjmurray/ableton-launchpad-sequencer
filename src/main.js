import './polyfills';
import { LaunchpadView, Sequencer, MidiController, SequencerController, LaunchpadController, StorageController } from './';
import { NUMBER_OF, MIDI } from './config';

outlets = 18;

const launchpad = new LaunchpadView;
const sequencer = new Sequencer(launchpad);
const midiController = new MidiController(sequencer);
const sequencerController = new SequencerController(sequencer, launchpad);
const launchdpadController = new LaunchpadController(launchpad, sequencerController);
const storageController = new StorageController(sequencer, sequencerController);

// The code in this file redirects all incoming messages from the Max patcher to an appropriate controller method.
//--------------------------------------------------------------
// Core Max messages
//
export function bang() {
  sequencerController.redraw();
};

export function reset() {
  sequencerController.reset();
};

//--------------------------------------------------------------
// Launchpad MIDI in
//
export function notein(pitch, velocity) {
  launchdpadController.notein(pitch, velocity);
};

export function ctlin(cc, val) {
  if (cc !== MIDI.TRANSPORT_STOP) {
    launchdpadController.ctlin(cc, val);
  } else {
    sequencerController.stop();
    save(); // this is a good time to save state without affecting realtime audio performance
  }
};

//--------------------------------------------------------------
// Live Track MIDI in
//
export function note(pitch, velocity) {
  midiController.note(pitch, velocity);
};

//--------------------------------------------------------------
// Global
//
export function stepLength(stepLength) {
  sequencerController.setStepLength(stepLength);
};

export function clock(clockIndex) {
  sequencerController.setClock(clockIndex);
};

export function setScale(...pitchClasses) {
  sequencerController.setScale(pitchClasses);
};

//--------------------------------------------------------------
// GUI Launchpad Buttons
//
export function track(trackIndex) {
  sequencerController.selectTrack(trackIndex);
};

export function stepValue(value) {
  sequencerController.selectValue(value);
};

export function pattern(patternIndex) {
  sequencerController.selectPattern(patternIndex);
};

export function grid(x, y) {
  sequencerController.setGridValue(x, y);
};

//--------------------------------------------------------------
// Track Settings
//
export function basePitch(pitch) {
  sequencerController.setSelectedTrackPitch(pitch);
};

export function baseVelocity(velocity) {
  sequencerController.setSelectedTrackVelocity(velocity);
};

export function durationScale(scale) {
  sequencerController.setSelectedTrackDurationScale(scale);
};

export function trackMute(mute) {
  sequencerController.setSelectedTrackMute(mute);
};

export function trackMultiplier(multiplier) {
  sequencerController.setSelectedTrackStepLengthMultiplier(multiplier);
};

//--------------------------------------------------------------
// Pattern Settings
//
export function startStep(stepNumber) {
  sequencerController.setSelectedPatternStartStep(stepNumber - 1);
};

export function endStep(stepNumber) {
  sequencerController.setSelectedPatternEndStep(stepNumber - 1);
};

export function patternType(type) {
  sequencerController.setSelectedPatternType(type);
};

export function patternMute(mute) {
  sequencerController.setSelectedPatternMute(mute);
};

//--------------------------------------------------------------
// Pattern Operations
//
export function random() {
  sequencerController.random();
};

export function randomFill() {
  sequencerController.randomFill();
};

export function randomThin() {
  sequencerController.randomFill(0);
};

export function fill() {
  sequencerController.fill();
};

export function clear() {
  sequencerController.fill(0);
};

export function firstColumn() {
  sequencerController.firstColumn();
};

export function reverse() {
  sequencerController.reverse();
};

export function invert() {
  sequencerController.invert();
};

export function replace() {
  sequencerController.replace();
};

export function shiftleft() {
  sequencerController.rotate(1);
};

export function shiftup() {
  sequencerController.rotate(NUMBER_OF.COLUMNS);
};

export function shiftright() {
  sequencerController.rotate(-1);
};

export function shiftdown() {
  sequencerController.rotate(-NUMBER_OF.COLUMNS);
};

//--------------------------------------------------------------
// Persistence
//
export function copy() {
  sequencerController.copyPattern();
};

export function paste() {
  sequencerController.pastePattern();
};

export function save() {
  storageController.save();
};

export function load(path, ...values) {
  storageController.load(path, ...Array.from(values));
};

export function importFile(filepath) {
  storageController.import(filepath);
};

export function exportFile(filepath) {
  storageController.export(filepath);
};

console.log(
  `________________________________________________________________________________
reloaded at: ${new Date}`
);
