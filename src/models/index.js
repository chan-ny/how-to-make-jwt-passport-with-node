const Sequelize = require("sequelize");
const config = require("../config/config");
const db = {};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require("../models/User.js")(sequelize, Sequelize);
db.Admin = require("../models/Admin")(sequelize, Sequelize);

module.exports = db;
