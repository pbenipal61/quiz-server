const Sequelize = require('sequelize');

const sequelize = new Sequelize('Quiz', 'root', 'Theprodigyclub1',
    {
        dialect: 'mysql', host: 'localhost',
        logging: false
    });

module.exports = sequelize;
module.exports.random = sequelize.random();