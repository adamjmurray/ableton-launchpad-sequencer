# Max for Live Launchpad Sequencer

[![Ableton Live 10 Suite](https://img.shields.io/badge/Ableton_Live_10_Suite-99aa00.svg)](http://www.ableton.com/live/)
[![Max for Live](https://img.shields.io/badge/Max_for_Live-cc5500.svg)](http://ableton.com/maxforlive)
[![Novation Launchpad MK1 / Mini](https://img.shields.io/badge/Novation_Launchpad_MK1_%2F%20Mini-991100.svg)](https://novationmusic.com/launch/launchpad-mini)

[![Build Status](https://img.shields.io/travis/adamjmurray/m4l-launchpad-sequencer.svg)](http://travis-ci.org/adamjmurray/m4l-launchpad-sequencer)

A device for [Ableton Live 10 Suite](http://www.ableton.com/live/) that brings unique step sequencing capabilities to
the [Novation Launchpad](https://novationmusic.com/launch/launchpad-mini) hardware controller.

Built with [Max/MSP](http://cycling74.com/products/max), [Max for Live](http://ableton.com/maxforlive), and
a lot of JavaScript.

Compatible with:
* Launchpad MK1 (the original discontinued Launchpad)
* Launchpad Mini

It should function with the newer Launchpad models, however the color scheme will be wrong due to the RGB LEDs on
the newer models (the MK1 and Mini only have Red and Green LEDs). If you use a newer Launchpad and want the colors fixed, file an issue here and I'll see what I can do.

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
