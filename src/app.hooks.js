const { when } = require('feathers-hooks-common');
const abilities = require('./hooks/abilities');
const authenticate = require('./hooks/authenticate');
// Application hooks that run for every service

module.exports = {
	before: {
		all: [
			when(
				(hook) => hook.params.provider && `/${hook.path}` !== '/authentication',
				authenticate,
				abilities()
			),
		],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},

	after: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},

	error: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},
};
