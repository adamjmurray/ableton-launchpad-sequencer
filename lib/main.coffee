launchpad = new Launchpad
sequencer = new Sequencer(launchpad)
storage   = new Storage(sequencer)
controller= new Controller(sequencer)

console.log 'reloaded at: ' + new Date
