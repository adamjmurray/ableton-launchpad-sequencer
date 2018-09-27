class MockFunction {
  constructor() {
    this.reset();
  }
  reset() {
    this.calls = [];
  }
  mock() {
    return (...args) => this.calls.push(args);
  }
}

global.mockOutlet = new MockFunction();
global.outlet = mockOutlet.mock();

beforeEach(() => mockOutlet.reset());
