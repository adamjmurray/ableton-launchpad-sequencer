launchpad = new Launchpad
sequencer = new Sequencer(launchpad)


midiController= new MIDIController(sequencer)
launchdpadController= new LaunchpadController(sequencer)
sequencerController = new SequencerController(sequencer, launchpad)
storageController   = new StorageController(sequencer, sequencerController)

console.log 'reloaded at: ' + new Date
