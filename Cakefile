PROJECT = 'launchpad-sequencer'
VERSION = '1.0-alpha'

BASE_DIR = __dirname
BUILD_DIR = "#{BASE_DIR}/#{PROJECT}"
SRC_DIR = "#{BASE_DIR}/lib"
TEST_DIR = "#{BASE_DIR}/test"
EXAMPLE_DIR = "#{BASE_DIR}/example-project"
DIST_DIR = "#{BASE_DIR}/dist"

src_for = (name) -> "#{SRC_DIR}/#{name}.coffee"

BASE_SRC_FILES = (src_for name for name in [
  'config'
  'defer'
  'launchpad'
  'gui'
  'scale'
  'pattern'
  'track'
  'sequencer'
  'storage'
])
SRC_FILES = BASE_SRC_FILES.concat(src_for 'main')
OUT_FILE = "#{BUILD_DIR}/#{PROJECT}.js"

COFFEE_ARGS = [
  '--bare'
  '--join'
  OUT_FILE
  '--compile'
  'license.txt'
].concat SRC_FILES

TEST_FILES = BASE_SRC_FILES.concat(src_for 'exports')
TEST_OUT_FILE = "#{TEST_DIR}/#{PROJECT}.js"

spawn = require('child_process').spawn

exec = (cmd, args=[], options={}, callback) ->
  desc = "#{cmd} #{args.join(' ')}"
  desc = "cd #{options.process?.cwd} && #{desc}" if options.process?.cwd?
  console.log "\n#{desc}"
  console.log options.message if options.message
  process = spawn(cmd, args, options.process)
  process.stdout.on 'data', (data)-> console.log(data.toString())
  process.stderr.on 'data', (data)-> console.log(data.toString())
  process.on 'exit', (code)->
    if code == 0
      console.log "SUCCESS" unless options.suppressStatus
      callback() if callback
    else
      console.log "exited with error code #{code}"


task 'clean', 'remove build artifacts', ->
  exec 'rm', ['-rf', OUT_FILE, DIST_DIR]


task 'dev', 'watch the source files and rebuild automatically while developing', ->
  exec 'coffee', ['--watch'].concat(COFFEE_ARGS), {message: "\nWatching files... use ctrl+C to exit.\n"}


task 'build', 'build the app (debug version)', ->
  exec 'coffee', COFFEE_ARGS


task 'validate', 'validate syntax', ->
  for file in SRC_FILES
    unless file.match /main\.coffee$/ # this will always fail because it depends on the other files
      exec 'coffee', [file], {suppressStatus: true}


task 'test', 'run the unit tests', ->
  exec 'coffee', ['--compile', '--join', TEST_OUT_FILE].concat(TEST_FILES), {}, ->
    exec 'jasmine-node', ['--coffee', '--matchall', '--verbose', TEST_DIR]


task 'release', 'build the app (release version, minified)', ->
  console.log '\nREMINDER: comment out any debugging code prior to packaging' # TODO: automate?
  exec 'coffee', COFFEE_ARGS, suppressStatus:true, ->
    exec 'uglifyjs', ['-nmf', '--overwrite', OUT_FILE], {}, ->
      console.log '\nDone building the release vesion.\n' +
       'Now freeze the Max device, save it, and then run the "cake dist"\n'


task 'dist', 'package the app for distribution', ->
  console.log '\nAssuming the release version of the app has been built, and the Max device has been frozen.'
  opts = {suppressStatus: true}
  project = "#{PROJECT}-#{VERSION}"
  archive = "#{project}.zip"
  distFolder = "#{DIST_DIR}/#{project}"
  exec 'rm', ['-rf', DIST_DIR], opts, ->
    exec 'mkdir', ['-p', "#{distFolder}/#{PROJECT}"], opts, ->
      # I don't like hard-coding the amxd files, but it's difficult doing something like cp *.amxd in Node.js
      exec 'cp', ["#{BUILD_DIR}/launchpad-sequencer.amxd", "#{distFolder}/#{PROJECT}"], opts, ->
        exec 'cp', ["#{BUILD_DIR}/launchpad-sequencer-proxy.amxd", "#{distFolder}/#{PROJECT}"], opts, ->
          exec 'cp', ['-r', EXAMPLE_DIR, "#{distFolder}/example-project"], opts, ->
            exec 'zip', ['-qlr', '-9', archive, project], {process:{cwd:DIST_DIR}}
