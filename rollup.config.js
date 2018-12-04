import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/main.js',
  output: {
    file: 'launchpad-sequencer/launchpad-sequencer-device-project/launchpad-sequencer.js',
    format: 'es',
  },
  plugins: [
    babel(),
    resolve(), // allow `import './folder'` to resolve './folder/index.js'
    { renderChunk: code => code.replace(/\nexport.*/, '') }, // remove top-level exports
  ],
};