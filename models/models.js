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
    dateOfAdding: Sequelize.STRING,
    usePermission: Sequelize.INTEGER

});

const Question = sequelize.define('question', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    categoryId: Sequelize.INTEGER,
    categoryTitle: Sequelize.STRING,
    question: Sequelize.STRING,
    correctAnswer: Sequelize.STRING,
    option1: Sequelize.STRING,
    option2: Sequelize.STRING,
    option3: Sequelize.STRING,
    option4: Sequelize.STRING,
    option5: Sequelize.STRING,
    tags: Sequelize.STRING,
    hardness: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    correctGuesses: Sequelize.INTEGER,
    option1Guesses: Sequelize.INTEGER,
    option2Guesses: Sequelize.INTEGER,
    option3Guesses: Sequelize.INTEGER,
    option4Guesses: Sequelize.INTEGER,
    option5Guesses: Sequelize.INTEGER,
    dateOfAdding: Sequelize.STRING,
    usePermission: Sequelize.INTEGER,

});

const User = sequelize.define('user', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    sm: Sequelize.STRING,
    smId: Sequelize.STRING,
    privilege: Sequelize.INTEGER,
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

Category.hasMany(Question);
Question.belongsTo(Category);

module.exports.Category = Category;
module.exports.Question = Question;
module.exports.User = User;