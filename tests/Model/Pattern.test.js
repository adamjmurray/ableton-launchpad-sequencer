import { Config, Pattern } from '../../src';
const { NUMBER_OF } = Config;

describe('Pattern', () => {
  describe('invert()', () => {
    it('flips the steps values 1<=>4 and 2<=>3', () => {
      const pattern = new Pattern;
      pattern.steps = [...Array(NUMBER_OF.STEPS)].map((_, i) => i % NUMBER_OF.STEP_VALUES)
      const expected = pattern.steps.map(v => v > 0 ? NUMBER_OF.STEP_VALUES - v : 0);
      pattern.invert();
      assert.deepEqual(pattern.steps, expected);
    });
  });

  describe('reverse()', () => {
    it('reverses the steps', () => {
      const pattern = new Pattern;
      pattern.steps = [...Array(NUMBER_OF.STEPS)].map((_, i) => i % NUMBER_OF.STEP_VALUES)
      const expected = [...pattern.steps].reverse();
      pattern.reverse();
      assert.deepEqual(pattern.steps, expected);
    });

    it('only reverses steps in the selected range', () => {
      const pattern = new Pattern;
      pattern.steps = [...Array(NUMBER_OF.STEPS)].map((_, i) => {
        if (i < 16) return 0;
        if (i < 32) return 1;
        if (i < 48) return 2;
        else return 3;
      });
      const expected = [...Array(NUMBER_OF.STEPS)].map((_, i) => {
        if (i < 16) return 0;
        if (i < 32) return 2;
        if (i < 48) return 1;
        else return 3;
      });
      pattern.startStepIndex = 16;
      pattern.endStepIndex = 47;
      pattern.reverse();
      assert.deepEqual(pattern.steps, expected);
    });
  });

  describe('randomize()', () => {
    it('fills the pattern with random values', () => {
      const pattern = new Pattern;
      const counts = {};
      pattern.randomize();
      for (let value = 0; value < NUMBER_OF.STEP_VALUES; value++) {
        counts[value] = 0;
      }
      pattern.steps.forEach((value) => counts[value]++);
      // although this is random, it's very unlikely there would be less than 4 of any value
      for (let value = 0; value < NUMBER_OF.STEP_VALUES; value++) {
        assert(counts[value] >= 4);
      }
    });

    it('fills the pattern with random values n the selected range', () => {
      const pattern = new Pattern;
      const start = 16;
      const end = 48;
      pattern.startStepIndex = start;
      pattern.endStepIndex = end;
      pattern.randomize();
      const counts = {};
      for (let value = 0; value < NUMBER_OF.STEP_VALUES; value++) {
        counts[value] = 0;
      }
      pattern.steps.forEach((value, index) => {
        if (index < start) assert.equal(value, 0);
        counts[value]++;
        if (index > end) assert.equal(value, 0);
      });
      // although this is random, it's very unlikely there would be less than 2 of any value
      for (let value = 0; value < NUMBER_OF.STEP_VALUES; value++) {
        assert(counts[value] >= 2);
      }
    });
  });
});
