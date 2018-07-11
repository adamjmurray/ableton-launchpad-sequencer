# Max for Live: Launchpad Sequencer

[![Build Status](https://secure.travis-ci.org/adamjmurray/m4l-launchpad-sequencer.png)](http://travis-ci.org/adamjmurray/m4l-launchpad-sequencer)

A device for [Ableton Live](http://www.ableton.com/en/live/) that brings unique step sequencing capabilities to
the [Novation Launchpad](http://us.novationmusic.com/midi-controllers-digital-dj/launchpad) hardware controller.

Built with [Max/MSP](http://cycling74.com/products/max/), [Max for Live](http://ableton.com/maxforlive), and
a lot of JavaScript.


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
