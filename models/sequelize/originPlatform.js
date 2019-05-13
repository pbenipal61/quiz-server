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
  platform: {
    type: sequelize.STRING,
  },
};

const OriginPlatform = db.define('originPlatform', schema);
module.exports = OriginPlatform;
