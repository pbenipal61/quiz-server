const db = require('../../utils/database');
const sequelize = require('sequelize');

const schema = {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  docId: {
    type: sequelize.STRING,
  },
  language: {
    type: sequelize.STRING,
  },
};

const Language = db.define('language', schema);
module.exports = Language;
