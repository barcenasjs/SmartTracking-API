// Initializes the `position` service on path `/position`
const { Position } = require('./position.class');
const createModel = require('../../models/position.model');
const hooks = require('./position.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/position', new Position(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('position');

  service.hooks(hooks);
};
