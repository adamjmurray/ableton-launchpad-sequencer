import assert from 'assert';
import MockOutlet from './MockOutlet';

global.assert = assert;
global.mockOutlet = new MockOutlet();
global.outlet = mockOutlet.mock();

beforeEach(() => mockOutlet.reset());
