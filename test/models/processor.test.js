import { Processor } from '../../src';
import assert from 'assert';

const ITERATIONS = 100;
const expectRandomCondition = ({ processor, value, expectedChance }, condition) => {
  let count = 0;
  for (let i = 0; i < ITERATIONS; i++) {
    const note = { pitch: 60, velocity: 70, duration: -1 }; // we set duration to -1 so we can test random mute
    processor.process(note, value);
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

describe('Processor', () => {
  describe('process()', () => {
    let processor;
    beforeEach(() => { processor = new Processor; });

    context('type: random gate', () => {
      beforeEach(() => processor.type = 'random gate');

      it('sets note.duration to 1 with a 25% chance, when the step value is 1', () => {
        expectRandomCondition({ processor, value: 1, expectedChance: 25 }, note => note.duration === 1);
      });

      it('sets note.duration to 1 with a 50% chance, when the step value is 2', () => {
        expectRandomCondition({ processor, value: 2, expectedChance: 50 }, note => note.duration === 1);
      });

      it('sets note.duration to 1 with a 75% chance, when the step value is 3', () => {
        expectRandomCondition({ processor, value: 3, expectedChance: 75 }, note => note.duration === 1);
      });

      it('sets note.duration to 1 with a 100% chance, when the step value is 4', () => {
        expectRandomCondition({ processor, value: 4, expectedChance: 100 }, note => note.duration === 1);
      });
    });
  });
});
