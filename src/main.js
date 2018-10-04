import MaxConsole from './MaxConsole';
console = new MaxConsole();

import { Config, Controller, Model, View } from '.';
outlets = Config.NUMBER_OF.OUTLETS;
const model = new Model;
const controller = new Controller(model, new View(model));

export function bang() { controller.refreshViews(); }
export function reset() { controller.reset(); }
export function load(path, jsonString) { if (path === 'global') controller.load(jsonString); }

export function setScale(...pitchClasses) { controller.setScale(pitchClasses); }
export function stepLength(stepLength) { controller.setGlobalStepDuration(stepLength); }

export function basePitch(pitch) { controller.setSlectedTrackPitch(pitch); }
export function baseVelocity(velocity) { controller.setSelectedTrackVelocity(velocity); }
export function durationScale(scale) { controller.setSlectedTrackGate(scale); }
export function trackMultiplier() { controller.setSelectedTrackDurationMultiplier; }
export function trackMute(mute) { controller.setSelectedTrackMute(mute); }

// TODO: subtract the 1 in Max land
export function startStep(stepNumber) { controller.setSelectedPatternStart(stepNumber - 1); }
export function endStep(stepNumber) { controller.setSelectedPatternEnd(stepNumber - 1); }
export function patternMute(mute) { controller.setSelectedPatternMute(mute); }

export function track(trackIndex) { controller.selectTrack(trackIndex); }
export function pattern(patternIndex) { controller.selectPattern(patternIndex); }
export function stepValue(value) { controller.selectOrToggleValue(value); }

export function notein(pitch, velocity) { controller.handleLaunchpadNote(pitch, velocity); }
export function ctlin(cc, val) { controller.handleLaunchpadCC(cc, val); }
export function note(pitch, velocity) { controller.handleTrackNote(pitch, velocity); }
export function clock(clockIndex) { controller.handleClockTick(clockIndex); }
export function grid(x, y) { controller.handleGridClick(x, y); }

export function shiftleft() { controller.shiftSelectedPatternLeft(); }
export function shiftright() { controller.shiftSelectedPatternRight(); }
export function shiftup() { controller.shiftSelectedPatternUp(); }
export function shiftdown() { controller.shiftSelectedPatternDown(); }
export function reverse() { controller.reverseSelectedPattern(); }
export function random() { controller.randomizeSelectedPattern(); }
export function invert() { controller.invertSelectedPattern(); }
export function copy() { controller.copyStepsFromSelectedPattern(); }
export function paste() { controller.pasteStepsToSelectedPattern(); }

console.log(
  `________________________________________________________________________________
reloaded at: ${new Date}`
);
