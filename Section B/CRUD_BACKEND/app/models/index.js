const databaseConfig = require("../../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(databaseConfig.DB, databaseConfig.USER, databaseConfig.PASSWORD, {
  host: databaseConfig.HOST,
  dialect: databaseConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: databaseConfig.pool.max,
    min: databaseConfig.pool.min,
    acquire: databaseConfig.pool.acquire,
    idle: databaseConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.blogs = require("./blog.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);

db.users.hasMany(db.blogs, { as: "blogs" });

db.blogs.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

module.exports = db;
