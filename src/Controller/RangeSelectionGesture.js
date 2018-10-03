export default class RangeSelectionGesture {

  constructor() {
    this._pressedIndexes = [];
  }

  reset() {
    this._pressedIndexes.fill(false);
  }

  get _minPressedIndex() {
    const indexes = this._pressedIndexes;
    for (var i = 0; i < indexes.length; i++) {
      if (indexes[i]) {
        return i;
      }
    }
  }

  get _maxPressedIndex() {
    const indexes = this._pressedIndexes;
    for (var i = indexes.length - 1; i >= 0; i--) {
      if (indexes[i]) {
        return i;
      }
    }
  }

  interpretRangeSelection(index, isPressed) {
    this._pressedIndexes[index] = isPressed;
    if (this._pressedIndexes.filter(i => i).length < 2) {
      // less than 2 buttons pressed, so there is no range
      return;
    }
    return [this._minPressedIndex, this._maxPressedIndex];
  }
}
