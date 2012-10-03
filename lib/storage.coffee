# The interface to the pattr persistence system in Max, and a copy/paste clipboard.
class Storage

  constructor: (@sequencer) ->


  load: (path, json) ->
    sequencer = @sequencer

    if path == 'dump' # we're done
      sequencer.redraw()
      return

    if path == 'global'
      global = @parse(json)
      # TODO: do this in a Global object fromJSON, and do some validation
      @sequencer.scale.steps = global.scale
      return

    # other paths look like:
    # track[#{index}]
    matches =/^track\[(\d+)\]$/.exec(path)

    unless matches?
      # for debugging, but note on loadbang pattrstorage sends a weird message like: u594004503.json,0
      # error("launchpad sequencer can't load #{path} #{values}\n")
      return

    trackIndex = parseInt(matches[1])
    track = sequencer.tracks[trackIndex]
    if track?
      object = @parse(json)
      track.fromJSON(object)
    return


  save: ->
    # TODO: introduce a Global object with it's own toJSON()
    # this code knows too much about the inside of Sequencer & Scale
    outlet(PATTR, 'global', @stringify({scale:@sequencer.scale.steps}))
    outlet(PATTR, "track[#{index}]", @stringify(track)) for track,index in @sequencer.tracks
    return


  ########################################################################################
  # JSON methods (implementation inspired by https://github.com/douglascrockford/JSON-js)

  # Generate a JSON string for a given object.
  # If the object implements toJSON() the return value of that method will be used to construct the JSON string.
  stringify: (json) ->
    @_s('', {'': json})

  _s: (key, holder) ->
    value = holder[key]
    return 'null' unless value?

    value = value.toJSON() if typeof value.toJSON == 'function'

    switch typeof value
      when 'object'
        if value instanceof Array
          '[' + (@_s(i, value) for i in [0...value.length] by 1).join(',') + ']'
        else
          # Note: not quotating the keys because they are all valid identifiers in this app.
          # This is technically not valid JSON but it *is* valid javascript object syntax.
          '{' + (key + ':' + @_s(key, value) for own key of value).join(',') + '}'

      when 'string' then '"' + value.replace('"', '\\"') + '"'

      else value.toString()


  # Parse the given JSON string into a generic JavaScript object
  parse: (jsonString) ->
    # Check that the String looks safe to eval. No "new", function call parentheses "()", or "="
    throw "cannot parse unsafe-looking JSON: #{jsonString}" if jsonString.match(/new|\(|\)|=/)
    eval('(' + jsonString + ')')
