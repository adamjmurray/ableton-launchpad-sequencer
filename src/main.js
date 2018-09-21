import './polyfills';
import { Config, Controller, Model, View } from './';

const controller = new Controller(new Model(new View));

outlets = Config.NUMBER_OF.OUTLETS;

bang = controller.sync;
reset = controller.reset;
load = controller.load;

setScale = controller.setScale;
stepLength = controller.setGlobalStepDuration;

basePitch = controller.setSlectedTrackBasePitch;
baseVelocity = controller.setSelectedTrackBaseVelocity;
durationScale = controller.setSlectedTrackGate;
trackMultiplier = controller.setSelectedTrackDurationMultiplier;
trackMute = controller.setSelectedTrackMute;

// TODO: subtract the 1 in Max land
startStep = stepNumber => controller.setSelectedPatternStartStep(stepNumber - 1);
endStep = stepNumber => controller.setSelectedPatternEndStep(stepNumber - 1);
patternMute = controller.setSelectedPatternMute;

track = controller.selectTrack;
pattern = controller.selectPattern;
stepValue = controller.selectValue;

notein = controller.handleLaunchpadNote;
ctlin = controller.handleLaunchpadCC;
note = controller.handleTrackNote;
clock = controller.handleClockTick;
grid = controller.handleGridPress;

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
