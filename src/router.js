// The code in this file redirects all incoming messages from the Max patcher to an appropriate controller method.

//--------------------------------------------------------------
// Core Max messages
//
const bang = function () {
  sequencerController.redraw();
};

function reset() {
  sequencerController.reset();
};

//--------------------------------------------------------------
// Launchpad MIDI in
//
function notein(pitch, velocity) {
  launchdpadController.notein(pitch, velocity);
};

function ctlin(cc, val) {
  if (cc !== TRANSPORT_STOP) {
    launchdpadController.ctlin(cc, val);
  } else {
    sequencerController.stop();
    save(); // this is a good time to save state without affecting realtime audio performance
  }
};

//--------------------------------------------------------------
// Live Track MIDI in
//
function note(pitch, velocity) {
  midiController.note(pitch, velocity);
};

//--------------------------------------------------------------
// Global
//
function stepLength(stepLength) {
  sequencerController.setStepLength(stepLength);
};

function clock(clockIndex) {
  sequencerController.setClock(clockIndex);
};

function scale(...pitchClasses) {
  sequencerController.setScale(pitchClasses);
};

//--------------------------------------------------------------
// GUI Launchpad Buttons
//
function track(trackIndex) {
  sequencerController.selectTrack(trackIndex);
};

function stepValue(value) {
  sequencerController.selectValue(value);
};

function pattern(patternIndex) {
  sequencerController.selectPattern(patternIndex);
};

function grid(x, y) {
  sequencerController.setGridValue(x, y);
};

//--------------------------------------------------------------
// Track Settings
//
function basePitch(pitch) {
  sequencerController.setSelectedTrackPitch(pitch);
};

function baseVelocity(velocity) {
  sequencerController.setSelectedTrackVelocity(velocity);
};

function durationScale(scale) {
  sequencerController.setSelectedTrackDurationScale(scale);
};

function trackMute(mute) {
  sequencerController.setSelectedTrackMute(mute);
};

function trackMultiplier(multiplier) {
  sequencerController.setSelectedTrackStepLengthMultiplier(multiplier);
};

//--------------------------------------------------------------
// Pattern Settings
//
function startStep(stepNumber) {
  sequencerController.setSelectedPatternStartStep(stepNumber - 1);
};

function endStep(stepNumber) {
  sequencerController.setSelectedPatternEndStep(stepNumber - 1);
};

function patternType(type) {
  sequencerController.setSelectedPatternType(type);
};

function patternMute(mute) {
  sequencerController.setSelectedPatternMute(mute);
};

//--------------------------------------------------------------
// Pattern Operations
//
function random() {
  sequencerController.random();
};

function randomFill() {
  sequencerController.randomFill();
};

function randomThin() {
  sequencerController.randomFill(0);
};

function fill() {
  sequencerController.fill();
};

function clear() {
  sequencerController.fill(0);
};

function firstColumn() {
  sequencerController.firstColumn();
};

function reverse() {
  sequencerController.reverse();
};

function invert() {
  sequencerController.invert();
};

function replace() {
  sequencerController.replace();
};

function shiftleft() {
  sequencerController.rotate(1);
};

function shiftup() {
  sequencerController.rotate(ROW_LENGTH);
};

function shiftright() {
  sequencerController.rotate(-1);
};

function shiftdown() {
  sequencerController.rotate(-ROW_LENGTH);
};

//--------------------------------------------------------------
// Persistence
//
function copy() {
  sequencerController.copyPattern();
};

function paste() {
  sequencerController.pastePattern();
};

var save = function () {
  storageController.save();
};

function load(path, ...values) {
  storageController.load(path, ...Array.from(values));
};

function importFile(filepath) {
  storageController.import(filepath);
};

function exportFile(filepath) {
  storageController.export(filepath);
};
