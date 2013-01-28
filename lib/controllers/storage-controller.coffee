# The interface to the pattr persistence system in Max.
class StorageController

  constructor: (@sequencer, @sequencerController) ->

  import: (filepath) ->
    file = new File(filepath, 'read')
    jsonString = file.readstring(10240) # 2048 * 5 is the max we can store in pattr objects in Max 5
    @sequencer.fromJSON(@parse jsonString)
    @sequencer.redraw()
    return


  export: (filepath) ->
    file = new File(filepath, 'write')
    file.writestring(@stringify @sequencer)
    file.close()
    return


  load: (path, jsonString) ->
    if path == 'dump' # we're done
      @sequencerController.redraw()
      return

    if path == 'global'
      @sequencer.fromJSON(@parse jsonString)
      return

    # other paths look like:
    # track[#{index}]
    matches =/^track\[(\d+)\]$/.exec(path)
    unless matches?
      # for debugging, but note on loadbang pattrstorage sends a weird message like: u594004503.json,0
      # error("launchpad sequencer can't load #{path} #{values}\n")
      return

    trackIndex = parseInt(matches[1])
    track = @sequencer.tracks[trackIndex]
    track?.fromJSON(@parse jsonString)
    return


  save: ->
    outlet(PATTR, 'global', @stringify(@sequencer, omitTracks:true))
    outlet(PATTR, "track[#{index}]", @stringify(track)) for track,index in @sequencer.tracks
    return


  ########################################################################################
  # JSON methods (implementation inspired by https://github.com/douglascrockford/JSON-js)

  # Generate a JSON string for a given object.
  # If the object implements toJSON() the return value of that method will be used to construct the JSON string.
  # If any options are passed in, they will be passed to any toJSON calls.
  stringify: (json, options) ->
    @_s('', {'': json}, options)

  _s: (key, holder, options) ->
    value = holder[key]
    return 'null' unless value?

    value = value.toJSON(options) if typeof value.toJSON == 'function'

    switch typeof value
      when 'object'
        if value instanceof Array
          '[' + (@_s(i, value, options) for i in [0...value.length] by 1).join(',') + ']'
        else
          # Note: not quotating the keys because they are all valid identifiers in this app.
          # This is technically not valid JSON but it *is* valid javascript object syntax.
          '{' + (key + ':' + @_s(key, value, options) for own key of value).join(',') + '}'

      when 'string' then '"' + value.replace('"', '\\"') + '"'

      else value.toString()


  # Parse the given JSON string into a generic JavaScript object
  parse: (jsonString) ->
    # Check that the String looks safe to eval. No "new", function call parentheses "()", or "="
    throw "cannot parse unsafe-looking JSON: #{jsonString}" if jsonString.match(/new|\(|\)|=/)
    eval('(' + jsonString + ')')
