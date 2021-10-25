const { AbilityBuilder, Ability } = require('@casl/ability');
const { toMongoQuery } = require('@casl/mongoose');
const { Forbidden } = require('@feathersjs/errors');

const TYPE_KEY = Symbol.for('type');

function subjectName(subject) {
	if (!subject || typeof subject === 'string') {
		return subject;
	}

	return subject[TYPE_KEY];
}

async function defineAbilitiesFor(user) {
	const { rules, can } = new AbilityBuilder();
	if (user) {
		can('manage', 'all');

	}else {
	  can(['create'], 'users')
  }
	console.log(user)
	return new Ability(rules, { subjectName });
}

function canReadQuery(query) {
	return query !== null;
}

module.exports = function authorize(name = null) {
	return async function (hook) {
		const action = hook.method;
		const service = name ? hook.app.service(name) : hook.service;
		const serviceName = name || hook.path;
		const ability = await defineAbilitiesFor(hook.params.user, hook);
		const throwUnlessCan = (action, resource) => {
			if (ability.cannot(action, resource)) {
				throw new Forbidden(`You are not allowed to ${action} ${serviceName}`);
			}
		};

		hook.params.ability = ability;

		if (hook.method === 'create') {
			hook.data[TYPE_KEY] = serviceName;
			throwUnlessCan('create', hook.data);
		}

		if (!hook.id) {
			const query = toMongoQuery(ability, serviceName, action);

			if (canReadQuery(query)) {
				Object.assign(hook.params.query, query);
			} else {
				// The only issue with this is that user will see total amount of records in db
				// for the resources which he shouldn't know.
				// Alternative solution is to assign `__nonExistingField` property to query
				// but then feathers-mongoose will send a query to MongoDB which for sure will return empty result
				// and may be quite slow for big datasets
				hook.params.query.id = 0;
			}

			return hook;
		}

		const params = Object.assign({}, hook.params, { provider: null });
		const result = await service.get(hook.id, params);

		result[TYPE_KEY] = serviceName;
		throwUnlessCan(action, result);

		if (action === 'get') {
			hook.result = result;
		}

		return hook;
	};
};
