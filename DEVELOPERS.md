## Developing this project

## Setup

Requires Node.js

    npm install

### Building the code

    npm run build

### Auto-building during development

    npm run dev

### Running tests

    npm test            # or...
    npm run watch-test  # to automatically rerun on file changes

### Building for distribution

This part is a little tricky because it requires a few manaul steps. After building:

0. open the example Live set
0. open the launchpad-sequencer
  * Freeze the Max patcher
  * Save the Max patcher
0. Open the launchpad-sequencer-proxy device
  * Freeze the Max patcher
  * Save the Max patcher
0. Save the Live set

TODO: I used to have a script to copy files around and zip up a release. Decide on what to do about this now...
This might be easier with Max 7/8 projects feature?