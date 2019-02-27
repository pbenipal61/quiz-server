const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Category = sequelize.define('category', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    numberOfQuestions: Sequelize.INTEGER,
    uses: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    dateOfAdding: Sequelize.STRING

});

const Question = sequelize.define('question', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    categoryId: Sequelize.INTEGER,
    question: Sequelize.STRING,
    correctAnswer: Sequelize.STRING,
    options: Sequelize.STRING,
    tags: Sequelize.STRING,
    hardness: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    correctGuesses: Sequelize.INTEGER,
    incorrectGuesses: Sequelize.INTEGER,
    dateOfAdding: Sequelize.STRING

});

Category.hasMany(Question);
Question.belongsTo(Category);

module.exports.Category = Category;
module.exports.Question = Question;