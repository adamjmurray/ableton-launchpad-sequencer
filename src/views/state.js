import { STEPS, TRACKS, PATTERNS } from '../config';

export default class State {

  constructor() {
    this.patternIndex = 0;
    this.trackIndex = 0;
    this.stepValue = 0;
    this.sequence = new Array(STEPS).fill(0);
    this.trackMutes = new Array(TRACKS).fill(false);
    this.patternMutes = new Array(PATTERNS).fill(false);
    this.isPatternOpsMode = false;
    this.startStepIndex = 0;
    this.endStepIndex = 63;
  }
}
