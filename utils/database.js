const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.SQL_DB_NAME,
    process.env.SQL_USER,
    process.env.SQL_PASSWORD,
    {
      host: process.env.SQL_HOST,
      port: process.env.SQL_PORT,
      dialect: 'mysql',

      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
);

module.exports = sequelize;
