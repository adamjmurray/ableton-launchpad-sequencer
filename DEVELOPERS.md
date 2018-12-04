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

1. Create a new release branch: release/{version-number}
2. Open the example Live set
3. For each device (launchpad-sequencer, launchpad-sequencer-io-ch1, and launchpad-sequencer-io-ch3):
  * Edit the device
  * Freeze the Max patch
  * Save the Max patch
4. Save the Live set
5. Run

    npm run release

6. Check in the generated launchpad-sequencer.zip
7. Push the changes
8. Switch back to the master branch and update the README with a link to the release
