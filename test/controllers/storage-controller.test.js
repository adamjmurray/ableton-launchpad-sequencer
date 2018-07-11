import { StorageController, Sequencer, Track } from '../../src';
import { DEFAULT_PATTERN_TYPES, STEPS } from '../../src/config';
import assert from 'assert';

describe('StorageController', () => {

  let sequencer;
  let storage;

  const clearSequencer = () => {
    sequencer.scale.pitchClasses = null;
    sequencer.stepLength = null;
    for (const t of sequencer.tracks) {
      t.pitch = null;
      t.velocity = null;
      t.duration = null;
      t.mute = null;
      for (const p of t.patterns) {
        p.type = null;
        p.start = null;
        p.end = null;
        p.mute = null;
      }
    }
  };

  beforeEach(() => {
    sequencer = new Sequencer;
    storage = new StorageController(sequencer);
  });

  describe('stringify()', () => {
    it('converts the sequencer to a string', () => {
      const jsonString = storage.stringify(sequencer);
      assert.equal(typeof jsonString, 'string');
    });

    it('returns a eval-able JSON string', () => {
      const jsonString = storage.stringify(sequencer);
      const obj = eval(`(${jsonString})`);
      assert.deepEqual(obj.scale, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      assert.equal(obj.tracks.length, 4);
    });

    it('can be loaded with parse() and produce the same JSON string again', () => {
      const jsonString = storage.stringify(sequencer);
      clearSequencer();
      assert.notEqual(storage.stringify(sequencer), jsonString);
      sequencer.fromJSON(storage.parse(jsonString));
      assert.equal(storage.stringify(sequencer), jsonString);
    });

    it('passes the option omitTracks:true through to sequencer.toJSON(), which omits the track data', () => {
      const jsonString = storage.stringify(sequencer, { omitTracks: true });
      const json = eval(`(${jsonString})`);
      assert.deepEqual(json, {
        scale: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        stepLength: '16th'
      });
    });
  });


  describe('parse()', () => {
    it('loads sequencer state from a JSON string', () => {
      const jsonString = storage.stringify(sequencer);
      clearSequencer();
      sequencer.fromJSON(storage.parse(jsonString));
      assert.deepEqual(sequencer.scale.pitchClasses, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      assert.equal(sequencer.stepLength, '16th');
      assert.equal(sequencer.tracks.length, 4);

      for (const t of sequencer.tracks) {
        assert.equal(t.pitch, 60);
        assert.equal(t.velocity, 70);
        assert.equal(t.duration, 0.9);
        assert.equal(t.mute, false);
        assert.equal(t.patterns.length, 8);
        for (let i = 0; i < t.patterns.length; i++) {
          const p = t.patterns[i];
          assert.equal(p.type, DEFAULT_PATTERN_TYPES[i]);
          assert.equal(p.start, 0);
          assert.equal(p.end, 63);
          assert.equal(p.mute, false);
          assert.deepEqual(p.sequence, Array(STEPS).fill(0));
        }
      }
    });
  });
});
