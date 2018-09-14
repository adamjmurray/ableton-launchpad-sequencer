import { Scale } from '../../src';
import assert from 'assert';

describe('Scale', () => {
  describe('pitchClasses', () => {
    it('default to [0...11]', () => {
      const scale = new Scale;
      assert.deepEqual(scale.pitchClasses, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    });
  });

  describe('map(pitch, scaleOffset)', () => {
    it("doesn't change the pitch if scaleOffset is 0", () => {
      const scale = new Scale;
      assert.equal(scale.map(60, 0), 60);
      assert.equal(scale.map(75, 0), 75);
    });

    it('adds the scaleOffset to the pitch with the default (chromatic) scale', () => {
      const scale = new Scale;
      assert.equal(scale.map(60, 1), 61);
      assert.equal(scale.map(60, 2), 62);
      assert.equal(scale.map(60, -1), 59);
      assert.equal(scale.map(60, -2), 58);
    });

    it('adds octaves at "wrap-around" points', () => {
      const scale = new Scale([0, 7]);
      assert.equal(scale.map(60, 0), 60);
      assert.equal(scale.map(60, 1), 67);
      assert.equal(scale.map(60, 2), 72);
      assert.equal(scale.map(60, -1), 55);
      assert.equal(scale.map(60, -2), 48);
    });

    it('forces the pitch to the nearest scale pitch', () => {
      const scale = new Scale([0, 7]);
      assert.equal(scale.map(63, 0), 60);
      assert.equal(scale.map(63, 1), 67);
      assert.equal(scale.map(63, 2), 72);
      assert.equal(scale.map(63, -1), 55);
      assert.equal(scale.map(63, -2), 48);
    });
  });
});
