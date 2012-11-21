{Controller,Sequencer} = require "#{__dirname}/launchpad-sequencer.js"

describe 'Controller', ->

  beforeEach ->
    @sequencer = new Sequencer
    @controller = new Controller(@sequencer)

  describe 'globalTranspose(amount, enabled)', ->

    describe 'enabling a transposition', ->
      it "sets seqeuncer.globalTranspose to the amount", ->
        @controller.globalTranspose(17, true)
        expect( @sequencer.globalTranspose ).toBe 17

    describe 'disabling a transposition', ->
      describe 'no other transpositions enabled', ->
        it "resets seqeuncer.globalTranspose to 0", ->
          @controller.globalTranspose(17, true)
          @controller.globalTranspose(17, false)
          expect( @sequencer.globalTranspose ).toBe 0

      describe 'disabling the most-recently enabled transposition', ->
        it "sets sequencer.globalTranspose to the current most-recently enabled transposition", ->
          @controller.globalTranspose(5, true)
          @controller.globalTranspose(17, true)
          @controller.globalTranspose(17, false)
          expect( @sequencer.globalTranspose ).toBe 5

      describe 'disabling other than the most-recently enabled transposition', ->
        it "does not change sequencer.globalTranspose", ->
          @controller.globalTranspose(5, true)
          @controller.globalTranspose(17, true)
          @controller.globalTranspose(5, false)
          expect( @sequencer.globalTranspose ).toBe 17

      describe "interleaved disabling", ->
        it "always sets sequencer.globalTranspose to the current most-recently enabled transposition", ->
          @controller.globalTranspose(1, true)
          @controller.globalTranspose(2, true)
          @controller.globalTranspose(3, true)
          @controller.globalTranspose(4, true)
          expect( @sequencer.globalTranspose ).toBe 4
          @controller.globalTranspose(3, false)
          expect( @sequencer.globalTranspose ).toBe 4
          @controller.globalTranspose(4, false)
          expect( @sequencer.globalTranspose ).toBe 2
          @controller.globalTranspose(1, false)
          expect( @sequencer.globalTranspose ).toBe 2
          @controller.globalTranspose(2, false)
          expect( @sequencer.globalTranspose ).toBe 0

