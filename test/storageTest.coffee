{Storage,Sequencer,Track} = require "#{__dirname}/launchpad-sequencer.js"

describe 'Storage', ->

  beforeEach ->
    @sequencer = new Sequencer
    @storage = new Storage(@sequencer)

    # Delete the sequencers state so we can test fromJSON() is really loading state
    @clearSequencer = ->
      @sequencer.scale.steps = null
      for t in @sequencer.tracks
        t.basePitch = null
        t.baseVelocity = null
        t.durationScale = null
        t.mute = null
        for p in t.patterns
          p.type = null
          p.start = null
          p.end = null
          p.mute = null
          p.sequence = null



  describe 'toJSON()', ->
    it 'converts the sequencer to a string', ->
      json = @storage.toJSON()
      expect( typeof json ).toEqual 'string'

    it 'returns a eval-able JSON string', ->
      json = @storage.toJSON()
      obj = eval('(' + json + ')')
      expect( obj.scale ).toEqual [0...12]
      expect( obj.tracks.length ).toBe 4

    it 'can be loaded with fromJSON() and produce the same JSON string again', ->
      json = @storage.toJSON()
      @clearSequencer()
      expect( @storage.toJSON() ).not.toEqual json
      @storage.fromJSON(json)
      expect( @storage.toJSON() ).toEqual json


  describe 'fromJSON()', ->

    it 'loads sequencer state from a JSON string', ->
      json = @storage.toJSON()
      @clearSequencer()
      @storage.fromJSON(json)
      expect( @sequencer.scale.steps ).toEqual [0...12]
      expect( @sequencer.tracks.length ).toBe 4
      for t in @sequencer.tracks
        expect( t.basePitch ).toBe 60
        expect( t.baseVelocity ).toBe 70
        expect( t.durationScale ).toBe 0.9
        expect( t.mute ).toBe false
        expect( t.patterns.length ).toBe 8
        for p,i in t.patterns
          expect( p.type ).toBe Track.DEFAULT_TYPES[i]
          expect( p.start).toBe 0
          expect( p.end ).toBe 63
          expect( p.mute ).toBe false
          expect( p.sequence).toEqual (0 for _ in [0..63])
