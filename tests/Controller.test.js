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

      assert.equal(mockOutlet.calls.length, 4);
      assert.deepStrictEqual(
        mockOutlet.calls[0],
        [OUTLET.LAUNCHPAD_CC, LAUNCHPAD.TOP_ROW_CC + trackIndex, LAUNCHPAD_COLOR.MUTE_COLOR]
      );
      assert.deepStrictEqual(
        mockOutlet.calls[1],
        [OUTLET.TRACK_INDEX, trackIndex]
      );
      assert.deepStrictEqual(
        mockOutlet.calls[2],
        [OUTLET.TRACK_INFO, trackIndex + 1, 60, 70, 0.9]
      );
      assert.deepStrictEqual(
        mockOutlet.calls[3],
        [OUTLET.TRACK_MUTE, true]
      );
    });
  });

  // TODO...
});
