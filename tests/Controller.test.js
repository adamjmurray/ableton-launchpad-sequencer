import { Config, Controller, Model, View } from '../src';
const { OUTLET, LAUNCHPAD, LAUNCHPAD_COLOR, MODE } = Config;
import assert from 'assert';

let model;
let view;
let controller;

const PRESS = 127;
const LIFT = 0;

describe('Controller', () => {

  beforeEach(() => {
    model = new Model();
    view = new View(model);
    controller = new Controller(model, view);
  });

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

  describe('handleLaunchpadCC(cc, value)', () => {
    it('handles a triple press as a track mute toggle', () => {
      const trackIndex = 1;
      const trackCC = LAUNCHPAD.TOP_ROW_CC + trackIndex;

      controller.handleLaunchpadCC(trackCC, PRESS);
      controller.handleLaunchpadCC(trackCC, LIFT);
      controller.handleLaunchpadCC(trackCC, PRESS);
      controller.handleLaunchpadCC(trackCC, LIFT);
      mockOutlet.reset();

      controller.handleLaunchpadCC(trackCC, PRESS);
      assert.equal(model.selectedTrack.index, trackIndex);
      assertViewsUpdatedForTrackMuteChange(model.selectedTrack);
      mockOutlet.reset();

      controller.handleLaunchpadCC(trackCC, LIFT);
      assert.equal(mockOutlet.calls.length, 0);
    });
  });

  describe('handleLaunchpadNote(pitch, velocity)', () => {
    const enterPatternEditMode = ({ trackIndex = 1, patternIndex = 0 } = {}) => {
      const trackCC = LAUNCHPAD.TOP_ROW_CC + trackIndex;
      const patternButtonPitch = (patternIndex + 1) * 8;

      controller.handleLaunchpadCC(trackCC, PRESS);
      controller.handleLaunchpadNote(patternButtonPitch, PRESS);
      controller.handleLaunchpadNote(patternButtonPitch, LIFT);
      controller.handleLaunchpadNote(patternButtonPitch, PRESS);
      controller.handleLaunchpadNote(patternButtonPitch, LIFT);

      assert.equal(model.mode, MODE.SEQUENCER);
      mockOutlet.reset();

      controller.handleLaunchpadNote(patternButtonPitch, PRESS);

      return { trackCC, patternButtonPitch };
    }

    it('handles a triple press of the right column while a top row button is held down as a toggle for pattern edit mode', () => {
      enterPatternEditMode();
      assert.equal(model.mode, MODE.PATTERN_EDIT);
    });

    it('exits pattern edit mode when a pattern press happens again', () => {
      const { trackCC, patternButtonPitch } = enterPatternEditMode();
      controller.handleLaunchpadNote(patternButtonPitch, LIFT);
      controller.handleLaunchpadCC(trackCC, LIFT);
      assert.equal(model.mode, MODE.PATTERN_EDIT);
      controller.handleLaunchpadNote(patternButtonPitch, PRESS);
      assert.equal(model.mode, MODE.SEQUENCER);
    });

    it('does not exit pattern edit mode if another pattern press happens while a top row button is held', () => {
      const { patternButtonPitch } = enterPatternEditMode();
      controller.handleLaunchpadNote(patternButtonPitch, LIFT);
      assert.equal(model.mode, MODE.PATTERN_EDIT);
      // trackButton is still held after enterPatternEditMode()
      controller.handleLaunchpadNote(patternButtonPitch, PRESS);
      assert.equal(model.mode, MODE.PATTERN_EDIT);
    });

    it('can set the pattern start and end step from pattern edit mode', () => {
      enterPatternEditMode();
      controller.handleLaunchpadNote(16, PRESS); // stepIndex 8
      assert.equal(model.selectedPattern.startStepIndex, 0);
      assert.equal(model.selectedPattern.endStepIndex, 63);
      controller.handleLaunchpadNote(39, PRESS); // stepIndex 23
      controller.handleLaunchpadNote(16, LIFT); // stepIndex 8
      controller.handleLaunchpadNote(39, LIFT); // stepIndex 23
      assert.equal(model.selectedPattern.startStepIndex, 8);
      assert.equal(model.selectedPattern.endStepIndex, 23);
    });

    // TODO: setting grid steps
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
