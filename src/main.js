// Max outlets
this.outlets = 17;

if ((this.console == null)) {
  // Simulate the console with the Max window, for debugging and interoperability with Node.js
  this.console = {
    log(...msg) { return post(msg + "\n"); },
    error(...msg) { return error(msg + "\n"); }
  };
}

const launchpad = new Launchpad;
const sequencer = new Sequencer(launchpad);

const midiController = new MIDIController(sequencer);
const sequencerController = new SequencerController(sequencer, launchpad);
const launchdpadController = new LaunchpadController(launchpad, sequencerController);
const storageController = new StorageController(sequencer, sequencerController);

console.log(`reloaded at: ${new Date}`);
