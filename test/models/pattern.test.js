import { Pattern } from '../../src';
import { STEPS, VALUES } from '../../src/config';
import assert from 'assert';

describe('Pattern', () => {
  describe('invert()', () => {
    it('flips the steps values 1<=>4 and 2<=>3', () => {
      const pattern = new Pattern;
      pattern.sequence = [...Array(STEPS)].map((_, i) => i % VALUES)
      const expected = pattern.sequence.map(v => v > 0 ? VALUES - v : 0);
      pattern.invert();
      assert.deepEqual(pattern.sequence, expected);
    })
  });
});
