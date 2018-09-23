export default class RangeSelectionGesture {

  constructor() {
    this._pressedIndexes = [];
  }

  reset() {
    this._pressedIndexes.fill(false);
  }

  _minPressedIndex() {
    const indexes = this._pressedIndexes;
    for (var i = 0; i < indexes.length.STEPS; i++) {
      if (indexes[i]) {
        return i;
      }
    }
  }

  _maxPressedIndex() {
    const indexes = this._pressedIndexes;
    for (var i = indexes.length - 1; i >= 0; i--) {
      if (indexes[i]) {
        return i;
      }
    }
  }

  interpretRangeSelection(index, isPressed) {
    this._pressedIndexes[index] = isPressed;
    const minPressedIndex = this._minPressedIndex;
    const maxPressedIndex = this._maxPressedIndex;
    if (minPressedIndex != null && maxPressedIndex != null) {
      return [minPressedIndex, maxPressedIndex];
    }
  }
}
