const Sequelize = require('Sequelize');
const config = require('./config');

const connectScada = new Sequelize(config.scada.database, config.scada.username, config.scada.password, config.scada);

module.exports = {
	connectScada,
};
