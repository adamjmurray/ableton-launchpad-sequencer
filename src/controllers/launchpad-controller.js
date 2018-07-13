import Launchpad from '../views/launchpad';
import { ROW_LENGTH } from '../config';

export default class LaunchpadController {

  // Pattern "Ops" modes
  static get LENGTH_MODE() { return 0; }  // pattern start/end (length)
  static get STEPS_MODE() { return 1; } // pattern step values

  constructor(launchpad, sequencerController) {
    this.launchpad = launchpad;
    this.sequencerController = sequencerController;
    this.heldTop = null; // top button held down (only the first is recorded if there are multiple held down).
    this.heldGridX = null; // x index of grid button held down (only the first is recorded if there are multiple held down).
    this.heldGridY = null; // y index of grid button held down (only the first is recorded if there are multiple held down).
    this.heldGridXLatest = null; // the most recently held down grid button
    this.heldGridYLatest = null; // the most recently held down grid button
    this.trackMultiPress = 0;
    this.patternMultiPress = 0;
  }

  ctlin(cc, value) {
    const index = cc - 104;
    if (value > 0) {
      this._onTopDown(index);
      if (this.heldTop == null) {
        this.heldTop = index;
      }
    } else {
      if (this.heldTop === index) {
        this.heldTop = null;
      }
    }
  }

  notein(pitch, velocity) {
    const x = pitch % 16;
    const y = Math.floor(pitch / 16);
    if (x > 7) {
      if (velocity > 0) {
        this._onRightDown(y);
      }
    } else {
      if (velocity > 0) {
        this._onGridDown(x, y);
        this.heldGridXLatest = x;
        this.heldGridYLatest = y;
        if (this.heldGridX == null) {
          this.heldGridX = x;
          this.heldGridY = y;
        }
      } else {
        if (this.heldGridXLatest === x && this.heldGridYLatest === y) {
          this.heldGridXLatest = null;
          this.heldGridYLatest = null;
        }
        if ((this.heldGridX === x) && (this.heldGridY === y)) {
          this.heldGridX = this.heldGridXLatest;
          this.heldGridY = this.heldGridYLatest;
        }
      }
    }
  }

  // ==============================================================================
  // private

  // Launchpad button event handlers
  _onTopDown(buttonIndex) {
    this.patternMultiPress = 0;
    if (this.patternOpsMode) {
      // shift up, down, left, right, copy, paste, length mode, steps modes
      switch (buttonIndex) {
        case 0: this.sequencerController.rotate(8); break;
        case 1: this.sequencerController.rotate(-8); break;
        case 2: this.sequencerController.rotate(1); break;
        case 3: this.sequencerController.rotate(-1); break;
        case 4: this.sequencerController.reverse(); break;
        case 5: this.sequencerController.invert(); break;
        case 6: this.sequencerController.copyPattern(); break;
        case 7: this.sequencerController.pastePattern(); break;
      }
    } else if (buttonIndex <= 3) {
      if (this.sequencerController.track === buttonIndex) { // track already selected
        this.trackMultiPress += 1;
        if (this.trackMultiPress >= 3) {
          this.trackMultiPress = 0;
          this.sequencerController.toggleSelectedTrackMute(); // toggle mute
        }
      } else {
        this.trackMultiPress = 1;
        this.sequencerController.selectTrack(buttonIndex);
      }
    } else {
      // set step value
      this.trackMultiPress = 0;
      this.sequencerController.selectValue(buttonIndex - 3);
    }
  }

  _onRightDown(buttonIndex) {
    this.trackMultiPress = 0;
    if (this.patternOpsMode) {
      // heldTop check prevents bad UX with an extra press
      if (this.heldTop != null) { return; }
      this._patternOpsMode(false);
    }
    if (this.sequencerController.pattern === buttonIndex) { // pattern already selected
      this.patternMultiPress += 1;
      if (this.patternMultiPress >= 3) {
        this.patternMultiPress = 0;
        if (this.heldTop != null) {
          // it was held the whole time, because a top button press would have reset @patternMultiPress
          this._patternOpsMode(true);
        } else {
          this.sequencerController.toggleSelectedPatternMute(); // toggle mute
        }
      }
    } else {
      this.patternMultiPress = 1;
      this.sequencerController.selectPattern(buttonIndex);
    }
  }

  _onGridDown(x, y) {
    if (this.patternOpsMode) {
      if (this.heldGridX != null) {
        const start = x + (y * ROW_LENGTH);
        const end = this.heldGridX + (this.heldGridY * ROW_LENGTH);
        this.sequencerController.selectedPattern.setRange(start, end);
        // redraw range:
        launchpad.patternSteps(this.sequencerController.selectedPattern);
        this.sequencerController.drawPatternInfo();
      }
    } else {
      this.trackMultiPress = 0;
      this.patternMultiPress = 0;
      this.sequencerController.setGridValue(x, y);
    }
  }

  // enter the mode for pattern operations (set start/end, shift, copy, paste)
  _patternOpsMode(enabled) {
    this.patternOpsMode = enabled;
    const { launchpad } = this;
    launchpad.patternOpsMode = enabled;
    if (enabled) {
      // Top lights change to indicate we're in this mode.
      // Left 4 are for shifting
      launchpad._top(0, Launchpad.YELLOW);
      launchpad._top(1, Launchpad.YELLOW);
      launchpad._top(2, Launchpad.YELLOW);
      launchpad._top(3, Launchpad.YELLOW);
      // Next 2 are for reverse and invert
      launchpad._top(4, Launchpad.YELLOW);
      launchpad._top(5, Launchpad.YELLOW);
      // Last 2 are copy & paste
      launchpad._top(6, Launchpad.GREEN);
      launchpad._top(7, Launchpad.RED);
      launchpad.patternSteps(this.sequencerController.selectedPattern);
    } else {
      this.launchpad.allOff();
      this.sequencerController.drawLaunchpad();
    }
  }
}
