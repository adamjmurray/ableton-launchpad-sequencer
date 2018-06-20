import { Scale, Pattern } from '../../src';
import { STEPS, VALUES } from '../../src/config';
import assert from 'assert';

const ITERATIONS = 100;
const expectRandomCondition = ({ pattern, step, expectedChance }, condition) => {
  let count = 0;
  for (let i = 0; i < ITERATIONS; i++) {
    const note = { pitch: 60, velocity: 70, duration: -1 }; // we set duration to -1 so we can test random mute
    pattern.processNote(note, step);
    if (condition(note)) count++;
  }
  if (expectedChance === 100) {
    assert.equal(count, ITERATIONS);
  } else {
    // we'll assume the randomness shouldn't diverge more than 20% away from the expected average
    assert(count > ITERATIONS * (expectedChance - 20) / 100);
    assert(count < ITERATIONS * (expectedChance + 20) / 100);
  }
}

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

  describe('processNote()', () => {
    let pattern;
    beforeEach(() => {
      pattern = new Pattern('noop', [...Array(STEPS)].map((_, i) => i))
    });

    context('type: random gate', () => {
      beforeEach(() => pattern.type = 'random gate');

      it('sets note.duration to 1 with a 25% chance, when the step value is 1', () => {
        expectRandomCondition({ pattern, step: 1, expectedChance: 25 }, note => note.duration === 1);
      });

      it('sets note.duration to 1 with a 50% chance, when the step value is 2', () => {
        expectRandomCondition({ pattern, step: 2, expectedChance: 50 }, note => note.duration === 1);
      });

      it('sets note.duration to 1 with a 75% chance, when the step value is 3', () => {
        expectRandomCondition({ pattern, step: 3, expectedChance: 75 }, note => note.duration === 1);
      });

      it('sets note.duration to 1 with a 100% chance, when the step value is 4', () => {
        expectRandomCondition({ pattern, step: 4, expectedChance: 100 }, note => note.duration === 1);
      });
    });
  });
});
