## Developing this project

## Setup

Requires Node.js

    npm install


## Development tasks

### Building the code

    npm run build

### Rebuild on file changes

    npm run dev

### Testing

    npm test

### Retest on file changes

    npm run tdd


## Notes

When you are editing the launchpad sequencer device, updating button lights on the Launchpad doesn't always work as expected. Specifically when you change values, it may fail to turn the previous value's button off. If in doubt, close the device in Max and test inside Live.


## Releasing a new version

TODO: Update these steps

0. open the example Live set
0. open the launchpad-sequencer
  * Freeze the Max patcher
  * Save the Max patcher
0. Open the launchpad-sequencer-proxy device
  * Freeze the Max patcher
  * Save the Max patcher
0. Save the Live set
