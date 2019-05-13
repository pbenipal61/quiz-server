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
  numberOfRounds: {
    type: sequelize.INTEGER,
  },
  numberOfQuestions: {
    type: sequelize.INTEGER,
  },
  minBet: {
    type: sequelize.INTEGER,
    default: 10,
  },
  maxBet: {
    type: sequelize.INTEGER,
  },
};

const MatchType = db.define('matchType', schema);
module.exports = MatchType;
