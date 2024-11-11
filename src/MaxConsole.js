const toString = (any) => (`${any}`.includes("[object ") ? JSON.stringify(any) : `${any}`);

export default class MaxConsole {
  constructor() {
    this.log = (...values) => post(...values.map(toString), "\n");
    this.error = (...values) => error(...values.map(toString), "\n");
  }
}
