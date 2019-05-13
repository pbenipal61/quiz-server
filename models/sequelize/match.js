const db = require('../../utils/database');
const sequelize = require('sequelize');

const schema = {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  finishedAt: {
    type: sequelize.DATE,
  },
  docId: {
    type: sequelize.STRING,
    allowNull: false,
  },
  startedBy: {
    type: sequelize.INTEGER,
  },
  winner: {
    type: sequelize.INTEGER,
  },
  bet: {
    type: sequelize.INTEGER,
    default: 10,
  },
  matchType: {
    type: sequelize.INTEGER,
    default: 0,
  },
  otherParticipant: {
    type: sequelize.INTEGER,
  },
  running: {
    type: sequelize.BOOLEAN,
    default: true,
  },


};

const Match = db.define('match', schema);
module.exports = Match;
