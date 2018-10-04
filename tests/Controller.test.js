import { Config, Controller, Model, View } from '../src';
const { LAUNCHPAD, LAUNCHPAD_COLOR, MODE, NUMBER_OF, OUTLET, PATTERN } = Config;
import assert from 'assert';

let model;
let view;
let controller;

const PRESS = 127;
const LIFT = 0;

const toTrackCC = (trackIndex) => LAUNCHPAD.TOP_ROW_CC + trackIndex;
const toPatternButtonPitch = (patternIndex) => patternIndex * 16 + 8;
const toStepButtonPitch = (stepIndex) => {
  const x = stepIndex % NUMBER_OF.COLUMNS;
  const y = Math.floor(stepIndex / NUMBER_OF.COLUMNS);
  return x + (16 * y);
};

const pressTrackButton = (trackIndex) =>
  controller.handleLaunchpadCC(toTrackCC(trackIndex), PRESS);
const liftTrackButton = (trackIndex) =>
  controller.handleLaunchpadCC(toTrackCC(trackIndex), LIFT);
const pressAndLiftTrackButton = (trackIndex) => {
  pressTrackButton(trackIndex);
  liftTrackButton(trackIndex);
}

const pressPatternButton = (patternIndex) =>
  controller.handleLaunchpadNote(toPatternButtonPitch(patternIndex), PRESS);
const liftPatternButton = (patternIndex) =>
  controller.handleLaunchpadNote(toPatternButtonPitch(patternIndex), LIFT);
const pressAndLiftPatternButton = (patternIndex) => {
  pressPatternButton(patternIndex);
  liftPatternButton(patternIndex);
}

const pressStepButton = (stepIndex) =>
  controller.handleLaunchpadNote(toStepButtonPitch(stepIndex), PRESS);
const liftStepButton = (stepIndex) =>
  controller.handleLaunchpadNote(toStepButtonPitch(stepIndex), LIFT);
const pressAndLiftStepButton = (stepIndex) => {
  pressStepButton(stepIndex);
  liftStepButton(stepIndex);
};

const enterPatternEditMode = ({
  trackIndex = 0,
  patternIndex = 0,
  liftTrackButton: liftTB = true,
  liftPatternButton: liftPB = true,
} = {}) => {
  pressTrackButton(trackIndex);
  pressAndLiftPatternButton(patternIndex);
  pressAndLiftPatternButton(patternIndex);

  pressPatternButton(patternIndex);
  if (liftTB) {
    liftTrackButton(trackIndex);
  }
  if (liftPB) {
    liftPatternButton(patternIndex);
  }
}

const assertViewsUpdatedForTrackMuteChange = (track) => {
  assert.equal(mockOutlet.calls.length, 4);
  assert.deepStrictEqual(
    mockOutlet.calls[0],
    [OUTLET.LAUNCHPAD_CC, LAUNCHPAD.TOP_ROW_CC + track.index, LAUNCHPAD_COLOR.MUTE_COLOR]
  );
  assert.deepStrictEqual(
    mockOutlet.calls[1],
    [OUTLET.TRACK_INDEX, track.index]
  );
  assert.deepStrictEqual(
    mockOutlet.calls[2],
    [OUTLET.TRACK_INFO, track.index + 1, track.pitch, track.velocity, track.gate]
  );
  assert.deepStrictEqual(
    mockOutlet.calls[3],
    [OUTLET.TRACK_MUTE, track.mute]
  );
}

