const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('user', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    facebookId: Sequelize.STRING,
    name: Sequelize.STRING,
    birthDate: Sequelize.STRING,
    email: Sequelize.STRING,
    profilePhoto: Sequelize.STRING,
    points: Sequelize.INTEGER,
    correctGuesses: Sequelize.INTEGER,
    incorrectGuesses: Sequelize.INTEGER,
    firstLogin: Sequelize.STRING,
    lastLogin: Sequelize.STRING,
    loginCount: Sequelize.INTEGER,
    device: Sequelize.STRING,
    country: Sequelize.STRING

});

module.exports = User;