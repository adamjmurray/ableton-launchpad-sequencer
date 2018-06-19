/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {StorageController,Sequencer,Track} = require(`${__dirname}/../launchpad-sequencer.js`);

describe('StorageController', function() {

  beforeEach(function() {
    this.sequencer = new Sequencer;
    this.storage = new StorageController(this.sequencer);

    // Delete the sequencers state so we can test fromJSON() is really loading state
    return this.clearSequencer = function() {
      this.sequencer.scale.setSteps(null);
      this.sequencer.stepLength = null;
      return (() => {
        const result = [];
        for (var t of this.sequencer.tracks) {
          t.pitch = null;
          t.velocity = null;
          t.duration = null;
          t.mute = null;
          result.push((() => {
            const result1 = [];
            for (let p of t.patterns) {
              p.type = null;
              p.start = null;
              p.end = null;
              p.mute = null;
              result1.push(p.sequence = []);
            }
            return result1;
          })());
        }
        return result;
      })();
    };});


  describe('stringify()', function() {
    it('converts the sequencer to a string', function() {
      const jsonString = this.storage.stringify(this.sequencer);
      return expect( typeof jsonString ).toEqual('string');
    });

    it('returns a eval-able JSON string', function() {
      const jsonString = this.storage.stringify(this.sequencer);
      const obj = eval(`(${jsonString})`);
      expect( obj.scale ).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      return expect( obj.tracks.length ).toBe(4);
    });

    it('can be loaded with parse() and produce the same JSON string again', function() {
      const jsonString = this.storage.stringify(this.sequencer);
      this.clearSequencer();
      expect( this.storage.stringify(this.sequencer) ).not.toEqual(jsonString);
      this.sequencer.fromJSON(this.storage.parse(jsonString));
      return expect( this.storage.stringify(this.sequencer) ).toEqual(jsonString);
    });

    return it('passes the option omitTracks:true through to sequencer.toJSON(), which omits the track data', function() {
      const jsonString = this.storage.stringify(this.sequencer, {omitTracks:true});
      const json = eval(`(${jsonString})`);
      return expect( json ).toEqual({
        scale: [0,1,2,3,4,5,6,7,8,9,10,11],
        stepLength : '16th'
      });
    });
  });


  return describe('parse()', () =>
    it('loads sequencer state from a JSON string', function() {
      const jsonString = this.storage.stringify(this.sequencer);
      this.clearSequencer();
      this.sequencer.fromJSON(this.storage.parse(jsonString));
      expect( this.sequencer.scale.getSteps() ).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      expect( this.sequencer.stepLength).toEqual('16th');
      expect( this.sequencer.tracks.length ).toBe(4);
      return (() => {
        const result = [];
        for (var t of this.sequencer.tracks) {
          expect( t.pitch ).toBe(60);
          expect( t.velocity ).toBe(70);
          expect( t.duration ).toBe(0.9);
          expect( t.mute ).toBe(false);
          expect( t.patterns.length ).toBe(8);
          result.push((() => {
            const result1 = [];
            for (let i = 0; i < t.patterns.length; i++) {
              const p = t.patterns[i];
              expect( p.type ).toBe(Track.DEFAULT_TYPES[i]);
              expect( p.start).toBe(0);
              expect( p.end ).toBe(63);
              expect( p.mute ).toBe(false);
              result1.push(expect( p.sequence).toEqual((__range__(0, 63, true).map((_) => 0))));
            }
            return result1;
          })());
        }
        return result;
      })();
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