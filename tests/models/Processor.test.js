import { Processor } from '../../src';
import assert from 'assert';

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

    context('random gate', () => {
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

    // describe('random skip', () => {
    //   beforeEach(() => processor.type = 'random skip');

    //   it("sets note.skip to true with a 25% chance, when the step value is 1", () => {
    //     expectRandomCondition({ processor, value: 1, expectedChance: 25 }, note => note.skip);
    //   });

    //   it("sets note.skip to true with a 50% chance, when the step value is 2", () => {
    //     expectRandomCondition({ processor, value: 2, expectedChance: 50 }, note => note.skip);
    //   });

    //   it("sets note.skip to true with a 75% chance, when the step value is 3", () => {
    //     expectRandomCondition({ processor, value: 3, expectedChance: 75 }, note => note.skip);
    //   });

    //   it("sets note.skip to true with a 100% chance, when the step value is 4", () => {
    //     expectRandomCondition({ processor, value: 4, expectedChance: 100 }, note => note.skip);
    //   });
    // });

    describe('type: chaos', () => {
      let note;
      beforeEach(() => {
        processor.type = 'chaos';
        note = { pitch: 60, velocity: 70, duration: 0 };
      });

      it("randomly sets the pitch randomly to an integer in [0..127] when the step value is 1", () => {
        const pitches = {};
        for (let i = 0; i < ITERATIONS; i++) {
          const { pitch } = processor.process(note, 1);
          assertIsMidiPitch(pitch);
          pitches[pitch] = true;
        }
        assert(numKeys(pitches) > EXPECTED_UNIQUE_VALUES);
      });

      it("randomly sets the velocity to an integer in [0..127] when the step value is 2", () => {
        const velocities = {};
        for (let i = 0; i < ITERATIONS; i++) {
          const { velocity } = processor.process(note, 2);
          assertIsMidiVelocity(velocity);
          velocities[velocity] = true;
        }
        assert(numKeys(velocities) > EXPECTED_UNIQUE_VALUES);
      });

      it("randomly sets the duration to a number between 0 and 8 when the step value is 3", () => {
        const durations = {};
        for (let i = 0; i < ITERATIONS; i++) {
          const { duration } = processor.process(note, 3);
          assertInRange(duration, 0, 8);
          durations[duration] = true;
        }
        assert(numKeys(durations) > EXPECTED_UNIQUE_VALUES);
      });

      it("randomly sets pitch, velocity, and duration when the step value is 4", () => {
        const pitches = {};
        const velocities = {};
        const durations = {};
        for (let i = 0; i < ITERATIONS; i++) {
          const { pitch, velocity, duration } = processor.process(note, 4);
          assertIsMidiPitch(pitch);
          assertIsMidiVelocity(velocity);
          assertInRange(duration, 0, 8);
          pitches[pitch] = true;
          velocities[velocity] = true;
          durations[duration] = true;
        }
        assert(numKeys(pitches) > EXPECTED_UNIQUE_VALUES);
        assert(numKeys(velocities) > EXPECTED_UNIQUE_VALUES);
        assert(numKeys(durations) > EXPECTED_UNIQUE_VALUES);
      });
    });
  });
});
