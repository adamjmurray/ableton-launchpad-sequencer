const launchpad = new Launchpad;
const sequencer = new Sequencer(launchpad);


const midiController= new MIDIController(sequencer);
const sequencerController = new SequencerController(sequencer, launchpad);
const launchdpadController= new LaunchpadController(launchpad, sequencerController);
const storageController   = new StorageController(sequencer, sequencerController);

console.log(`reloaded at: ${new Date}`);
