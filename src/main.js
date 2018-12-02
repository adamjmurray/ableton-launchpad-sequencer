import MaxConsole from './MaxConsole';
console = new MaxConsole();

import { Config, Controller, Model, View } from '.';

const { OUTLET } = Config;
const outletNames = Object.keys(OUTLET);
outlets = outletNames.length;
outletNames.forEach((name, index) => setoutletassist(index, name));

const model = new Model;
const controller = new Controller(model, new View(model));

export function init() { controller.initViews(); }
export function bang() { controller.refreshViews(); }
export function reset() { controller.reset(); }
export function setmodel(...data) { controller.setModel(data); }

export function scale(...pitchClasses) { controller.setScale(pitchClasses); }
export function duration(duration) { controller.setDuration(duration); }

export function pitch(pitch) { controller.setTrackPitch(pitch); }
export function velocity(velocity) { controller.setTrackVelocity(velocity); }
export function gate(gate) { controller.setTrackGate(gate); }
export function multiplier(multiplier) { controller.setTrackMultiplier(multiplier); }
export function trackmute(mute) { controller.setTrackMute(mute); }

export function start(stepNumber) { controller.setPatternStart(stepNumber - 1); }
export function end(stepNumber) { controller.setPatternEnd(stepNumber - 1); }
export function patternmute(mute) { controller.setPatternMute(mute); }
export function grid(x, y) { controller.handleGridClick(x, y); }

export function track(trackIndex) { controller.selectTrack(trackIndex); }
export function pattern(patternIndex) { controller.selectPattern(patternIndex); }
export function value(value) { controller.selectOrToggleValue(value); }

export function lpnote(pitch, velocity) { controller.handleLaunchpadNote(pitch, velocity); }
export function lpcc(cc, value) { controller.handleLaunchpadCC(cc, value); }
export function note(pitch, velocity) { controller.handleTrackNote(pitch, velocity); }
export function clock(index) { controller.handleClockTick(index); }

export function shiftleft() { controller.shiftSelectedPatternLeft(); }
export function shiftright() { controller.shiftSelectedPatternRight(); }
export function shiftup() { controller.shiftSelectedPatternUp(); }
export function shiftdown() { controller.shiftSelectedPatternDown(); }
export function reverse() { controller.reverseSelectedPattern(); }
export function random() { controller.randomizeSelectedPattern(); }
export function copy() { controller.copyStepsFromSelectedPattern(); }
export function paste() { controller.pasteStepsToSelectedPattern(); }

console.log(
  `________________________________________________________________________________
reloaded at: ${new Date}`
);
