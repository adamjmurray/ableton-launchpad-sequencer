/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {Scale} = require(`${__dirname}/../launchpad-sequencer.js`);

describe('Scale', function() {

  beforeEach(function() { return this.scale = new Scale; });

  describe('steps', () =>
    it('defaults to [0...12]', function() {
      return expect( this.scale.getSteps() ).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  })
);


  return describe('map(pitch, scaleOffset)', function() {
    it("doesn't change the pitch if scaleOffset is 0", function() {
      expect( this.scale.map(60,0) ).toBe(60);
      expect( this.scale.map(70,0) ).toBe(70);
      this.scale.setSteps([1]);
      return expect( this.scale.map(60,0) ).toBe(60);
    });

    it('adds the scaleOffset to the pitch with the default (chromatic) scale', function() {
      expect( this.scale.map(60,1) ).toBe(61);
      expect( this.scale.map(60,2) ).toBe(62);
      expect( this.scale.map(60,-1)).toBe(59);
      return expect( this.scale.map(60,-2)).toBe(58);
    });

    it('forces the note into the scale, adding octaves at "wrap-around" points', function() {
      this.scale.setSteps([0,7]);
      expect( this.scale.map(60,0) ).toBe(60);
      expect( this.scale.map(60,1) ).toBe(67);
      expect( this.scale.map(60,2) ).toBe(72);
      expect( this.scale.map(60,-1)).toBe(55);
      return expect( this.scale.map(60,-2)).toBe(48);
    });

    it('treats a note not in the scale as a special "in-between" point', function() {
      this.scale.setSteps([0,7]);
      expect( this.scale.map(63,0) ).toBe(63);
      expect( this.scale.map(63,1) ).toBe(67);
      expect( this.scale.map(63,2) ).toBe(72);
      expect( this.scale.map(63,-1)).toBe(60);
      return expect( this.scale.map(63,-2)).toBe(55);
    });

    it("handles the case when the given pitch's pitch class is higher than the scale's highest pitch class", function() {
      this.scale.setSteps([1,7]);
      expect( this.scale.map(68,1) ).toBe(73);
      expect( this.scale.map(68,2) ).toBe(79);
      expect( this.scale.map(68,3) ).toBe(85);
      expect( this.scale.map(68,-1)).toBe(67);
      expect( this.scale.map(68,-2)).toBe(61);
      return expect( this.scale.map(68,-3)).toBe(55);
    });

    it("handles the case when the given pitch's pitch class is lower than the scale's lowest pitch class", function() {
      this.scale.setSteps([1,7]);
      expect( this.scale.map(60,1) ).toBe(61);
      expect( this.scale.map(60,2) ).toBe(67);
      expect( this.scale.map(60,3) ).toBe(73);
      expect( this.scale.map(60,-1)).toBe(55);
      expect( this.scale.map(60,-2)).toBe(49);
      return expect( this.scale.map(60,-3)).toBe(43);
    });


    it("handles the case when the given pitch's pitch class is the scale's highest pitch class", function() {
      this.scale.setSteps([1,7]);
      expect( this.scale.map(67,1) ).toBe(73);
      expect( this.scale.map(67,2) ).toBe(79);
      expect( this.scale.map(67,3) ).toBe(85);
      expect( this.scale.map(67,-1)).toBe(61);
      expect( this.scale.map(67,-2)).toBe(55);
      return expect( this.scale.map(67,-3)).toBe(49);
    });

    it("handles the case when the given pitch's pitch class is the scale's lowest pitch class", function() {
      this.scale.setSteps([1,7]);
      expect( this.scale.map(61,1) ).toBe(67);
      return expect( this.scale.map(61,-1)).toBe(55);
    });

    return it("adds octaves when the scale is empty", function() {
      this.scale.setSteps([]);
      expect( this.scale.map(60,1) ).toBe(72);
      expect( this.scale.map(60,2) ).toBe(84);
      expect( this.scale.map(60,-1)).toBe(48);
      return expect( this.scale.map(60,-2)).toBe(36);
    });
  });
});
