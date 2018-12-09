import { Processor } from '../../src';

const ITERATIONS = 500;
const EXPECTED_UNIQUE_VALUES = 50;

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

const assertIsInt = (number) => assert.strictEqual(Math.floor(number), number);
const assertInRange = (value, min, max) => assert(min <= value && value <= max);
const assertIsMidiPitch = (pitch) => assertIsInt(pitch) && assertRange(pitch, 0, 127);
const assertIsMidiVelocity = (velocity) => assertIsInt(velocity) && assertRange(velocity, 0, 127);
const numKeys = (obj) => Object.keys(obj).length;

describe('Processor', () => {
  describe('process()', () => {
    let processor;
    beforeEach(() => processor = new Processor);

    describe('random mute', () => {
      beforeEach(() => processor.type = 'random mute');

      it("sets note.mute to true with a 25% chance, when the step value is 1", () => {
        expectRandomCondition({ processor, value: 1, expectedChance: 25 }, note => note.mute);
      });

      it("sets note.mute to true with a 50% chance, when the step value is 2", () => {
        expectRandomCondition({ processor, value: 2, expectedChance: 50 }, note => note.mute);
      });

      it("sets note.mute to true with a 75% chance, when the step value is 3", () => {
        expectRandomCondition({ processor, value: 3, expectedChance: 75 }, note => note.mute);
      });

      it("sets note.mute to true with a 100% chance, when the step value is 3", () => {
        expectRandomCondition({ processor, value: 4, expectedChance: 100 }, note => note.mute);
      });
    });
  });
});
