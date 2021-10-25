const app = require('../../src/app');

describe('\'position\' service', () => {
  it('registered the service', () => {
    const service = app.service('position');
    expect(service).toBeTruthy();
  });
});
