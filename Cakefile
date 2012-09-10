SRCS = [
  'core'
  'launchpad'
  'gui'
  'pattern'
  'track'
  'sequencer'
  'pattr'
  'main'
]

SRC_FILES = ("lib/#{src}.coffee" for src in SRCS)

COFFEE_ARGS = [
  '--bare'
  '--join'
  'launchpad-sequencer/launchpad-sequencer.js'
  '--compile'
].concat SRC_FILES


exec = (cmd, args, options={}) ->
  console.log "\n#{cmd} #{args.join(' ')}"
  console.log options.message if options.message
  process = require('child_process').spawn(cmd, args)
  process.stdout.on 'data', (data)-> console.log(data.toString())
  process.stderr.on 'data', (data)-> console.log(data.toString())
  process.on 'exit', (code)->
    if code == 0
      console.log "SUCCESS" unless options.suppressStatus
    else
      console.log "exited with error code #{code}" unless options.suppressStatus


task 'dev', 'watch the source files and rebuild automatically while developing', ->
  exec 'coffee', ['--watch'].concat(COFFEE_ARGS), {
    message: "\nWatching files... use ctrl+C to exit.\n"
  }


task 'build', 'build the app', ->
  exec 'coffee', COFFEE_ARGS


task 'validate', 'validate syntax', ->
  for file in SRC_FILES
    unless file == 'lib/main.coffee' # this will always fail because it depends on the other files
      exec 'coffee', [file], {suppressStatus: true}
