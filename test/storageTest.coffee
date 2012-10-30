{Storage,Sequencer,Track} = require "#{__dirname}/launchpad-sequencer.js"

describe 'Storage', ->

  beforeEach ->
    @sequencer = new Sequencer
    @storage = new Storage(@sequencer)

    # Delete the sequencers state so we can test fromJSON() is really loading state
    @clearSequencer = ->
      @sequencer.scale.steps = null
      @sequencer.stepLength = null
      for t in @sequencer.tracks
        t.pitch = null
        t.velocity = null
        t.duration = null
        t.mute = null
        for p in t.patterns
          p.type = null
          p.start = null
          p.end = null
          p.mute = null
          p.sequence = []


  describe 'stringify()', ->
    it 'converts the sequencer to a string', ->
      jsonString = @storage.stringify(@sequencer)
      expect( typeof jsonString ).toEqual 'string'

    it 'returns a eval-able JSON string', ->
      jsonString = @storage.stringify(@sequencer)
      obj = eval('(' + jsonString + ')')
      expect( obj.scale ).toEqual [0...12]
      expect( obj.tracks.length ).toBe 4

    it 'can be loaded with parse() and produce the same JSON string again', ->
      jsonString = @storage.stringify(@sequencer)
      @clearSequencer()
      expect( @storage.stringify(@sequencer) ).not.toEqual jsonString
      @sequencer.fromJSON(@storage.parse jsonString)
      expect( @storage.stringify(@sequencer) ).toEqual jsonString

    it 'passes the option omitTracks:true through to sequencer.toJSON(), which omits the track data', ->
      jsonString = @storage.stringify(@sequencer, omitTracks:true)
      json = eval('(' + jsonString + ')')
      expect( json ).toEqual
        scale: [0,1,2,3,4,5,6,7,8,9,10,11]
        stepLength : '16th'


  describe 'parse()', ->
    it 'loads sequencer state from a JSON string', ->
      jsonString = @storage.stringify(@sequencer)
      @clearSequencer()
      @sequencer.fromJSON(@storage.parse jsonString)
      expect( @sequencer.scale.steps ).toEqual [0...12]
      expect( @sequencer.stepLength).toEqual '16th'
      expect( @sequencer.tracks.length ).toBe 4
      for t in @sequencer.tracks
        expect( t.pitch ).toBe 60
        expect( t.velocity ).toBe 70
        expect( t.duration ).toBe 0.9
        expect( t.mute ).toBe false
        expect( t.patterns.length ).toBe 8
        for p,i in t.patterns
          expect( p.type ).toBe Track.DEFAULT_TYPES[i]
          expect( p.start).toBe 0
          expect( p.end ).toBe 63
          expect( p.mute ).toBe false
          expect( p.sequence).toEqual (0 for _ in [0..63])
