import { Config } from '../src';
const { OUTLET } = Config;
const VALID_OUTLET_INDEXES = Object.values(OUTLET);

export default class MockOutlet {

  constructor() {
    this.reset();
  }

  reset() {
    this.calls = [];
  }

  mock() {
    return (...args) => this.calls.push(args);
  }

  callsFor(outletIndex) {
    if (!VALID_OUTLET_INDEXES.includes(outletIndex)) {
      throw new Error(`Invalid outlet index: ${outletIndex}`)
    }
    return this.calls
      .filter(([index, _]) => index === outletIndex)
      .map(([_, ...args]) => args);
  }
}
