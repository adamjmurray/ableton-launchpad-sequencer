# General-purpose utility functions

stringify = (obj) ->
  if typeof(obj) == 'object'
    if obj instanceof Array
      '[' + ("#{stringify value}" for value in obj).join(', ') + ']'
    else
      '{' + ("#{key}:#{stringify value}" for own key,value of obj).join(', ') + '}'
  else
    if typeof(obj) == 'string'
      "\"#{string}\""
    else
      obj.toString()


log = (msg) -> post(msg+'\n')