describe('Controller', () => {

  beforeEach(() => {
    model = new Model();
    view = new View(model);
    controller = new Controller(model, view);
  });

  describe('handleLaunchpadCC(cc, value)', () => {
    it('handles a triple press as a track mute toggle', () => {
      const trackIndex = 1;

      pressAndLiftTrackButton(trackIndex);
      pressAndLiftTrackButton(trackIndex);
      mockOutlet.reset();

      pressTrackButton(trackIndex);
      assert.equal(model.selectedTrack.index, trackIndex);
      assertViewsUpdatedForTrackMuteChange(model.selectedTrack);
      mockOutlet.reset();

      liftTrackButton(trackIndex);
      assert.equal(mockOutlet.calls.length, 0);
    });
  });

  describe('handleLaunchpadNote(pitch, velocity)', () => {
    it('handles a triple press of the right column while a top row button is held down as a toggle for pattern edit mode', () => {
      enterPatternEditMode();
      assert.equal(model.mode, MODE.PATTERN_EDIT);
    });

    it('exits pattern edit mode when a pattern press happens again', () => {
      enterPatternEditMode();
      pressPatternButton(6);
      assert.equal(model.mode, MODE.SEQUENCER);
      // and it selects the pattern
      assert.equal(model.selectedPattern.index, 6);
    });

    it('does not exit pattern edit mode if another pattern press happens while a top row button is held', () => {
      enterPatternEditMode({ liftTrackButton: false });
      assert.equal(model.mode, MODE.PATTERN_EDIT);
      pressPatternButton(0);
      assert.equal(model.mode, MODE.PATTERN_EDIT);
    });

    it('can set the pattern start and end step from pattern edit mode', () => {
      enterPatternEditMode();
      pressStepButton(8);
      assert.equal(model.selectedPattern.startStepIndex, 0);
      assert.equal(model.selectedPattern.endStepIndex, 63);
      pressAndLiftStepButton(23);
      liftStepButton(8);
      assert.equal(model.selectedPattern.startStepIndex, 8);
      assert.equal(model.selectedPattern.endStepIndex, 23);
    });

    // TODO: setting grid steps
  });

  describe('handleClockTick(clockIndex)', () => {
    it('does not generate notes for empty tracks', () => {
      controller.handleClockTick(0);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.NOTE), []);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.CC), []);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.AFTERTOUCH), []);
    });


    it('generates notes for positive clock ticks when gate pattern steps have values', () => {
      model.tracks[0].patterns[PATTERN.GATE1].steps[0] = 1;
      controller.handleClockTick(0);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.NOTE), [
        [60, 70, 0.9],
      ]);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.CC), []);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.AFTERTOUCH), []);
    });

    it('generates notes for all track', () => {
      model.tracks[0].patterns[PATTERN.GATE1].steps[0] = 1;
      model.tracks[1].patterns[PATTERN.GATE1].steps[0] = 2;
      model.tracks[2].patterns[PATTERN.GATE2].steps[0] = 3;
      model.tracks[3].patterns[PATTERN.GATE3].steps[0] = 4;

      controller.handleClockTick(0);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.NOTE), [
        [60, 70, 0.9],
        [61, 70, 0.9],
        [62, 70, 0.9],
        [63, 70, 0.9],
      ]);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.CC), []);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.AFTERTOUCH), []);
    });

    it('can set velocity and duration', () => {
      model.tracks[0].gate = 1;
      model.tracks[0].patterns[PATTERN.GATE1].steps[0] = 1;
      model.tracks[0].patterns[PATTERN.VELOCITY].steps[0] = 4;
      model.tracks[0].patterns[PATTERN.DURATION].steps[0] = 1;

      controller.handleClockTick(0);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.NOTE), [
        [60, 127, 2],
      ]);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.CC), []);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.AFTERTOUCH), []);
    });
  });

  describe('selectTrack(index)', () => {
    it("sets the model's selectedTrack and selectedTrackIndex", () => {
      controller.selectTrack(1);
      assert.equal(model.selectedTrack, model.tracks[1]);
      assert.equal(model.selectedTrackIndex, 1);

      controller.selectTrack(3);
      assert.equal(model.selectedTrack, model.tracks[3]);
      assert.equal(model.selectedTrackIndex, 3);
    });

    it.skip('updates views', () => {
      controller.selectTrack(1);
      console.log(mockOutlet.calls);
      // TODO: It's a little unreasonable to test this exactly. Need to spot check.
      // Or we could wrap the view in a proxy that can report function calls like our mockOutlet
    });
  });

  describe('setSelectedTrackMute(mute)', () => {
    it('updates views', () => {
      const trackIndex = 2;
      controller.selectTrack(trackIndex);
      mockOutlet.reset();

      controller.setSelectedTrackMute(true);
      assertViewsUpdatedForTrackMuteChange(model.selectedTrack);
    });
  });

  // TODO...
});
