const rollup = require('rollup');
const babel = require('rollup-plugin-babel')
const { execSync } = require('child_process');

// TODO: find a way to share the config (put in a JSON file?)

const watcher = rollup.watch({
  input: 'src/main.js',
  output: {
    file: 'launchpad-sequencer/launchpad-sequencer.js',
    format: 'es',
  },
  plugins: [
    babel({
      babelrc: false,
      presets: [['env', { modules: false }]],
      plugins: ['external-helpers'],
    }),
  ],
});

watcher.on('event', event => {
  if (event.code === 'END') {
    execSync("sed -i 's/^export {.*};//' launchpad-sequencer/launchpad-sequencer.js");
    console.log('Rebuilt launchpad-sequencer/launchpad-sequencer.js @' + new Date())

  }
});