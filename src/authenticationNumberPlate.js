const { LocalStrategy } = require('@feathersjs/authentication-local');
const { NotAcceptable, NotFound } = require('@feathersjs/errors');

class NumberPlateStrategy extends LocalStrategy {
	constructor(app) {
		super();
		this.app = app;
	}

	// eslint-disable-next-line no-unused-vars
	async authenticate(authentication, params) {
		const { entity } = this.configuration;
		const records = authentication;
		const UserModel = this.app.service('users').getModel();

		if (!records.phone) throw new NotAcceptable('Debes enviar tu telefono.');
		if (!records.number_plate)
			throw new NotAcceptable('Debes enviar tu numero de placa.');

		const user = await UserModel.findOne({
			where: {
				phone: records.phone,
				number_plate: records.number_plate,
			},
		}).then((it) => it && it.dataValues);

		if (!user) throw new NotFound('Usuario no encontrado.');

		//aqui vas a probar el token al principio te envian el token_login en null OJO

		return { authentication: { strategy: this.name }, [entity]: user };
	}
}

module.exports = NumberPlateStrategy;
