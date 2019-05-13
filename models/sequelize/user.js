const db = require('../../utils/database');
const sequelize = require('sequelize');

const schema = {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: sequelize.STRING,
  },
  userType: {
    type: sequelize.INTEGER,
    default: 2,
  },
  docId: {
    type: sequelize.STRING,
    allowNull: false,
  },
  numberOfMatches: {
    type: sequelize.INTEGER,
    default: 0,
  },
  languageOpted: {
    type: sequelize.INTEGER,
    default: 0,
  },
  originPlatform: {
    type: sequelize.INTEGER,
    default: 0,
  },
  country: {
    type: sequelize.STRING,
  },
  originPlatformId: {
    type: sequelize.STRING,
  },

};

const User = db.define('user', schema);
module.exports = User;
