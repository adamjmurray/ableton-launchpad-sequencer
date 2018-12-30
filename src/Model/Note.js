export default class Note {

  constructor() {
    this.reset();
  }

  reset() {
    this.pitch = 0;
    this.velocity = 0;
    this.duration = 1;
    this.mute = false;
    this.enabled = false;
    this.gateValue = 0;
    // Modulation and aftertouch aren't relly part of a "note"
    // but it's makes this a convenient model for evaluating a sequencer step:
    this.modulation = 0;
    this.aftertouch = 0;
  }
}
