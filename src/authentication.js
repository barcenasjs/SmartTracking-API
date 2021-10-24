const { NotAuthenticated } = require('@feathersjs/errors');
const {
	AuthenticationService,
	JWTStrategy,
} = require('@feathersjs/authentication');
const { expressOauth } = require('@feathersjs/authentication-oauth');
const NumberPlateStrategy = require('./authenticationNumberPlate');
const lodash = require('lodash');

class CustomJWTStrategy extends JWTStrategy {
	async getEntityQuery(query) {
		return {
			$limit: 1,
			...query,
		};
	}

	async getEntity(id, params) {
		const entityService = this.entityService;

		if (entityService === null) {
			throw new NotAuthenticated('Could not find entity service');
		}

		const query = await this.getEntityQuery();
		const getParams = Object.assign({}, lodash.omit(params, 'provider'), {
			query,
		});
		const result = await entityService.get(id, getParams);

		if (!params.provider) {
			return result;
		}

		return result;
	}
}

module.exports = (app) => {
	const authentication = new AuthenticationService(app);

	authentication.register('jwt', new CustomJWTStrategy());
	authentication.register('number_plate', new NumberPlateStrategy(app));

	app.use('/authentication', authentication);
	app.configure(expressOauth());
};
