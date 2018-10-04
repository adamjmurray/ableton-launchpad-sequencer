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
    // Modulation and aftertouch aren't relly part of a "note"
    // but it's makes this a convenient model for evaluating a sequencer step:
    this.modulation = null;
    this.aftertouch = null;
  }

  toString() {
    return JSON.stringify(this);
  }
}