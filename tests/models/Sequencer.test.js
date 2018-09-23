import { Config, Sequencer } from '../../src';
import assert from 'assert';

const { DEFAULT, NUMBER_OF } = Config;

describe('Sequencer', () => {

  let sequencer;

  beforeEach(() => {
    sequencer = new Sequencer();
  });

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

  describe('fromJSON', () => {
    it('loads the sequencer state from a JSON string', () => {
      const jsonString = JSON.stringify(sequencer);
      clearSequencer();
      sequencer.fromJSON(JSON.parse(jsonString));
      assert.deepEqual(sequencer.scale.pitchClasses, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
      assert.equal(sequencer.stepLength, '16th');
      assert.equal(sequencer.tracks.length, 4);

      for (const t of sequencer.tracks) {
        assert.equal(t.pitch, 60);
        assert.equal(t.velocity, 70);
        assert.equal(t.gate, 0.9);
        assert.equal(t.mute, false);
        assert.equal(t.patterns.length, 8);
        for (let i = 0; i < t.patterns.length; i++) {
          const p = t.patterns[i];
          assert.equal(p.type, DEFAULT.PATTERN_TYPES[i]);
          assert.equal(p.startStepIndex, 0);
          assert.equal(p.endStepIndex, 63);
          assert.equal(p.mute, false);
          assert.deepEqual(p.steps, Array(NUMBER_OF.STEPS).fill(0));
        }
      }
    });
  });
});
