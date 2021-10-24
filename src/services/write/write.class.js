const { Service } = require('feathers-sequelize');
exports.Write = class Write extends Service {
	async update(id, data, params) {
		const modelo = this.getModel();
		modelo.update(null, {}, { where: { id: [1, 2, 3, 4, 5, 6, 7, 8, 9] } });
		return data;
	}
};
