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

1. Open the example Live set
2. Edit the launchpad-sequencer.amxd device, freeze it, and save (Note: the io-ch1 and io-ch3 devices should already be frozen)
3. Update the "release" script in package.json to created the desired zip file (e.g. change -1.1.zip to -1.2.zip if releasing 1.2)
5. Run

      npm run release

6. Check in the generated zip under releases
7. Update the README with a link to the release
8. Revert the launchpad-sequencer.amxd device to unfreeze it (no point in checking this in)
9. Push the changes
