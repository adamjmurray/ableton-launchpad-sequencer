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

export function scale(...offsets) { controller.setScaleOffsetsRelativeToC(offsets); }
export function root(root) { controller.setScaleRoot(root); }
export function duration(duration) { controller.setDuration(duration); }
export function modsum(mode) { controller.setModulationSummingMode(mode); }
export function modslew(slew) { controller.setModulationSlew(slew); }

export function pitch(pitch) { controller.setTrackPitch(pitch); }
export function velocity(velocity) { controller.setTrackVelocity(velocity); }
export function gate(gate) { controller.setTrackGate(gate); }
export function gatemode(mode) { controller.setTrackGateMode(mode) }
export function gatesum(mode) { controller.setTrackGateSummingMode(mode); }
export function multiplier(multiplier) { controller.setTrackMultiplier(multiplier); }
export function trackmute(mute) { controller.setTrackMute(mute); }

export function start(stepNumber) { controller.setPatternStart(stepNumber - 1); }
export function end(stepNumber) { controller.setPatternEnd(stepNumber - 1); }
export function patternmute(mute) { controller.setPatternMute(mute); }
export function grid(x, y, enabled) { controller.handleGridClick(x, y, enabled); }

export function track(trackIndex) { controller.selectTrack(trackIndex); }
export function pattern(patternIndex) { controller.selectPattern(patternIndex); }
export function value(value) { controller.selectOrToggleValue(value); }

export function lpnote(pitch, velocity) { controller.handleLaunchpadNote(pitch, velocity); }
export function lpcc(cc, value) { controller.handleLaunchpadCC(cc, value); }
export function note(pitch, velocity) { controller.handleTrackNote(pitch, velocity); }
export function cc(cc, value) { controller.handleTrackCC(cc, value); }
export function clock(index) { controller.handleClockTick(index); }

export function shiftleft() { controller.shiftPatternLeft(); }
export function shiftright() { controller.shiftPatternRight(); }
export function shiftup() { controller.shiftPatternUp(); }
export function shiftdown() { controller.shiftPatternDown(); }
export function reverse() { controller.reversePattern(); }
export function random() { controller.randomizePattern(); }
export function clear() { controller.clearPattern(); }
export function copy() { controller.copyPatternSteps(); }
export function paste() { controller.pastePatternSteps(); }

export function trackreverse() { controller.reverseTrack(); }
export function trackrandom() { controller.randomizeTrack(); }
export function trackclear() { controller.clearTrack(); }
export function trackcopy() { controller.copyTrackSteps(); }
export function trackpaste() { controller.pasteTrackSteps(); }

console.log(
  `________________________________________________________________________________
reloaded at: ${new Date}`
);
