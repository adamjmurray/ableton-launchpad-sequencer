{Controller,Sequencer} = require "#{__dirname}/launchpad-sequencer.js"

describe 'Controller', ->

  sequencer = null
  controller = null

  beforeEach ->
    sequencer = new Sequencer
    controller = new Controller(sequencer)



  describe 'trackPitchOverride(pitch, enabled)', ->

    _ = null

    trackOverrides = -> sequencer.tracks.map (track) -> track.pitchOverride

    setTrackPitchOverrides = (pitches...) -> controller.trackPitchOverride(pitch, true) for pitch in pitches

    describe 'enabling a pitchOverride', ->
      it 'sets pitchOverride for track 1, then 2, then 3, then 4', ->
        controller.trackPitchOverride(1, true)
        expect( trackOverrides() ).toEqual [1,_,_,_]
        controller.trackPitchOverride(2, true)
        expect( trackOverrides() ).toEqual [1,2,_,_]
        controller.trackPitchOverride(3, true)
        expect( trackOverrides() ).toEqual [1,2,3,_]
        controller.trackPitchOverride(4, true)
        expect( trackOverrides() ).toEqual [1,2,3,4]

      it 'wraps around to track 1 on the fifth note, track 2 on the sixth note, etc', ->
        setTrackPitchOverrides 1,2,3,4,5,6
        expect( trackOverrides() ).toEqual [5,6,3,4]


    describe 'disabling a pitchOverride', ->

      it 'removes the pitchOverride for the corresponding track when no wrap-around has occurred', ->
        setTrackPitchOverrides 1,2,3,4
        controller.trackPitchOverride(1, false)
        expect( trackOverrides() ).toEqual [_,2,3,4]
        controller.trackPitchOverride(3, false)
        expect( trackOverrides() ).toEqual [_,2,_,4]
        controller.trackPitchOverride(4, false)
        expect( trackOverrides() ).toEqual [_,2,_,_]
        controller.trackPitchOverride(2, false)
        expect( trackOverrides() ).toEqual [_,_,_,_]

      it 'reverts to the previous pitchOverride after a wrap-around occurs', ->
        setTrackPitchOverrides 1,2,3,4,5,6
        controller.trackPitchOverride(5, false)
        expect( trackOverrides() ).toEqual [1,6,3,4]
        controller.trackPitchOverride(6, false)
        expect( trackOverrides() ).toEqual [1,2,3,4]

      it 'does nothing when a pitch, which was supplanted by wrap-around, is set to off', ->
        setTrackPitchOverrides 1,2,3,4,5,6
        controller.trackPitchOverride(2, false)
        expect( trackOverrides() ).toEqual [5,6,3,4]


      it 'removes the pitchOverride after a wrap-around if the previous pitch has already set to off', ->
        setTrackPitchOverrides 1,2,3,4,5,6
        controller.trackPitchOverride(2, false)
        controller.trackPitchOverride(6, false)
        expect( trackOverrides() ).toEqual [5,_,3,4]



  describe 'globalTranspose(amount, enabled)', ->

    describe 'enabling a transposition', ->
      it "sets seqeuncer.globalTranspose to the amount", ->
        controller.globalTranspose(17, true)
        expect( sequencer.globalTranspose ).toBe 17

    describe 'disabling a transposition', ->
      describe 'no other transpositions enabled', ->
        it "resets seqeuncer.globalTranspose to 0", ->
          controller.globalTranspose(17, true)
          controller.globalTranspose(17, false)
          expect( sequencer.globalTranspose ).toBe 0

      describe 'disabling the most-recently enabled transposition', ->
        it "sets sequencer.globalTranspose to the current most-recently enabled transposition", ->
          controller.globalTranspose(5, true)
          controller.globalTranspose(17, true)
          controller.globalTranspose(17, false)
          expect( sequencer.globalTranspose ).toBe 5

      describe 'disabling other than the most-recently enabled transposition', ->
        it "does not change sequencer.globalTranspose", ->
          controller.globalTranspose(5, true)
          controller.globalTranspose(17, true)
          controller.globalTranspose(5, false)
          expect( sequencer.globalTranspose ).toBe 17

      describe "interleaved disabling", ->
        it "always sets sequencer.globalTranspose to the current most-recently enabled transposition", ->
          controller.globalTranspose(1, true)
          controller.globalTranspose(2, true)
          controller.globalTranspose(3, true)
          controller.globalTranspose(4, true)
          expect( sequencer.globalTranspose ).toBe 4
          controller.globalTranspose(3, false)
          expect( sequencer.globalTranspose ).toBe 4
          controller.globalTranspose(4, false)
          expect( sequencer.globalTranspose ).toBe 2
          controller.globalTranspose(1, false)
          expect( sequencer.globalTranspose ).toBe 2
          controller.globalTranspose(2, false)
          expect( sequencer.globalTranspose ).toBe 0

