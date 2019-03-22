const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
if (process.env.NODE_ENV != 'development') {


    const sequelize = new Sequelize('Quiz', 'root', 'Theprodigyclub1',
        {
            dialect: 'mysql', host: 'localhost',
            logging: false
        });


    module.exports = sequelize;
    module.exports.random = sequelize.random();
}
else {


    const sequelize = new Sequelize('Quiz', 'root', 'root',
        {
            dialect: 'mysql', host: 'localhost', port: 8889,
            logging: false
        });


    module.exports = sequelize;
    module.exports.random = sequelize.random();
}

