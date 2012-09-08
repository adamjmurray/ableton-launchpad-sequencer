SRCS = [
  'launchpad'
  'main'
]
BASE_BUILD_CMD = '--bare --join launchpad-sequencer/launchpad-sequencer.js --compile '
BASE_BUILD_CMD += ("lib/#{src}.coffee" for src in SRCS).join(' ')


process = require 'child_process'

exec = (cmd) ->
  console.log "\n#{cmd}"
  process.exec cmd, (error, stdout, stderr) ->
    console.log stdout if stdout
    if error
      console.error "ERROR"
      console.error stderr
    else
      console.log "SUCCESS"


task 'dev', 'watch the source files and rebuild automatically while developing', ->
  console.log "\nWatching files... use ctrl+C to exit."
  exec "coffee --watch #{BASE_BUILD_CMD}"


task 'build', 'build the app', ->
  exec "coffee #{BASE_BUILD_CMD}"
