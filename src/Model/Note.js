import { MODE, NUMBER_OF } from '../config';

const { GATE_SUMMING } = MODE;

export default class Note {

  constructor() {
    this.gateValues = [];
    this.reset();
  }

  reset() {
    this.pitch = 0;
    this.pitch2 = null;
    this.pitch3 = null;
    this.velocity = 0;
    this.velocity2 = null;
    this.velocity3 = null;
    this.duration = 1;
    this.mute = false;
    this.enabled = false;
    for (var i = 0; i < NUMBER_OF.GATES; i++) {
      this.gateValues[i] = 0;
    }
    // Modulation and aftertouch aren't relly part of a "note"
    // but it's makes this a convenient model for evaluating a sequencer step:
    this.modulation = 0;
    this.aftertouch = 0;
  }

  gateValue(gateSummingMode) {
    let value = 0;
    switch (gateSummingMode) {
      case GATE_SUMMING.LOWEST:
        value = Math.min.apply(this, this.gateValues.filter(value => value > 0));
        break;

      case GATE_SUMMING.HIGHEST:
        value = Math.max.apply(this, this.gateValues);
        break;

      case GATE_SUMMING.RANDOM:
        const nonZeroValues = this.gateValues.filter(value => value > 0);
        value = nonZeroValues[Math.floor(Math.random() * nonZeroValues.length)];
        break;

      default:
        // GATE_SUMMING.ADD
        // and GATE_SUMMING.MULTI so we produce a note if any of them have a step value. Track will handle the behavior.
        for (var i = 0; i < NUMBER_OF.GATES; i++) {
          value += this.gateValues[i];
        }
        break;
    }
    // The first value just enables the note and uses the track pitch/velocity, so subtract 1:
    return value - 1;
  }
}
