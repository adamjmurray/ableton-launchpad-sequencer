import { GESTURE } from '../Config';

export default class PressGesture {

  constructor() {
    this.reset();
  }

  // TODO: call this to interupt button press counts when pressing e.g. a pattern button about double pressing a track button
  reset() {
    this._previousIndex = null;
    this._repeatPressCount = 0;
  }

  interpretPress(index) {
    if (index === this._previousIndex) {
      this._repeatPressCount++;
      if (this._repeatPressCount === 3) {
        this.setSlectedPatternMute()
        this._repeatPressCount = 0;
        return GESTURE.TRIPLE_PRESS;
      }

    } else {
      this._previousIndex = index;
      this._repeatPressCount = 1;
      return GESTURE.SELECT;
    }
  }
}
