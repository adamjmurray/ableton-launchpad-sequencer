/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const {MIDIController,Sequencer} = require(`${__dirname}/../launchpad-sequencer.js`);

describe('MIDIController', function() {

  let sequencer = null;
  let controller = null;

  beforeEach(function() {
    sequencer = new Sequencer;
    return controller = new MIDIController(sequencer);
  });



  describe('trackPitchOverride(pitch, enabled)', function() {

    const _ = null;

    const setTrackPitchOverrides = (...pitches) => pitches.map((pitch) => controller.trackPitchOverride(pitch, 127));

    const pitchOverrides = () => sequencer.tracks.map(track => track.pitchOverride);

    const velocityOverrides = () => sequencer.tracks.map(track => track.velocityOverride);

    describe('enabling a pitchOverride', function() {
      it('sets pitchOverride for track 1, then 2, then 3, then 4', function() {
        controller.trackPitchOverride(1, 127);
        expect( pitchOverrides() ).toEqual([1,_,_,_]);
        controller.trackPitchOverride(2, 127);
        expect( pitchOverrides() ).toEqual([1,2,_,_]);
        controller.trackPitchOverride(3, 127);
        expect( pitchOverrides() ).toEqual([1,2,3,_]);
        controller.trackPitchOverride(4, 127);
        return expect( pitchOverrides() ).toEqual([1,2,3,4]);
    });

      it('wraps around to track 1 on the fifth note, track 2 on the sixth note, etc', function() {
        setTrackPitchOverrides(1,2,3,4,5,6);
        return expect( pitchOverrides() ).toEqual([5,6,3,4]);
    });

      return it('sets velocityOverrides in a similar fashion', function() {
        controller.trackPitchOverride(1, 6);
        expect( velocityOverrides() ).toEqual([6,_,_,_]);
        controller.trackPitchOverride(2, 7);
        expect( velocityOverrides() ).toEqual([6,7,_,_]);
        controller.trackPitchOverride(3, 8);
        expect( velocityOverrides() ).toEqual([6,7,8,_]);
        controller.trackPitchOverride(4, 9);
        expect( velocityOverrides() ).toEqual([6,7,8,9]);
        controller.trackPitchOverride(5, 10);
        return expect( velocityOverrides() ).toEqual([10,7,8,9]);
    });
  });


    return describe('disabling a pitchOverride', function() {

      it('removes the pitchOverride for the corresponding track when no wrap-around has occurred', function() {
        setTrackPitchOverrides(1,2,3,4);
        controller.trackPitchOverride(1, 0);
        expect( pitchOverrides() ).toEqual([_,2,3,4]);
        controller.trackPitchOverride(3, 0);
        expect( pitchOverrides() ).toEqual([_,2,_,4]);
        controller.trackPitchOverride(4, 0);
        expect( pitchOverrides() ).toEqual([_,2,_,_]);
        controller.trackPitchOverride(2, 0);
        return expect( pitchOverrides() ).toEqual([_,_,_,_]);
    });

      it('reverts to the previous pitchOverride after a wrap-around occurs', function() {
        setTrackPitchOverrides(1,2,3,4,5,6);
        controller.trackPitchOverride(5, 0);
        expect( pitchOverrides() ).toEqual([1,6,3,4]);
        controller.trackPitchOverride(6, 0);
        return expect( pitchOverrides() ).toEqual([1,2,3,4]);
    });

      it('does nothing when a pitch, which was supplanted by wrap-around, is set to off', function() {
        setTrackPitchOverrides(1,2,3,4,5,6);
        controller.trackPitchOverride(2, 0);
        return expect( pitchOverrides() ).toEqual([5,6,3,4]);
    });


      it('removes the pitchOverride after a wrap-around if the previous pitch has already set to off', function() {
        setTrackPitchOverrides(1,2,3,4,5,6);
        controller.trackPitchOverride(2, 0);
        controller.trackPitchOverride(6, 0);
        return expect( pitchOverrides() ).toEqual([5,_,3,4]);
    });

      return it('removes the velocityOverrides in a similar fashion', function() {
        controller.trackPitchOverride(1, 6);
        controller.trackPitchOverride(2, 7);
        controller.trackPitchOverride(3, 8);
        controller.trackPitchOverride(4, 9);
        controller.trackPitchOverride(5, 10);
        controller.trackPitchOverride(6, 11);
        controller.trackPitchOverride(1, 0);
        controller.trackPitchOverride(6, 0);
        controller.trackPitchOverride(4, 0);
        return expect( velocityOverrides() ).toEqual([10,7,8,_]);
    });
  });
});


  return describe('globalTranspose(amount, enabled)', function() {

    describe('enabling a transposition', () =>
      it("sets seqeuncer.globalTranspose to the amount", function() {
        controller.globalTranspose(17, true);
        return expect( sequencer.globalTranspose ).toBe(17);
      })
    );

    return describe('disabling a transposition', function() {
      describe('no other transpositions enabled', () =>
        it("resets seqeuncer.globalTranspose to 0", function() {
          controller.globalTranspose(17, true);
          controller.globalTranspose(17, false);
          return expect( sequencer.globalTranspose ).toBe(0);
        })
      );

      describe('disabling the most-recently enabled transposition', () =>
        it("sets sequencer.globalTranspose to the current most-recently enabled transposition", function() {
          controller.globalTranspose(5, true);
          controller.globalTranspose(17, true);
          controller.globalTranspose(17, false);
          return expect( sequencer.globalTranspose ).toBe(5);
        })
      );

      describe('disabling other than the most-recently enabled transposition', () =>
        it("does not change sequencer.globalTranspose", function() {
          controller.globalTranspose(5, true);
          controller.globalTranspose(17, true);
          controller.globalTranspose(5, false);
          return expect( sequencer.globalTranspose ).toBe(17);
        })
      );

      return describe("interleaved disabling", () =>
        it("always sets sequencer.globalTranspose to the current most-recently enabled transposition", function() {
          controller.globalTranspose(1, true);
          controller.globalTranspose(2, true);
          controller.globalTranspose(3, true);
          controller.globalTranspose(4, true);
          expect( sequencer.globalTranspose ).toBe(4);
          controller.globalTranspose(3, false);
          expect( sequencer.globalTranspose ).toBe(4);
          controller.globalTranspose(4, false);
          expect( sequencer.globalTranspose ).toBe(2);
          controller.globalTranspose(1, false);
          expect( sequencer.globalTranspose ).toBe(2);
          controller.globalTranspose(2, false);
          return expect( sequencer.globalTranspose ).toBe(0);
        })
      );
    });
  });
});

