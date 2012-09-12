# Max for Live: Launchpad Sequencer

A device for [Ableton Live](http://ableton.com/live-8) that brings unique step sequencing capabilities to
the [Novation Launchpad](http://us.novationmusic.com/midi-controllers-digital-dj/launchpad) hardware controller.

Built with [Max/MSP](http://cycling74.com/products/max/) and [Max for Live](http://ableton.com/maxforlive) with much
of the code written in [CoffeeScript](http://coffeescript.org/).


## Usage

### Downloading

First release coming soon... in the meantime you can build from source (instructions below)

### Example project

Open the Ableton Live project under the example-project folder
and follow the instructions in the launchpad sequencer device.

### Using in your own Ableton Live projects

Save the launchpad-sequencer folder to your computer as desired,
then add the launchpad-sequencer-proxy.amxd and launchpad-sequencer.amxd devices to your project.
For Live setup details, consult the example project.

For new projects, it's easiest to simply save a copy of the example project.


## Building from Source

### Prerequisites

0. Install [Node.js](http://nodejs.org/)
0. Install [CoffeeScript](http://coffeescript.org/#installation) via `npm install coffee-script`

To build the app for distribution, you also need [UglifyJS](https://github.com/mishoo/UglifyJS) via `npm install uglify-js`

### Building for normal use & distribution

From this directory, run:

    cake build

### Auto-building during development

From this directory, run:

    cake dev

### Building the app for distribution

From this directory, run:

    cake dist

and you should end up with a zip file in the "dist" folder that contains the application and example project.
