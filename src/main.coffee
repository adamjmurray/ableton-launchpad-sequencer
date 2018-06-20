launchpad = new Launchpad
sequencer = new Sequencer(launchpad)


midiController= new MIDIController(sequencer)
sequencerController = new SequencerController(sequencer, launchpad)
launchdpadController= new LaunchpadController(launchpad, sequencerController)
storageController   = new StorageController(sequencer, sequencerController)

console.log 'reloaded at: ' + new Date
