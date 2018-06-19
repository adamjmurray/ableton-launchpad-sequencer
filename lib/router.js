/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// The code in this file redirects all incoming messages from the Max patcher to an appropriate controller method.

//--------------------------------------------------------------
// Core Max messages
//
const bang  = function() {
  sequencerController.redraw();
};

const reset = function() {
  sequencerController.reset();
};

//--------------------------------------------------------------
// Launchpad MIDI in
//
const notein = function(pitch, velocity) {
  launchdpadController.notein(pitch, velocity);
};

const ctlin = function(cc, val) {
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
const note = function(pitch, velocity) {
  midiController.note(pitch, velocity);
};

//--------------------------------------------------------------
// Global
//
const stepLength = function(stepLength) {
  sequencerController.setStepLength(stepLength);
};

const clock = function(clockIndex) {
  sequencerController.setClock(clockIndex);
};

const scale = function(...scaleSteps) {
  sequencerController.setScale(...Array.from(scaleSteps || []));
};

//--------------------------------------------------------------
// GUI Launchpad Buttons
//
const track = function(trackIndex) {
  sequencerController.selectTrack(trackIndex);
};

const stepValue = function(value) {
  sequencerController.selectValue(value);
};

const pattern = function(patternIndex) {
  sequencerController.selectPattern(patternIndex);
};

const grid = function(x,y) {
  sequencerController.setGridValue(x,y);
};

//--------------------------------------------------------------
// Track Settings
//
const basePitch = function(pitch) {
  sequencerController.setSelectedTrackPitch(pitch);
};

const baseVelocity = function(velocity) {
  sequencerController.setSelectedTrackVelocity(velocity);
};

const durationScale = function(scale) {
  sequencerController.setSelectedTrackDurationScale(scale);
};

const trackMute = function(mute) {
  sequencerController.setSelectedTrackMute(mute);
};

const trackMultiplier = function(multiplier) {
  sequencerController.setSelectedTrackStepLengthMultiplier(multiplier);
};

//--------------------------------------------------------------
// Pattern Settings
//
const startStep = function(stepNumber){
  sequencerController.setSelectedPatternStartStep(stepNumber-1);
};

const endStep = function(stepNumber) {
  sequencerController.setSelectedPatternEndStep(stepNumber-1);
};

const patternType = function(type) {
  sequencerController.setSelectedPatternType(type);
};

const patternMute = function(mute) {
  sequencerController.setSelectedPatternMute(mute);
};

//--------------------------------------------------------------
// Pattern Operations
//
const random = function() {
  sequencerController.random();
};

const randomFill = function() {
  sequencerController.randomFill();
};

const randomThin = function() {
  sequencerController.randomFill(0);
};

const fill = function() {
  sequencerController.fill();
};

const clear = function() {
  sequencerController.fill(0);
};

const firstColumn = function() {
  sequencerController.firstColumn();
};

const reverse = function() {
  sequencerController.reverse();
};

const invert = function() {
  sequencerController.invert();
};

const replace = function() {
  sequencerController.replace();
};

const shiftleft = function() {
  sequencerController.rotate(1);
};

const shiftup = function() {
  sequencerController.rotate(ROW_LENGTH);
};

const shiftright = function() {
  sequencerController.rotate(-1);
};

const shiftdown = function() {
  sequencerController.rotate(-ROW_LENGTH);
};

//--------------------------------------------------------------
// Persistence
//
const copy = function() {
  sequencerController.copyPattern();
};

const paste = function() {
  sequencerController.pastePattern();
};

var save = function() {
  storageController.save();
};

const load = function(path, ...values) {
  storageController.load(path, ...Array.from(values));
};

const importFile = function(filepath) {
  storageController.import(filepath);
};

const exportFile = function(filepath) {
  storageController.export(filepath);
};
