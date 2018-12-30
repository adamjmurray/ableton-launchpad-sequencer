import { Scale } from '../../src';

describe('Scale', () => {

  describe('pitchAt(octave, interval)', () => {
    it('adds semitones to the root at the given octave for the chromatic scale', () => {
      const scale = new Scale({ root: 0, offsets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] });
      assert.strictEqual(scale.pitchAt(5, 0), 60);
      assert.strictEqual(scale.pitchAt(6, 1), 73);
      assert.strictEqual(scale.pitchAt(0, 2), 2);
      assert.strictEqual(scale.pitchAt(4, -1), 47);
      assert.strictEqual(scale.pitchAt(5, -2), 58);
    });

    it('adds scale steps to the root for a given scale', () => {
      const scale = new Scale({ root: 0, offsets: [0, 2, 4, 5, 7, 9, 11] });
      assert.strictEqual(scale.pitchAt(5, 0), 60);
      assert.strictEqual(scale.pitchAt(5, 1), 62);
      assert.strictEqual(scale.pitchAt(5, 2), 64);
      assert.strictEqual(scale.pitchAt(5, 6), 71);
      assert.strictEqual(scale.pitchAt(5, -1), 59);
      assert.strictEqual(scale.pitchAt(5, -2), 57);
      assert.strictEqual(scale.pitchAt(4, 0), 48);
      assert.strictEqual(scale.pitchAt(4, 6), 59);
      assert.strictEqual(scale.pitchAt(4, -2), 45);
    });

    it('adds octaves on wrap-around', () => {
      const scale = new Scale({ root: 0, offsets: [0, 7] });
      assert.strictEqual(scale.pitchAt(5, 0), 60);
      assert.strictEqual(scale.pitchAt(5, 1), 67);
      assert.strictEqual(scale.pitchAt(5, 2), 72);
      assert.strictEqual(scale.pitchAt(5, -1), 55);
      assert.strictEqual(scale.pitchAt(5, -2), 48);
    });

    it('supports non-octave-repeating scales', () => {
      const scale = new Scale({ root: 0, offsets: [0, 10, 20] });
      assert.strictEqual(scale.pitchAt(5, 0), 60);
      assert.strictEqual(scale.pitchAt(5, 1), 70);
      assert.strictEqual(scale.pitchAt(5, 2), 80);
      assert.strictEqual(scale.pitchAt(5, 3), 72); // but it still adds octaves on wrap-around
      assert.strictEqual(scale.pitchAt(5, 4), 82);
      assert.strictEqual(scale.pitchAt(5, -1), 68);
      assert.strictEqual(scale.pitchAt(5, -2), 58);
      assert.strictEqual(scale.pitchAt(5, -3), 48);
    });
  });
});
