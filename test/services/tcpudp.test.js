const app = require('../../src/app');

describe('\'TCPUDP\' service', () => {
  it('registered the service', () => {
    const service = app.service('tcpudp');
    expect(service).toBeTruthy();
  });
});
