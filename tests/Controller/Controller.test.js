import { Config, Controller, Model, View } from '../../src';
const { GUI_COLOR, LAUNCHPAD, LAUNCHPAD_COLOR, MODE, NUMBER_OF, OUTLET, PATTERN } = Config;

const MOD_CC = 1;
const PRESS = 127;
const LIFT = 0;

let model;
let view;
let controller;
let track; // first track for convenience in single track tests
let patterns; // first track's patterns for convenience in single track tests
let gate1; // first gate pattern of first track
let gate2; // second gate pattern of first track
let gate3; // third gate pattern of first track

const setGateSteps = (gate1Value, gate2Value, gate3Value, stepIndex = 0) => {
  gate1.steps[stepIndex] = gate1Value;
  gate2.steps[stepIndex] = gate2Value;
  gate3.steps[stepIndex] = gate3Value;
};

const assertClockTickNotes = (expectedNotes, stepIndex = 0) => {
  mockOutlet.reset();
  controller.handleClockTick(stepIndex);
  assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.NOTE), expectedNotes);
}

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
    [OUTLET.GUI, 'track', 'mute', track.mute]
  );
  assert.deepStrictEqual(
    mockOutlet.calls[1],
    [OUTLET.GUI, 'track', 'index-mute', track.index, track.mute]
  );
  assert.deepStrictEqual(
    mockOutlet.calls[2],
    [OUTLET.LAUNCHPAD_CC, LAUNCHPAD.TOP_ROW_CC + track.index, LAUNCHPAD_COLOR.MUTE_COLOR]
  );
  assert.deepStrictEqual(
    mockOutlet.calls[3],
    [OUTLET.STORAGE, 'tracks', track.index, 'mute', track.mute]
  );
}

