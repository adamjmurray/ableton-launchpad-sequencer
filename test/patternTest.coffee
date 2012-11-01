{Pattern} = require "#{__dirname}/launchpad-sequencer.js"

describe 'Pattern', ->

  beforeEach ->
    @pattern = new Pattern
    @pattern.sequence = [0...64] # so the index is the same as the stepValue, and we can test processNote() more easily

  describe 'processNote()', ->
    beforeEach ->
      @note = {pitch:60,velocity:70,duration:0}
      @expectConditionMetRandomly = (stepValue, expectedPercentChance, condition) ->
        count = 0
        for i in [0...100]
          @note = {pitch:60,velocity:70,duration:-1} # we set duration to -1 so we can test random mute
          @pattern.processNote(@note, stepValue)
          count++ if condition(@note)
        if expectedPercentChance == 100
          expect(count).toBe 100
        else
          # we'll assume the randomness shouldn't diverge more than 25% away from the expected average
          expect(count).toBeGreaterThan expectedPercentChance-25
          expect(count).toBeLessThan expectedPercentChance+25


    describe 'type: random gate', ->
      beforeEach -> @pattern.setType 'random gate'

      it "sets note.duration to be 1 with a 25% chance when the step value is 1", ->
        @expectConditionMetRandomly 1, 25, (note) -> note.duration == 1

      it "sets note.duration to be 1 with a 50% chance when the step value is 2", ->
        @expectConditionMetRandomly 2, 50, (note) -> note.duration == 1

      it "sets note.duration to be 1 with a 75% chance when the step value is 3", ->
        @expectConditionMetRandomly 3, 75, (note) -> note.duration == 1

      it "sets note.duration to be 1 every time the step value is 4", ->
        @expectConditionMetRandomly 4, 100, (note) -> note.duration == 1


    describe 'type: random mute', ->
      beforeEach -> @pattern.setType 'random mute'

      it "sets note.duration to be 0 with a 25% chance when the step value is 1", ->
        @expectConditionMetRandomly 1, 25, (note) -> note.duration == 0

      it "sets note.duration to be 0 with a 50% chance when the step value is 2", ->
        @expectConditionMetRandomly 2, 50, (note) -> note.duration == 0

      it "sets note.duration to be 0 with a 75% chance when the step value is 3", ->
        @expectConditionMetRandomly 3, 75, (note) -> note.duration == 0

      it "sets note.duration to be 0 every time the step value is 4", ->
        @expectConditionMetRandomly 4, 100, (note) -> note.duration == 0


    describe 'type: random skip', ->
      beforeEach -> @pattern.setType 'random skip'

      it "sets note.skip to true with a 25% chance when the step value is 1", ->
        @expectConditionMetRandomly 1, 25, (note) -> note.skip

      it "sets note.skip to true with a 50% chance when the step value is 2", ->
        @expectConditionMetRandomly 2, 50, (note) -> note.skip

      it "sets note.skip to true with a 75% chance when the step value is 3", ->
        @expectConditionMetRandomly 3, 75, (note) -> note.skip

      it "sets note.skip to true every time the step value is 4", ->
        @expectConditionMetRandomly 4, 100, (note) -> note.skip


    describe 'type: chaos', ->
      beforeEach -> @pattern.setType 'chaos'

      it "randomly sets the pitch randomly to an integer in [0..127] when the step value is 1", ->
        pitches = {} # the set of pitches generated in the loop
        for i in [0...10]
          @pattern.processNote(@note, 1)
          pitch = @note.pitch
          expect(Math.floor pitch).toBe pitch
          expect(0 <= pitch <= 127).toBe true
          pitches[pitch] = true
        # since this is random, we might get a few duplicate pitches, but not more than half
        expect( Object.keys(pitches).length ).toBeGreaterThan 5

      it "randomly sets the velocity to an integer in [0..127] when the step value is 2", ->
        velocities = {} # the set of velocities generated in the loop
        for i in [0...10]
          @pattern.processNote(@note, 2)
          velocity = @note.velocity
          expect(Math.floor velocity).toBe velocity
          expect(0 <= velocity <= 127).toBe true
          velocities[velocity] = true
        # since this is random, we might get a few duplicate pitches, but not more than half
        expect( Object.keys(velocities).length ).toBeGreaterThan 5

      it "randomly sets the duration to a number between 0 and 8 when the step value is 3", ->
        durations = {} # the set of durations generated in the loop
        for i in [0...10]
          @pattern.processNote(@note, 3)
          expect(0 <= @note.duration <= 8).toBe true
          durations[@note.duration] = true
        # since this is random, we might get a few duplicate pitches, but not more than half
        expect( Object.keys(durations).length ).toBeGreaterThan 5

      it "randomly sets pitch, velocity, and duration when the step value is 4", ->
        pitches = {}
        velocities = {}
        durations = {}
        for i in [0...10]
          @pattern.processNote(@note, 4)
          expect(0 <= @note.pitch <= 127).toBe true
          expect(0 <= @note.velocity <= 127).toBe true
          expect(0 <= @note.duration <= 8).toBe true
          pitches[@note.pitch] = true
          velocities[@note.velocity] = true
          durations[@note.duration] = true
        expect( Object.keys(pitches).length ).toBeGreaterThan 5
        expect( Object.keys(velocities).length ).toBeGreaterThan 5
        expect( Object.keys(durations).length ).toBeGreaterThan 5


  describe ".fromJSON()", ->
    it "calls setType() to set the processor properly", ->
      spyOn @pattern,'setType'
      @pattern.fromJSON(type:'duration /')
      expect(@pattern.setType).toHaveBeenCalled()