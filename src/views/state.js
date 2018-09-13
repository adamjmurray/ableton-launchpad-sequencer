import { NUMBER_OF } from '../config';

export default class State {

  constructor() {
    this.patternIndex = 0;
    this.trackIndex = 0;
    this.stepValue = 0;
    this.sequence = Array(NUMBER_OF.STEPS).fill(0);
    this.trackMutes = Array(NUMBER_OF.TRACKS).fill(false);
    this.patternMutes = Array(NUMBER_OF.PATTERNS).fill(false);
    this.isPatternOpsMode = false;
    this.startStepIndex = 0;
    this.endStepIndex = 63;
  }
}
