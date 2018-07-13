import babel from 'rollup-plugin-babel';

export default {
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
};