// Initializes the `TCPUDP` service on path `/tcpudp`
const { Tcpudp } = require('./tcpudp.class');
const hooks = require('./tcpudp.hooks');

module.exports = function (app) {
	const options = {
		paginate: app.get('paginate'),
	};

	// Initialize our service with any options it requires
	app.use('/tcpudp', new Tcpudp(options, app));

	// Get our initialized service so that we can register hooks
	const service = app.service('tcpudp');

	service.hooks(hooks);
};
