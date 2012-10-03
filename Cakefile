PROJECT = 'launchpad-sequencer'
VERSION = '0.1'

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


task 'dev', 'watch the source files and rebuild automatically while developing', ->
  exec 'coffee', ['--watch'].concat(COFFEE_ARGS), {message: "\nWatching files... use ctrl+C to exit.\n"}


task 'build', 'build the app', ->
  exec 'coffee', COFFEE_ARGS


task 'validate', 'validate syntax', ->
  for file in SRC_FILES
    unless file.match /main\.coffee$/ # this will always fail because it depends on the other files
      exec 'coffee', [file], {suppressStatus: true}


task 'dist', 'build & package the app for distribution', ->
  opts = {suppressStatus: true}
  project = "#{PROJECT}-#{VERSION}"
  archive = "#{project}.zip"
  distFolder = "#{DIST_DIR}/#{project}"
  exec 'rm', ['-rf', DIST_DIR], opts, ->
    exec 'coffee', COFFEE_ARGS, opts, ->
      exec 'uglifyjs', ['--overwrite', OUT_FILE], opts, ->
        exec 'mkdir', ['-p', distFolder], opts, ->
          exec 'cp', ['-r', BUILD_DIR, "#{distFolder}/#{PROJECT}"], opts, ->
            exec 'cp', ['-r', EXAMPLE_DIR, "#{distFolder}/example-project"], opts, ->
              exec 'zip', ['-qlr', '-9', archive, project, '-x', '"*.DS_Store"'], {process:{cwd:DIST_DIR}}


task 'clean', 'remove build artifacts', ->
  exec 'rm', ['-rf', OUT_FILE, DIST_DIR]


task 'test', 'run the unit tests', ->
  exec 'coffee', ['--compile', '--join', TEST_OUT_FILE].concat(TEST_FILES), {}, ->
    exec 'jasmine-node', ['--coffee', '--matchall', '--verbose', TEST_DIR]