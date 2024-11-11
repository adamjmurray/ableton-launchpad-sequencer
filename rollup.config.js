import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.js",
  output: {
    file: "device/launchpad-sequencer.js",
    format: "es",
  },
  plugins: [
    resolve(), // allow `import './folder'` to resolve './folder/index.js'
    { renderChunk: (code) => code.replace(/\nexport.*/, "") }, // remove top-level exports
  ],
};
