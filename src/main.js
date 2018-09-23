import './polyfills';
import { Config, Controller, Model, View } from './';

const controller = new Controller(new Model, new View);

outlets = Config.NUMBER_OF.OUTLETS;

bang = controller.refreshViews;
reset = controller.reset;
load = controller.load;

setScale = controller.setScale;
stepLength = controller.setGlobalStepDuration;

basePitch = controller.setSlectedTrackPitch;
baseVelocity = controller.setSelectedTrackVelocity;
durationScale = controller.setSlectedTrackGate;
trackMultiplier = controller.setSelectedTrackDurationMultiplier;
trackMute = controller.setSelectedTrackMute;

// TODO: subtract the 1 in Max land
startStep = stepNumber => controller.setSelectedPatternStartStepIndex(stepNumber - 1);
endStep = stepNumber => controller.setSelectedPatternEndStepIndex(stepNumber - 1);
patternMute = controller.setSelectedPatternMute;

track = controller.selectTrack;
pattern = controller.selectPattern;
stepValue = controller.selectOrToggleValue;

notein = controller.handleLaunchpadNote;
ctlin = controller.handleLaunchpadCC;
note = controller.handleTrackNote;
clock = controller.handleClockTick;
grid = (x, y) => controller.handleGridPress(x, y, true);

shiftleft = controller.shiftSelectedPatternLeft;
shiftright = controller.shiftSelectedPatternRight;
shiftup = controller.shiftSelectedPatternUp;
shiftdown = controller.shiftSelectedPatternDown;
reverse = controller.reverseSelectedPattern;
invert = controller.invertSelectedPattern;
copy = controller.copyStepsFromSelectedPattern;
paste = controller.pasteStepsToSelectedPattern;


console.log(
  `________________________________________________________________________________
reloaded at: ${new Date}`
);
