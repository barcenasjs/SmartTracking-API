const app = require('../../src/app');

describe('\'test1\' service', () => {
  it('registered the service', () => {
    const service = app.service('test-1');
    expect(service).toBeTruthy();
  });
});
