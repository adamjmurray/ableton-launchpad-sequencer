{Storage,Sequencer} = require "#{__dirname}/launchpad-sequencer.js"

describe 'Storage', ->

  beforeEach ->
    @storage = new Storage(new Sequencer)

  describe 'toJSONString()', ->
    it 'converts the sequencer to a string', ->
      json = @storage.toJSONString()
      expect( typeof json ).toEqual('string')

    it 'returns a eval-able JSON string', ->
      json = @storage.toJSONString()
      obj = eval('(' + json + ')')
      expect( obj.scale ).toEqual([0...12])
      expect( obj.tracks.length ).toBe(4)
