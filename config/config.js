require("dotenv").config();
module.exports = {
  scada: {
    username: "intern",
    password: "intern",
    database: "scada_db1",
    host: "192.168.9.47",
    port: "6447",
    dialect: "mysql",
  },
  fleet_distribution: {
    username: "intern",
    password: "intern",
    database: "fleet_distribution",
    host: "192.168.9.47",
    port: "3306",
    dialect: "mysql",
  },
  development: {
    username: "root",
    password: null,
    database: "database_development",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  checkln: {
    username: "iot_prod",
    password: "123456",
    database: "pengecekan_ln2",
    host: "192.168.9.47",
    port: "3306",
    dialect: "mysql",
  },
  rmpm_occupancy: {
    username: "iot_prod",
    password: "123456",
    database: "occupancy_rmpm",
    host: "192.168.9.47",
    port: "3306",
    dialect: "mysql",
  },
  budget_factory: {
    username: "iot_prod",
    password: "123456",
    database: "budget_actual_factory",
    host: "192.168.9.47",
    port: "3306",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
