import { MidiController, Sequencer } from '../../src';
import assert from 'assert';

describe.skip('MidiController', () => {

  let sequencer;
  let controller;

  beforeEach(() => {
    sequencer = new Sequencer;
    controller = new MidiController(sequencer);
  });

  describe('trackPitchOverride(pitch, enabled)', () => {

    const _ = null;

    const setTrackPitchOverrides = (...pitches) => pitches.map((pitch) => controller.trackPitchOverride(pitch, 127));

    const pitchOverrides = () => sequencer.tracks.map(track => track.pitchOverride);

    const velocityOverrides = () => sequencer.tracks.map(track => track.velocityOverride);

    describe('enabling a pitchOverride', () => {
      it('sets pitchOverride for track 1, then 2, then 3, then 4', () => {
        controller.trackPitchOverride(1, 127);
        assert.deepEqual(pitchOverrides(), [1, _, _, _]);
        controller.trackPitchOverride(2, 127);
        assert.deepEqual(pitchOverrides(), [1, 2, _, _]);
        controller.trackPitchOverride(3, 127);
        assert.deepEqual(pitchOverrides(), [1, 2, 3, _]);
        controller.trackPitchOverride(4, 127);
        assert.deepEqual(pitchOverrides(), [1, 2, 3, 4]);
      });

      it('wraps around to track 1 on the fifth note, track 2 on the sixth note, etc', () => {
        setTrackPitchOverrides(1, 2, 3, 4, 5, 6);
        return assert.deepEqual(pitchOverrides(), [5, 6, 3, 4]);
      });

      it('sets velocityOverrides in a similar fashion', () => {
        controller.trackPitchOverride(1, 6);
        assert.deepEqual(velocityOverrides(), [6, _, _, _]);
        controller.trackPitchOverride(2, 7);
        assert.deepEqual(velocityOverrides(), [6, 7, _, _]);
        controller.trackPitchOverride(3, 8);
        assert.deepEqual(velocityOverrides(), [6, 7, 8, _]);
        controller.trackPitchOverride(4, 9);
        assert.deepEqual(velocityOverrides(), [6, 7, 8, 9]);
        controller.trackPitchOverride(5, 10);
        assert.deepEqual(velocityOverrides(), [10, 7, 8, 9]);
      });
    });

    describe('disabling a pitchOverride', () => {

      it('removes the pitchOverride for the corresponding track when no wrap-around has occurred', () => {
        setTrackPitchOverrides(1, 2, 3, 4);
        controller.trackPitchOverride(1, 0);
        assert.deepEqual(pitchOverrides(), [_, 2, 3, 4]);
        controller.trackPitchOverride(3, 0);
        assert.deepEqual(pitchOverrides(), [_, 2, _, 4]);
        controller.trackPitchOverride(4, 0);
        assert.deepEqual(pitchOverrides(), [_, 2, _, _]);
        controller.trackPitchOverride(2, 0);
        assert.deepEqual(pitchOverrides(), [_, _, _, _]);
      });

      it('reverts to the previous pitchOverride after a wrap-around occurs', () => {
        setTrackPitchOverrides(1, 2, 3, 4, 5, 6);
        controller.trackPitchOverride(5, 0);
        assert.deepEqual(pitchOverrides(), [1, 6, 3, 4]);
        controller.trackPitchOverride(6, 0);
        assert.deepEqual(pitchOverrides(), [1, 2, 3, 4]);
      });

      it('does nothing when a pitch, which was supplanted by wrap-around, is set to off', () => {
        setTrackPitchOverrides(1, 2, 3, 4, 5, 6);
        controller.trackPitchOverride(2, 0);
        assert.deepEqual(pitchOverrides(), [5, 6, 3, 4]);
      });

      it('removes the pitchOverride after a wrap-around if the previous pitch has already set to off', () => {
        setTrackPitchOverrides(1, 2, 3, 4, 5, 6);
        controller.trackPitchOverride(2, 0);
        controller.trackPitchOverride(6, 0);
        assert.deepEqual(pitchOverrides(), [5, _, 3, 4]);
      });

      it('removes the velocityOverrides in a similar fashion', () => {
        controller.trackPitchOverride(1, 6);
        controller.trackPitchOverride(2, 7);
        controller.trackPitchOverride(3, 8);
        controller.trackPitchOverride(4, 9);
        controller.trackPitchOverride(5, 10);
        controller.trackPitchOverride(6, 11);
        controller.trackPitchOverride(1, 0);
        controller.trackPitchOverride(6, 0);
        controller.trackPitchOverride(4, 0);
        assert.deepEqual(velocityOverrides(), [10, 7, 8, _]);
      });
    });
  });

  describe('globalTranspose(amount, enabled)', () => {

    describe('enabling a transposition', () =>
      it("sets seqeuncer.globalTranspose to the amount", () => {
        controller.globalTranspose(17, true);
        assert.equal(sequencer.globalTranspose, 17);
      })
    );

    describe('disabling a transposition', () => {
      describe('no other transpositions enabled', () =>
        it("resets seqeuncer.globalTranspose to 0", () => {
          controller.globalTranspose(17, true);
          controller.globalTranspose(17, false);
          assert.equal(sequencer.globalTranspose, 0);
        })
      );

      describe('disabling the most-recently enabled transposition', () =>
        it("sets sequencer.globalTranspose to the current most-recently enabled transposition", () => {
          controller.globalTranspose(5, true);
          controller.globalTranspose(17, true);
          controller.globalTranspose(17, false);
          assert.equal(sequencer.globalTranspose, 5);
        })
      );

      describe('disabling other than the most-recently enabled transposition', () =>
        it("does not change sequencer.globalTranspose", () => {
          controller.globalTranspose(5, true);
          controller.globalTranspose(17, true);
          controller.globalTranspose(5, false);
          assert.equal(sequencer.globalTranspose, 17);
        })
      );

      describe("interleaved disabling", () =>
        it("always sets sequencer.globalTranspose to the current most-recently enabled transposition", () => {
          controller.globalTranspose(1, true);
          controller.globalTranspose(2, true);
          controller.globalTranspose(3, true);
          controller.globalTranspose(4, true);
          assert.equal(sequencer.globalTranspose, 4);
          controller.globalTranspose(3, false);
          assert.equal(sequencer.globalTranspose, 4);
          controller.globalTranspose(4, false);
          assert.equal(sequencer.globalTranspose, 2);
          controller.globalTranspose(1, false);
          assert.equal(sequencer.globalTranspose, 2);
          controller.globalTranspose(2, false);
          assert.equal(sequencer.globalTranspose, 0);
        })
      );
    });
  });
});

