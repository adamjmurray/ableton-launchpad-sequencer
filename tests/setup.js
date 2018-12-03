import MockOutlet from './MockOutlet';

global.mockOutlet = new MockOutlet();
global.outlet = mockOutlet.mock();

beforeEach(() => mockOutlet.reset());
