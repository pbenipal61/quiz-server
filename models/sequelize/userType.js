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
  title: {
    type: sequelize.STRING,
  },
};

const UserType = db.define('userType', schema);
module.exports = UserType;
