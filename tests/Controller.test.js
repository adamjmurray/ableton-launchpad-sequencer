import { Config, Controller, Model, View } from '../src';
const { OUTLET, LAUNCHPAD, LAUNCHPAD_COLOR } = Config;
import assert from 'assert';

let model;
let view;
let controller;

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
      const PRESS = 127;
      const LIFT = 0;
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
