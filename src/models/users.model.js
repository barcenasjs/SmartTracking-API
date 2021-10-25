// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
	const sequelizeClient = app.get('sequelizeClient');
	const users = sequelizeClient.define(
		'users',
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				autoIncrement: true,
				unsigned: true,
				unique: true,
			},
			full_name: {
				type: DataTypes.STRING(30),
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			number_plate: {
				type: DataTypes.STRING,
				allowNull: true,
        unique: true
			},
			verification_code: {
				type: DataTypes.STRING(4),
				allowNull: true,
			},
		},
		{
			hooks: {
				beforeCount(options) {
					options.raw = true;
				},
			},
		}
	);

	// eslint-disable-next-line no-unused-vars
	users.associate = function (models) {
		// Define associations here
		// See http://docs.sequelizejs.com/en/latest/docs/associations/
	};

	return users;
};
