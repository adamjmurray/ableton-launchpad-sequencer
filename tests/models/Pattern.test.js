import { Config, Pattern } from '../../src';
import assert from 'assert';

const { NUMBER_OF } = Config;

describe('Pattern', () => {
  describe('invert()', () => {
    it('flips the steps values 1<=>4 and 2<=>3', () => {
      const pattern = new Pattern;
      pattern.steps = [...Array(NUMBER_OF.STEPS)].map((_, i) => i % NUMBER_OF.STEP_VALUES)
      const expected = pattern.steps.map(v => v > 0 ? NUMBER_OF.STEP_VALUES - v : 0);
      pattern.invert();
      assert.deepEqual(pattern.steps, expected);
    })
  });

  // TODO...
});