describe('Controller', () => {

  beforeEach(() => {
    model = new Model();
    view = new View(model);
    controller = new Controller(model, view);
    track = model.tracks[0];
    gate1 = track.patterns[PATTERN.GATE1];
    gate2 = track.patterns[PATTERN.GATE2];
    gate3 = track.patterns[PATTERN.GATE3];
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
    });

    it('generates notes for positive clock ticks when gate pattern steps have values', () => {
      model.tracks[0].patterns[PATTERN.GATE1].steps[0] = 1;
      controller.handleClockTick(0);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.NOTE), [
        [60, 70, 0.9],
      ]);
    });

    it('generates notes for all tracks', () => {
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
    });

    it('generates modulation and aftertouch values of 0 for empty steps', () => {
      controller.handleClockTick(0);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.CC), [[MOD_CC, 0]]);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.AFTERTOUCH), [[0]]);
    });

    it('sums modulation and aftertouch values across tracks', () => {
      model.tracks[0].patterns[PATTERN.MODULATION].steps[0] = 1;
      model.tracks[2].patterns[PATTERN.MODULATION].steps[0] = 1;
      model.tracks[0].patterns[PATTERN.AFTERTOUCH].steps[0] = 2;
      model.tracks[3].patterns[PATTERN.AFTERTOUCH].steps[0] = 1;

      controller.handleClockTick(0);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.CC), [[MOD_CC, 64]]);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.AFTERTOUCH), [[95]]);
    });


    it('outputs correct modulation and aftertouch values when using the track step duration multiplier', () => {
      const [track1, track2] = model.tracks;
      const pattern1 = track1.patterns[PATTERN.MODULATION];
      const pattern2 = track2.patterns[PATTERN.MODULATION];

      track1.durationMultiplier = 2;
      pattern1.steps[0] = 1;
      pattern1.steps[1] = 2;
      pattern2.steps[0] = 1; // + 1
      pattern2.steps[1] = 2; // + 1
      pattern2.steps[2] = 2; // + 2
      pattern2.steps[3] = 0; // + 2

      controller.handleClockTick(0);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.CC), [[MOD_CC, 64]]);

      mockOutlet.reset();
      controller.handleClockTick(1);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.CC), [[MOD_CC, 95]]);

      mockOutlet.reset();
      controller.handleClockTick(2);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.CC), [[MOD_CC, 127]]);

      mockOutlet.reset();
      controller.handleClockTick(3);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.CC), [[MOD_CC, 64]]);
    });

    it('respects the tracks max modulation and aftertouch settings', () => {
      model.tracks[0].maxModulation = 10;
      model.tracks[0].patterns[PATTERN.MODULATION].steps[0] = 4;
      model.tracks[2].maxModulation = 33;
      model.tracks[2].patterns[PATTERN.MODULATION].steps[0] = 4;

      model.tracks[0].maxAftertouch = 100;
      model.tracks[0].patterns[PATTERN.AFTERTOUCH].steps[0] = 3; // should be 75
      model.tracks[3].maxAftertouch = 40;
      model.tracks[3].patterns[PATTERN.AFTERTOUCH].steps[0] = 1; // should be 10

      controller.handleClockTick(0);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.CC), [[MOD_CC, 43]]);
      assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.AFTERTOUCH), [[85]]);
    });

    describe('rendering', () => {
      const firstStepPosition = [2, 2, 14, 14];
      const secondStepPosition = [20, 2, 32, 14];

      it('renders the current step on the grids', () => {
        controller.handleClockTick(0);
        assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.GUI), [
          ['grid', 'frgb', GUI_COLOR.SEQUENCER_STEP],
          ['grid', 'paintrect', ...firstStepPosition],
        ]);
        assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.LAUNCHPAD_NOTE), [
          [0, LAUNCHPAD_COLOR.SEQUENCER_STEP],
        ]);
      });

      it('updates the previous step when rendering a new step', () => {
        controller.handleClockTick(0);
        mockOutlet.reset();
        controller.handleClockTick(1);
        assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.GUI), [
          ['grid', 'frgb', GUI_COLOR.STEP_VALUE[0]],
          ['grid', 'paintrect', ...firstStepPosition],
          ['grid', 'frgb', GUI_COLOR.SEQUENCER_STEP],
          ['grid', 'paintrect', ...secondStepPosition],
        ]);
        assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.LAUNCHPAD_NOTE), [
          [0, LAUNCHPAD_COLOR.STEP_VALUES[0]],
          [1, LAUNCHPAD_COLOR.SEQUENCER_STEP],
        ]);
      });

      it('respects the track step duration multiplier', () => {
        model.selectedTrack.durationMultiplier = 2;

        controller.handleClockTick(0);
        assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.GUI), [
          ['grid', 'frgb', GUI_COLOR.SEQUENCER_STEP],
          ['grid', 'paintrect', ...firstStepPosition],
        ]);
        assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.LAUNCHPAD_NOTE), [
          [0, LAUNCHPAD_COLOR.SEQUENCER_STEP],
        ]);
        mockOutlet.reset();

        controller.handleClockTick(1);
        assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.GUI), []);
        assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.LAUNCHPAD_NOTE), []);

        controller.handleClockTick(2);
        assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.GUI), [
          ['grid', 'frgb', GUI_COLOR.STEP_VALUE[0]],
          ['grid', 'paintrect', ...firstStepPosition],
          ['grid', 'frgb', GUI_COLOR.SEQUENCER_STEP],
          ['grid', 'paintrect', ...secondStepPosition],
        ]);
        assert.deepStrictEqual(mockOutlet.callsFor(OUTLET.LAUNCHPAD_NOTE), [
          [0, LAUNCHPAD_COLOR.STEP_VALUES[0]],
          [1, LAUNCHPAD_COLOR.SEQUENCER_STEP],
        ]);
      });
    });

    describe('pitch gates', () => {
      beforeEach(() => {
        controller.setTrackGateMode(MODE.GATE.PITCH, 0, false);
      });

      describe('add summing mode', () => {
        it('starts from the track pitch and adds all the track values together', () => {
          controller.setTrackGateSummingMode(MODE.GATE_SUMMING.ADD, 0, false);
          const { pitch, velocity, gate } = track;

          setGateSteps(0, 0, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(0, 1, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(1, 0, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);

          setGateSteps(0, 1, 1);
          assertClockTickNotes([[pitch + 1, velocity, gate]]);
          setGateSteps(1, 1, 1);
          assertClockTickNotes([[pitch + 2, velocity, gate]]);
          setGateSteps(1, 2, 1);
          assertClockTickNotes([[pitch + 3, velocity, gate]]);
          setGateSteps(2, 2, 2);
          assertClockTickNotes([[pitch + 5, velocity, gate]]);
          setGateSteps(4, 3, 2);
          assertClockTickNotes([[pitch + 8, velocity, gate]]);
          setGateSteps(3, 4, 4);
          assertClockTickNotes([[pitch + 10, velocity, gate]])
          setGateSteps(4, 4, 4);
          assertClockTickNotes([[pitch + 11, velocity, gate]]);
        });
      });

      describe('low summing mode', () => {
        it('starts from the track pitch and adds the lowest track value', () => {
          controller.setTrackGateSummingMode(MODE.GATE_SUMMING.LOWEST, 0, false);
          const { pitch, velocity, gate } = track;

          setGateSteps(0, 0, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(0, 1, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(1, 0, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(0, 1, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(1, 1, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(1, 2, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);

          setGateSteps(2, 2, 2);
          assertClockTickNotes([[pitch + 1, velocity, gate]]);
          setGateSteps(4, 3, 2);
          assertClockTickNotes([[pitch + 1, velocity, gate]]);
          setGateSteps(3, 4, 4);
          assertClockTickNotes([[pitch + 2, velocity, gate]])
          setGateSteps(4, 4, 4);
          assertClockTickNotes([[pitch + 3, velocity, gate]]);
        });
      });

      describe('high summing mode', () => {
        it('starts from the track pitch and adds the highest track value', () => {
          controller.setTrackGateSummingMode(MODE.GATE_SUMMING.HIGHEST, 0, false);
          const { pitch, velocity, gate } = track;

          setGateSteps(0, 0, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(0, 1, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(1, 0, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(0, 1, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(1, 1, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);

          setGateSteps(1, 2, 1);
          assertClockTickNotes([[pitch + 1, velocity, gate]]);
          setGateSteps(2, 2, 2);
          assertClockTickNotes([[pitch + 1, velocity, gate]]);
          setGateSteps(0, 3, 2);
          assertClockTickNotes([[pitch + 2, velocity, gate]]);
          setGateSteps(4, 3, 2);
          assertClockTickNotes([[pitch + 3, velocity, gate]]);
          setGateSteps(3, 4, 4);
          assertClockTickNotes([[pitch + 3, velocity, gate]])
          setGateSteps(4, 4, 4);
          assertClockTickNotes([[pitch + 3, velocity, gate]]);
        });
      });

      describe('rand summing mode', () => {
        it('starts from the track pitch and adds the value from a random track with a non-zero value', () => {
          controller.setTrackGateSummingMode(MODE.GATE_SUMMING.RANDOM, 0, false);
          const { pitch, velocity, gate } = track;
          const pitch1 = track.pitch;
          const pitch2 = track.pitch + 1;
          const pitch3 = track.pitch + 2;

          setGateSteps(0, 0, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(0, 1, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(1, 0, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(0, 1, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(1, 1, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);

          mockOutlet.reset();
          const counts = {};
          for (var i = 0; i < 100; i++) {
            setGateSteps(1, 2, 3);
            controller.handleClockTick(0);
            const randomPitch = mockOutlet.callsFor(OUTLET.NOTE)[i][0];
            counts[randomPitch] = (counts[randomPitch] || 0) + 1;
          }
          assert.deepEqual(Object.keys(counts), [pitch1, pitch2, pitch3]);
          assert(counts[pitch1] > 10);
          assert(counts[pitch2] > 10);
          assert(counts[pitch3] > 10);

          setGateSteps(4, 4, 4);
          assertClockTickNotes([[pitch + 3, velocity, gate]]);
        });
      });

      describe('multi summing mode', () => {
        it('outputs a note for each track with a non-zero value', () => {
          controller.setTrackGateSummingMode(MODE.GATE_SUMMING.MULTI, 0, false);
          const { pitch, velocity, gate } = track;

          setGateSteps(1, 0, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(0, 1, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(0, 0, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(0, 4, 0);
          assertClockTickNotes([[pitch + 3, velocity, gate]]);

          // TODO: test notes get deduped
          setGateSteps(0, 1, 2);
          assertClockTickNotes([
            [pitch, velocity, gate],
            [pitch + 1, velocity, gate],
          ]);
          setGateSteps(1, 2, 3);
          assertClockTickNotes([
            [pitch, velocity, gate],
            [pitch + 1, velocity, gate],
            [pitch + 2, velocity, gate],
          ]);
          setGateSteps(4, 3, 2);
          assertClockTickNotes([
            [pitch + 3, velocity, gate],
            [pitch + 2, velocity, gate],
            [pitch + 1, velocity, gate],
          ]);
          setGateSteps(4, 0, 1);
          assertClockTickNotes([
            [pitch + 3, velocity, gate],
            [pitch, velocity, gate],
          ]);
        });
      });
    });

    describe('velocity gates', () => {
      beforeEach(() => {
        controller.setTrackGateMode(MODE.GATE.VELOCITY, 0, false);
      });

      describe('add summing mode', () => {
        it('starts from the track velocity, and reaches the max velocity when all 3 tracks have the max value simulatenously', () => {
          controller.setTrackGateSummingMode(MODE.GATE_SUMMING.ADD, 0, false);

          const { pitch, velocity, gate } = track;
          const increment = (127 - velocity) / 11;
          assert(increment > 0);

          setGateSteps(0, 0, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(0, 1, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(1, 0, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);

          setGateSteps(0, 1, 1);
          assertClockTickNotes([[pitch, velocity + increment, gate]]);
          setGateSteps(1, 1, 1);
          assertClockTickNotes([[pitch, velocity + 2 * increment, gate]]);
          setGateSteps(1, 2, 1);
          assertClockTickNotes([[pitch, velocity + 3 * increment, gate]]);
          setGateSteps(2, 2, 2);
          assertClockTickNotes([[pitch, velocity + 5 * increment, gate]]);
          setGateSteps(4, 3, 2);
          assertClockTickNotes([[pitch, velocity + 8 * increment, gate]]);
          setGateSteps(3, 4, 4);
          assertClockTickNotes([[pitch, velocity + 10 * increment, gate]]);

          setGateSteps(4, 4, 4);
          assertClockTickNotes([[pitch, 127, gate]]);
        });
      });

      describe('low summing mode', () => {
        it('starts from the track velocity, and using the lowest value for each track, reaches the max velocity when all 3 tracks have the max value simulatenously', () => {
          controller.setTrackGateSummingMode(MODE.GATE_SUMMING.LOWEST, 0, false);

          const { pitch, velocity, gate } = track;
          const increment = (127 - velocity) / 3;
          assert(increment > 0);

          setGateSteps(0, 0, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(0, 1, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(1, 0, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(0, 1, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(1, 1, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(1, 4, 4);
          assertClockTickNotes([[pitch, velocity, gate]]);

          setGateSteps(4, 3, 2);
          assertClockTickNotes([[pitch, velocity + increment, gate]]);
          setGateSteps(4, 3, 4);
          assertClockTickNotes([[pitch, velocity + 2 * increment, gate]]);

          setGateSteps(4, 4, 4);
          assertClockTickNotes([[pitch, 127, gate]]);
        });
      });

      describe('high summing mode', () => {
        it('starts from the track velocity, and using the highest value for each track, reaches the max velocity when all 3 tracks have the max value simulatenously', () => {
          controller.setTrackGateSummingMode(MODE.GATE_SUMMING.HIGHEST, 0, false);

          const { pitch, velocity, gate } = track;
          const increment = (127 - velocity) / 3;
          assert(increment > 0);

          setGateSteps(0, 0, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(0, 1, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(1, 0, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(0, 1, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(1, 1, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);

          setGateSteps(1, 2, 1);
          assertClockTickNotes([[pitch, velocity + increment, gate]]);
          setGateSteps(2, 2, 2);
          assertClockTickNotes([[pitch, velocity + increment, gate]]);

          setGateSteps(0, 3, 1);
          assertClockTickNotes([[pitch, velocity + 2 * increment, gate]]);

          setGateSteps(4, 4, 4);
          assertClockTickNotes([[pitch, 127, gate]]);
        });
      });

      describe('rand summing mode', () => {
        it('starts from the track velocity, and using random value from each track ignoring 0 values, reaches the max velocity when all 3 tracks have the max value simulatenously', () => {
          controller.setTrackGateSummingMode(MODE.GATE_SUMMING.RANDOM, 0, false);

          const { pitch, velocity, gate } = track;
          const increment = (127 - velocity) / 3;
          assert(increment > 0);
          const vel1 = velocity;
          const vel2 = velocity + increment;
          const vel3 = velocity + 2 * increment;

          setGateSteps(0, 0, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(0, 1, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(1, 0, 0);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(0, 1, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);
          setGateSteps(1, 1, 1);
          assertClockTickNotes([[pitch, velocity, gate]]);

          mockOutlet.reset();
          const counts = {};
          for (var i = 0; i < 100; i++) {
            setGateSteps(1, 2, 3);
            controller.handleClockTick(0);
            const randomVelocity = mockOutlet.callsFor(OUTLET.NOTE)[i][1];
            counts[randomVelocity] = (counts[randomVelocity] || 0) + 1;
          }
          assert.deepEqual(Object.keys(counts), [vel1, vel2, vel3]);
          assert(counts[vel1] > 10);
          assert(counts[vel2] > 10);
          assert(counts[vel3] > 10);

          setGateSteps(4, 4, 4);
          assertClockTickNotes([[pitch, 127, gate]]);
        });
      });

      describe('multi summing mode', () => {
        it('outputs simultaneous notes for tracks with non-zero values, with pitches from 2 semitones above the track pitch for the first gate down to the track pitch on the last gate', () => {
          controller.setTrackGateSummingMode(MODE.GATE_SUMMING.MULTI, 0, false);

          const { pitch, velocity, gate } = track;
          const increment = (127 - velocity) / 3;
          assert(increment > 0);
          const pitch1 = pitch + 2;
          const pitch2 = pitch + 1;
          const pitch3 = pitch;

          setGateSteps(1, 0, 0);
          assertClockTickNotes([[pitch1, velocity, gate]]);
          setGateSteps(0, 1, 0);
          assertClockTickNotes([[pitch2, velocity, gate]]);
          setGateSteps(0, 0, 1);
          assertClockTickNotes([[pitch3, velocity, gate]]);
          setGateSteps(0, 4, 0);
          assertClockTickNotes([[pitch2, 127, gate]]);

          setGateSteps(0, 1, 1);
          assertClockTickNotes([
            [pitch2, velocity, gate],
            [pitch3, velocity, gate],
          ]);
          setGateSteps(1, 1, 1);
          assertClockTickNotes([
            [pitch1, velocity, gate],
            [pitch2, velocity, gate],
            [pitch3, velocity, gate],
          ]);
          setGateSteps(1, 2, 2);
          assertClockTickNotes([
            [pitch1, velocity, gate],
            [pitch2, velocity + increment, gate],
            [pitch3, velocity + increment, gate],
          ]);
          setGateSteps(3, 0, 2);
          assertClockTickNotes([
            [pitch1, velocity + 2 * increment, gate],
            [pitch3, velocity + increment, gate],
          ]);

          setGateSteps(4, 4, 4);
          assertClockTickNotes([
            [pitch1, 127, gate],
            [pitch2, 127, gate],
            [pitch3, 127, gate],
          ]);
        });
      });
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

    // it.skip('updates views', () => {
    //   controller.selectTrack(1);
    //   console.log(mockOutlet.calls);
    //   // TODO: It's a little unreasonable to test this exactly. Need to spot check.
    //   // Or we could wrap the view in a proxy that can report function calls like our mockOutlet
    // });
  });

  describe('setSelectedTrackMute(mute)', () => {
    it('updates views', () => {
      const trackIndex = 2;
      controller.selectTrack(trackIndex);
      mockOutlet.reset();

      controller.setTrackMute(true);
      assertViewsUpdatedForTrackMuteChange(model.selectedTrack);
    });
  });

  // TODO...
});
