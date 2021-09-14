// Initializes the `write` service on path `/write`
const { Write } = require('./write.class');
const createModel = require('../../models/write.model');
const hooks = require('./write.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/write', new Write(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('write');

  service.hooks(hooks);
};
