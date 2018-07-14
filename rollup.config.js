import { babel, unexport } from 'rollup-plugin-bundleutils';

export default {
  input: 'src/main.js',
  output: {
    file: 'launchpad-sequencer/launchpad-sequencer.js',
    format: 'es',
  },
  plugins: [
    babel(),
    unexport(),
  ],
};