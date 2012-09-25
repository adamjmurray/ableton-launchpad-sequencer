{Scale} = require "#{__dirname}/launchpad-sequencer.js"

describe 'Scale', ->

  beforeEach -> @scale = new Scale

  describe 'steps', ->
    it 'defaults to [0...12]', ->
      expect( @scale.steps ).toEqual [0...12]


  describe 'pitchOffset()', ->
    it 'indexes into the steps array, for indexes in range', ->
      @scale.steps = [0,2,4,5]
      for step,index in @scale.steps
        expect( @scale.pitchOffset(index) ).toBe step

    it 'adds 12 for each wrap-around in the positive direction', ->
      @scale.steps = [0,2,4,5]
      expect( @scale.pitchOffset(4) ).toBe 12+0
      expect( @scale.pitchOffset(5) ).toBe 12+2
      expect( @scale.pitchOffset(6) ).toBe 12+4
      expect( @scale.pitchOffset(7) ).toBe 12+5
      expect( @scale.pitchOffset(12)).toBe 36+0

    it 'subtracts 12 for each wrap-around in the negative direction', ->
      @scale.steps = [0,2,4,5]
      expect( @scale.pitchOffset(-1) ).toBe 5-12
      expect( @scale.pitchOffset(-2) ).toBe 4-12
      expect( @scale.pitchOffset(-3) ).toBe 2-12
      expect( @scale.pitchOffset(-4) ).toBe 0-12
      expect( @scale.pitchOffset(-9) ).toBe 5-36

