require('dotenv').config();
module.exports = {
	scada: {
		username: 'intern',
		password: 'intern',
		database: 'scada_db1',
		host: '192.168.9.47',
		port: '3306',
		dialect: 'mysql',
	},
	development: {
		username: 'root',
		password: null,
		database: 'database_development',
		host: '127.0.0.1',
		dialect: 'mysql',
	},
	test: {
		username: 'root',
		password: null,
		database: 'database_test',
		host: '127.0.0.1',
		dialect: 'mysql',
	},
	production: {
		username: 'root',
		password: null,
		database: 'database_production',
		host: '127.0.0.1',
		dialect: 'mysql',
	},
};
