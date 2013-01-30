# Max for Live: Launchpad Sequencer

[![Build Status](https://secure.travis-ci.org/adamjmurray/m4l-launchpad-sequencer.png)](http://travis-ci.org/adamjmurray/m4l-launchpad-sequencer)

A device for [Ableton Live](http://www.ableton.com/en/live/) that brings unique step sequencing capabilities to
the [Novation Launchpad](http://us.novationmusic.com/midi-controllers-digital-dj/launchpad) hardware controller.

Built with [Max/MSP](http://cycling74.com/products/max/) and [Max for Live](http://ableton.com/maxforlive) with much
of the code written in [CoffeeScript](http://coffeescript.org/).


## Usage

### Downloads

The first beta version is available at http://bit.ly/Vpmckt

### Getting Started

Open the included example Live set and press play. It will hopefully make sound electric piano sounds.

If you have plugged in your Launchpad, that should light up and respond to button presses.
(There's a "sync" button in the Sequencer track if you plug in the Launchpad after opening the Live set).
Make sure you disable the Launchpad as a "control surface", as explained in the "Launchpad IO" track.

It's a bit complicated, so I wrote some documentation.
In the sequencer track click the yellow help button and check out the tabs in there.
Also be sure to open Live's Info View and hover over parts of the device with your mouse for an explanation of each feature.

### Using in your own Ableton Live projects

Save the launchpad-sequencer folder (from the download above) to your computer as desired,
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

This part is a little tricky because it requires a few manaul steps. First run:

    cake release

Then:

0. open the example Live set
0. open the launchpad-sequencer
  * Freeze the Max patcher
  * Save the Max patcher
0. Open the launchpad-sequencer-proxy device
  * Freeze the Max patcher
  * Save the Max patcher
0. Save the Live set

And finally, back on the command line, run:

    cake dist

You should end up with a zip file in the "dist" folder that contains the application and example project.

