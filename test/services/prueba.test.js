const app = require('../../src/app');

describe('\'prueba\' service', () => {
  it('registered the service', () => {
    const service = app.service('prueba');
    expect(service).toBeTruthy();
  });
});
