# Max for Live: Launchpad Sequencer

[![Build Status](https://secure.travis-ci.org/adamjmurray/m4l-launchpad-sequencer.png)](http://travis-ci.org/adamjmurray/m4l-launchpad-sequencer)

A device for [Ableton Live](http://www.ableton.com/en/live/) that brings unique step sequencing capabilities to
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
0. Install [CoffeeScript](http://coffeescript.org/#installation) via `sudo npm install -g coffee-script`
0. Install [jasmine-node](http://github.com/mhevery/jasmine-node#install) via `sudo npm install -g jasmine-node`

Note: After installing Node.js, you can (maybe?) skip the other steps and run `npm install` in this repository.

To build the app for distribution, you also need [UglifyJS](https://github.com/mishoo/UglifyJS) via `sudo npm install -g uglify-js`

### Building for normal use & distribution

From this directory, run:

    cake build

### Auto-building during development

    cake dev

### Running unit tests

    cake test

### Building the app for distribution

    cake dist

and you should end up with a zip file in the "dist" folder that contains the application and example project.

