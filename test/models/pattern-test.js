/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { Pattern } = require(`${__dirname}/../launchpad-sequencer.js`);

describe('Pattern', function () {

  beforeEach(function () {
    this.pattern = new Pattern;
    return this.pattern.sequence = __range__(0, 64, false);
  }); // so the index is the same as the stepValue, and we can test processNote() more easily

  describe('invert()', () =>
    it('flips the steps values 1<=>4 and 2<=>3', function () {
      let i;
      this.pattern.sequence = ((() => {
        const result = [];
        for (i = 0; i < 64; i++) {
          result.push(i % 5);
        }
        return result;
      })());
      this.pattern.invert();
      const expectedSequence = ((() => {
        let j;
        const result1 = [];
        for (j = 0, i = j; j < 64; j++ , i = j) {
          i %= 5;
          if (i === 0) { result1.push(0); } else { result1.push(5 - i); }
        }

        return result1;
      })());
      return expect(this.pattern.sequence).toEqual(expectedSequence);
    })
  );

  describe('processNote()', function () {
    beforeEach(function () {
      this.note = { pitch: 60, velocity: 70, duration: 0 };
      return this.expectConditionMetRandomly = function (stepValue, expectedPercentChance, condition) {
        let count = 0;
        for (let i = 0; i < 100; i++) {
          this.note = { pitch: 60, velocity: 70, duration: -1 }; // we set duration to -1 so we can test random mute
          this.pattern.processNote(this.note, stepValue);
          if (condition(this.note)) { count++; }
        }
        if (expectedPercentChance === 100) {
          return expect(count).toBe(100);
        } else {
          // we'll assume the randomness shouldn't diverge more than 25% away from the expected average
          expect(count).toBeGreaterThan(expectedPercentChance - 25);
          return expect(count).toBeLessThan(expectedPercentChance + 25);
        }
      };
    });

    describe('type: random gate', function () {
      beforeEach(function () { return this.pattern.setType('random gate'); });

      it("sets note.duration to be 1 with a 25% chance when the step value is 1", function () {
        return this.expectConditionMetRandomly(1, 25, note => note.duration === 1);
      });

      it("sets note.duration to be 1 with a 50% chance when the step value is 2", function () {
        return this.expectConditionMetRandomly(2, 50, note => note.duration === 1);
      });

      it("sets note.duration to be 1 with a 75% chance when the step value is 3", function () {
        return this.expectConditionMetRandomly(3, 75, note => note.duration === 1);
      });

      return it("sets note.duration to be 1 every time the step value is 4", function () {
        return this.expectConditionMetRandomly(4, 100, note => note.duration === 1);
      });
    });


    describe('type: random mute', function () {
      beforeEach(function () { return this.pattern.setType('random mute'); });

      it("sets note.duration to be 0 with a 25% chance when the step value is 1", function () {
        return this.expectConditionMetRandomly(1, 25, note => note.duration === 0);
      });

      it("sets note.duration to be 0 with a 50% chance when the step value is 2", function () {
        return this.expectConditionMetRandomly(2, 50, note => note.duration === 0);
      });

      it("sets note.duration to be 0 with a 75% chance when the step value is 3", function () {
        return this.expectConditionMetRandomly(3, 75, note => note.duration === 0);
      });

      return it("sets note.duration to be 0 every time the step value is 4", function () {
        return this.expectConditionMetRandomly(4, 100, note => note.duration === 0);
      });
    });


    describe('type: random skip', function () {
      beforeEach(function () { return this.pattern.setType('random skip'); });

      it("sets note.skip to true with a 25% chance when the step value is 1", function () {
        return this.expectConditionMetRandomly(1, 25, note => note.skip);
      });

      it("sets note.skip to true with a 50% chance when the step value is 2", function () {
        return this.expectConditionMetRandomly(2, 50, note => note.skip);
      });

      it("sets note.skip to true with a 75% chance when the step value is 3", function () {
        return this.expectConditionMetRandomly(3, 75, note => note.skip);
      });

      return it("sets note.skip to true every time the step value is 4", function () {
        return this.expectConditionMetRandomly(4, 100, note => note.skip);
      });
    });


    return describe('type: chaos', function () {
      beforeEach(function () { return this.pattern.setType('chaos'); });

      it("randomly sets the pitch randomly to an integer in [0..127] when the step value is 1", function () {
        const pitches = {}; // the set of pitches generated in the loop
        for (let i = 0; i < 10; i++) {
          this.pattern.processNote(this.note, 1);
          const { pitch } = this.note;
          expect(Math.floor(pitch)).toBe(pitch);
          expect(0 <= pitch && pitch <= 127).toBe(true);
          pitches[pitch] = true;
        }
        // since this is random, we might get a few duplicate pitches, but not more than half
        return expect(Object.keys(pitches).length).toBeGreaterThan(5);
      });

      it("randomly sets the velocity to an integer in [0..127] when the step value is 2", function () {
        const velocities = {}; // the set of velocities generated in the loop
        for (let i = 0; i < 10; i++) {
          this.pattern.processNote(this.note, 2);
          const { velocity } = this.note;
          expect(Math.floor(velocity)).toBe(velocity);
          expect(0 <= velocity && velocity <= 127).toBe(true);
          velocities[velocity] = true;
        }
        // since this is random, we might get a few duplicate pitches, but not more than half
        return expect(Object.keys(velocities).length).toBeGreaterThan(5);
      });

      it("randomly sets the duration to a number between 0 and 8 when the step value is 3", function () {
        const durations = {}; // the set of durations generated in the loop
        for (let i = 0; i < 10; i++) {
          this.pattern.processNote(this.note, 3);
          expect(0 <= this.note.duration && this.note.duration <= 8).toBe(true);
          durations[this.note.duration] = true;
        }
        // since this is random, we might get a few duplicate pitches, but not more than half
        return expect(Object.keys(durations).length).toBeGreaterThan(5);
      });

      return it("randomly sets pitch, velocity, and duration when the step value is 4", function () {
        const pitches = {};
        const velocities = {};
        const durations = {};
        for (let i = 0; i < 10; i++) {
          this.pattern.processNote(this.note, 4);
          expect(0 <= this.note.pitch && this.note.pitch <= 127).toBe(true);
          expect(0 <= this.note.velocity && this.note.velocity <= 127).toBe(true);
          expect(0 <= this.note.duration && this.note.duration <= 8).toBe(true);
          pitches[this.note.pitch] = true;
          velocities[this.note.velocity] = true;
          durations[this.note.duration] = true;
        }
        expect(Object.keys(pitches).length).toBeGreaterThan(5);
        expect(Object.keys(velocities).length).toBeGreaterThan(5);
        return expect(Object.keys(durations).length).toBeGreaterThan(5);
      });
    });
  });


  return describe(".fromJSON()", () =>
    it("calls setType() to set the processor properly", function () {
      spyOn(this.pattern, 'setType');
      this.pattern.fromJSON({ type: 'duration /' });
      return expect(this.pattern.setType).toHaveBeenCalled();
    })
  );
});
function __range__(left, right, inclusive) {
  let range = [];
  let ascending = left < right;
  let end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}