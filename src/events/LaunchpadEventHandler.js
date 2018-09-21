export default class LaunchpadEventHandler {

  constructor({
    onGridButtonDown,
    onGridButtonUp,
    onRightColumnButtonDown,
    onRightColumnButtonUp,
    onTopRowButtonDown,
    onTopRowButtonUp,
  }) {
    this.onGridButtonDown = onGridButtonDown;
    this.onGridButtonUp = onGridButtonUp;
    this.onRightColumnButtonDown = onRightColumnButtonDown;
    this.onRightColumnButtonUp = onRightColumnButtonUp;
    this.onTopRowButtonDown = onTopRowButtonDown;
    this.onTopRowButtonUp = onTopRowButtonUp;
  }

  handleNoteIn(pitch, velocity) {
    const x = pitch % 16;
    const y = Math.floor(pitch / 16);
    if (x > 7) {
      if (velocity > 0) {
        this.onRightColumnButtonDown(y);
      } else {
        this.onRightColumnButtonUp(y);
      }
    } else {
      if (velocity > 0) {
        this.onGridButtonDown(x, y);
      } else {
        this.onGridButtonUp(x, y);
      }
    }
  }

  handleCcIn(cc, value) {
    const x = cc - 104;
    if (value > 0) {
      this.onTopRowButtonDown(x);
    } else {
      this.onTopRowButtonUp(x);
    }
  }

  // TODO: I think these events are too low level
}