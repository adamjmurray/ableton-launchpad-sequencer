# Max for Live: Launchpad Sequencer

A device for [Ableton Live](http://ableton.com/live-8) that brings unique step sequencing capabilities to
the [Novation Launchpad](http://us.novationmusic.com/midi-controllers-digital-dj/launchpad) hardware controller.

Built with [Max/MSP](http://cycling74.com/products/max/) and [Max for Live](http://ableton.com/maxforlive) with much
of the code written in [CoffeeScript](http://coffeescript.org/).


## Building from Source

### Prerequisites

0. Install [Node.JS](http://nodejs.org/)
0. Install [CoffeeScript](http://coffeescript.org/#installation) via npm

### Building for distribution

From this directory, run:

    coffee --join app/launchpad-sequencer.js --compile lib/*.coffee

### Auto-building during development

From this directory, run:

    coffee --watch --join app/launchpad-sequencer.js --compile lib/*.coffee
