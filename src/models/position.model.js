// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const usersModel = require('./users.model')
module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const position = sequelizeClient.define('position', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      unsigned: true,
      unique: true,
    },
    lng: {type: DataTypes.STRING, unsigned: true},
    lat: {type: DataTypes.STRING, unsigned: true},
    user_id:{
      type:DataTypes.BIGINT,
      notNull: true
    }

  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  position.associate = function (models) {
  position.belongsTo(usersModel(app), {foreignKey: 'user_id', onDelete: 'CASCADE'})
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return position;
};
