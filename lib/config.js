/*
 * decaffeinate suggestions:
 * DS207: Consider shorter variations of null checks
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const TRACKS     = 4;
const PATTERNS   = 8;  // patterns per track
const STEPS      = 64; // sequencer steps per pattern
const ROW_LENGTH = 8;  // steps per row in the grid
const VALUES = 5; // number of distinct step values, currently off, green, yellow, orange, red

const DEFAULT_STEP_LENGTH = '16th';

const TRANSPORT_STOP = 123; // MIDI CC number

const NOOP = function() {}; // the "no operation" function

const GUI_STEP_WIDTH = 19;
const GUI_BUTTON_WIDTH = 13;

const DEFER_DELAY = 20; // How often (in ms) to schedule chunks of work. See Defer class.

// Max outlets
export let outlets = 17;
const LAUNCHPAD_NOTE = 0;
const LAUNCHPAD_CC   = 1;
const NOTE           = 2;
const CC             = 3;
const AFTERTOUCH     = 4;
const PATTR          = 5;
const TRACK_INDEX    = 6;
const STEP_VALUE     = 7;
const PATTERN_INDEX  = 8;
const GRID           = 9;
const TRACK_INFO     = 10;
const TRACK_MUTE     = 11;
const PATTERN_INFO   = 12;
const PATTERN_MUTE   = 13;
const SCALE          = 14;
const STEP_LENGTH    = 15;
const TRACK_MULTIPLIER = 16;

if ((this.console == null)) {
  // Simulate the console with the Max window, for debugging and interoperability with Node.js
  this.console = {
    log(...msg) { return post(msg+"\n"); },
    error(...msg) { return error(msg+"\n"); }
  };
}
