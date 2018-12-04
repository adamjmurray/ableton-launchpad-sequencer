# Max for Live Launchpad Sequencer

[![Ableton Live 10 Suite](https://img.shields.io/badge/Ableton_Live_10_Suite-bbbb00.svg)](http://www.ableton.com/live/)
[![Max for Live](https://img.shields.io/badge/Max_for_Live-cc5500.svg)](http://ableton.com/maxforlive)
[![Novation Launchpad MK1 / Mini](https://img.shields.io/badge/Novation_Launchpad_MK1_%2F%20Mini-aa2222.svg)](https://novationmusic.com/launch/launchpad-mini)

[![Build Status](https://img.shields.io/travis/adamjmurray/m4l-launchpad-sequencer.svg)](http://travis-ci.org/adamjmurray/m4l-launchpad-sequencer)

An [Ableton Live 10 Suite](http://www.ableton.com/live/) MIDI device for flexible step sequencing with a [Novation Launchpad](https://novationmusic.com/launch/launchpad-mini).

![screenshot](https://raw.githubusercontent.com/adamjmurray/m4l-launchpad-sequencer/master/screenshot.png)

Compatible with:
* Launchpad MK1 (the original discontinued Launchpad)
* Launchpad Mini
* No Launchpad required. Everything works with the on-screen UI in Live.

It should function with the newer Launchpad models, however the color scheme will be wrong due to different LEDs on the new models. I think I know how to fix it, but I don't own one of these models. If you have a newer Launchpad, get in touch (file an issue here) and we can sort it out.

Built with [Max/MSP](http://cycling74.com/products/max), [Max for Live](http://ableton.com/maxforlive), [JavaScript](https://developer.mozilla.org/docs/Web/JavaScript/Guide), [Babel](https://babeljs.io/), [rollup.js](https://rollupjs.org), and [Mocha](https://mochajs.org/).


## Downloads

* [Launchpad Squencer 1.0](https://github.com/adamjmurray/m4l-launchpad-sequencer/raw/release/1.0/launchpad-sequencer.zip)

## Getting Started

Open the included example Live set and use the on-screen UI in Live to learn the interface. If you're using Launchpad hardware, make sure it's _not_ enabled as a control surface in Live's MIDI settings

The step sequencer has 4 independent tracks, each with 8 patterns that generate/modify notes and modulation CCs. The patterns have independent lengths from 1 to 64 steps. Pattern steps can be off or have 4 different color-coded values: 1 (green), 2 (yellow), 3 (orange), 4 (red).

Track settings on the left control the default pitch, velocity, and duration of notes. The duration is controlled as gate percentage of the step length. The "Step Len x" settings multiplies the step sequencer's step length (so if the sequencer step length is 16th notes, and you set the track "Step Len x" to 2, the track's steps will be 8th notes).

There are different types of patterns:
* Pitch/Gate patterns trigger a note and sets the pitch from the step value. 1 (green) plays a note with the track's default pitch. 2 (yellow) plays the next scale step up from there, and so on. By default the scale includes every note but you can change it.
* The Random Mute pattern mutes the current step with a probability depending on the step value: 1 is 25%, 2 is 50%, 3 is 75%, and 4 is 100%
* The Velocity pattern increase the velocity from the track's default (when the step is off) up to the max velocity 127 when the step value is 4
* The Duration pattern increases the duration depending on the step value: 1 is 2x the step length, 2 is 4x, 3 is 8x, and 4 is 16x. Note the track's duration gate percentage is always applied.

More thorough documentation will be provided in the future.

