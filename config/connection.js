const Sequelize = require('sequelize');
const config = require('./config');

const connectScada = new Sequelize(config.scada.database, config.scada.username, config.scada.password, config.scada);
const connectFleet = new Sequelize(config.fleet_distribution.database, config.fleet_distribution.username, config.fleet_distribution.password, config.fleet_distribution);
const connectLn = new Sequelize(config.checkln.database, config.checkln.username, config.checkln.password, config.checkln);

module.exports = {
	connectScada,
	connectFleet,
	connectLn
};
