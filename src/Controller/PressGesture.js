import { GESTURE } from '../config';

export default class PressGesture {

  constructor() {
    this.reset();
  }

  reset() {
    this._previousIndex = null;
    this._repeatPressCount = 0;
  }

  interpretPress(index) {
    if (index === this._previousIndex) {
      this._repeatPressCount++;
      // Note, if you let this go to 6 presses without a reset(), it will only return DOUBLE_PRESS
      // If you want to watch for triple presses, reset() after each one occurs.
      if (this._repeatPressCount % 2 === 0) {
        return GESTURE.DOUBLE_PRESS;
      }
      if (this._repeatPressCount % 3 === 0) {
        return GESTURE.TRIPLE_PRESS;
      }
    } else {
      this._previousIndex = index;
      this._repeatPressCount = 1;
      return GESTURE.SELECT;
    }
  }
}
