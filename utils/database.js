const Sequelize = require('sequelize');

const sequelize = new Sequelize('Quiz', 'root', 'Theprodigyclub1',
    {
        dialect: 'mysql', host: 'localhost'
    });

module.exports = sequelize;