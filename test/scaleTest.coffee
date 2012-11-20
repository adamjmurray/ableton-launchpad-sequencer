{Scale} = require "#{__dirname}/launchpad-sequencer.js"

describe 'Scale', ->

  beforeEach -> @scale = new Scale

  describe 'steps', ->
    it 'defaults to [0...12]', ->
      expect( @scale.steps ).toEqual [0...12]


  describe 'map(pitch, scaleOffset)', ->
    it "doesn't change the pitch if scaleOffset is 0", ->
      expect( @scale.map(60,0) ).toBe 60
      expect( @scale.map(70,0) ).toBe 70
      @scale.steps = [1]
      expect( @scale.map(60,0) ).toBe 60

    it 'adds the scaleOffset to the pitch with the default (chromatic) scale', ->
      expect( @scale.map(60,1) ).toBe 61
      expect( @scale.map(60,2) ).toBe 62
      expect( @scale.map(60,-1)).toBe 59
      expect( @scale.map(60,-2)).toBe 58

    it 'forces the note into the scale, adding octaves at "wrap-around" points', ->
      @scale.steps = [0,7]
      expect( @scale.map(60,0) ).toBe 60
      expect( @scale.map(60,1) ).toBe 67
      expect( @scale.map(60,2) ).toBe 72
      expect( @scale.map(60,-1)).toBe 55
      expect( @scale.map(60,-2)).toBe 48

    it 'treats a note not in the scale as a special "in-between" point', ->
      @scale.steps = [0,7]
      expect( @scale.map(63,0) ).toBe 63
      expect( @scale.map(63,1) ).toBe 67
      expect( @scale.map(63,2) ).toBe 72
      expect( @scale.map(63,-1)).toBe 60
      expect( @scale.map(63,-2)).toBe 55

    it "handles the case when the given pitch's pitch class is higher than the scale's highest pitch class", ->
      @scale.steps = [1,7]
      expect( @scale.map(68,1) ).toBe 73
      expect( @scale.map(68,2) ).toBe 79
      expect( @scale.map(68,3) ).toBe 85
      expect( @scale.map(68,-1)).toBe 67
      expect( @scale.map(68,-2)).toBe 61
      expect( @scale.map(68,-3)).toBe 55

    it "handles the case when the given pitch's pitch class is lower than the scale's lowest pitch class", ->
      @scale.steps = [1,7]
      expect( @scale.map(60,1) ).toBe 61
      expect( @scale.map(60,2) ).toBe 67
      expect( @scale.map(60,3) ).toBe 73
      expect( @scale.map(60,-1)).toBe 55
      expect( @scale.map(60,-2)).toBe 49
      expect( @scale.map(60,-3)).toBe 43


    it "handles the case when the given pitch's pitch class is the scale's highest pitch class", ->
      @scale.steps = [1,7]
      expect( @scale.map(67,1) ).toBe 73
      expect( @scale.map(67,2) ).toBe 79
      expect( @scale.map(67,3) ).toBe 85
      expect( @scale.map(67,-1)).toBe 61
      expect( @scale.map(67,-2)).toBe 55
      expect( @scale.map(67,-3)).toBe 49

    it "handles the case when the given pitch's pitch class is the scale's lowest pitch class", ->
      @scale.steps = [1,7]
      expect( @scale.map(61,1) ).toBe 67
      expect( @scale.map(61,-1)).toBe 55

    it "adds octaves when the scale is empty", ->
      @scale.steps = []
      expect( @scale.map(60,1) ).toBe 72
      expect( @scale.map(60,2) ).toBe 84
      expect( @scale.map(60,-1)).toBe 48
      expect( @scale.map(60,-2)).toBe 36
