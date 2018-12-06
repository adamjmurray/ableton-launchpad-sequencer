import { PressGesture, Config } from '../../src';
import assert from 'assert';
const { GESTURE } = Config;

describe('PressGesture', () => {
  describe('interpretPress(index)', () => {
    it("returns GESTURE.SELECT the first time it's called", () => {
      const gesture = new PressGesture;
      assert.strictEqual(gesture.interpretPress(0), GESTURE.SELECT);
    });

    it("returns GESTURE.DOUBLE_PRESS the second time it's called with the same index", () => {
      const gesture = new PressGesture;
      gesture.interpretPress(0);
      assert.strictEqual(gesture.interpretPress(0), GESTURE.DOUBLE_PRESS);
    });

    it("returns GESTURE.TRIPLE_PRESS the third time it's called with the same index", () => {
      const gesture = new PressGesture;
      gesture.interpretPress(0);
      gesture.interpretPress(0);
      assert.strictEqual(gesture.interpretPress(0), GESTURE.TRIPLE_PRESS);
    });

    it("returns GESTURE.DOUBLE_PRESS on every even press count", () => {
      const gesture = new PressGesture;
      for (var i = 0; i < 16; i++) {
        assert.notEqual(gesture.interpretPress(0), GESTURE.DOUBLE_PRESS);
        assert.strictEqual(gesture.interpretPress(0), GESTURE.DOUBLE_PRESS);
      }
    });

    it("resets to the original behavior each time it's called with a new index", () => {
      const gesture = new PressGesture;
      gesture.interpretPress(0);
      assert.strictEqual(gesture.interpretPress(1), GESTURE.SELECT);
      assert.strictEqual(gesture.interpretPress(2), GESTURE.SELECT);
      assert.strictEqual(gesture.interpretPress(2), GESTURE.DOUBLE_PRESS);
      assert.strictEqual(gesture.interpretPress(1), GESTURE.SELECT);
      assert.strictEqual(gesture.interpretPress(1), GESTURE.DOUBLE_PRESS);
      assert.strictEqual(gesture.interpretPress(1), GESTURE.TRIPLE_PRESS);
    });
  });

  describe('reset()', () => {
    it("resets to the original behavior each time it's called", () => {
      const gesture = new PressGesture;
      gesture.interpretPress(0);
      gesture.reset();
      assert.strictEqual(gesture.interpretPress(0), GESTURE.SELECT);
      assert.strictEqual(gesture.interpretPress(0), GESTURE.DOUBLE_PRESS);
      gesture.reset();
      assert.strictEqual(gesture.interpretPress(0), GESTURE.SELECT);
      assert.strictEqual(gesture.interpretPress(0), GESTURE.DOUBLE_PRESS);
      assert.strictEqual(gesture.interpretPress(0), GESTURE.TRIPLE_PRESS);
    });
  });
});
