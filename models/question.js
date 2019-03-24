const mongoose = require('mongoose');
var random = require('mongoose-simple-random');

const questionSchema = mongoose.Schema({

    categoryId: mongoose.Schema.Types.ObjectId,
    categoryTitle: mongoose.Schema.Types.String,
    question: mongoose.Schema.Types.String,
    correctAnswer: mongoose.Schema.Types.String,
    option1: mongoose.Schema.Types.String,
    option2: mongoose.Schema.Types.String,
    option3: mongoose.Schema.Types.String,
    option4: mongoose.Schema.Types.String,
    option5: mongoose.Schema.Types.String,
    tags: mongoose.Schema.Types.String,
    hardness: mongoose.Schema.Types.Number,
    status: mongoose.Schema.Types.Number,
    correctGuesses: mongoose.Schema.Types.Number,
    option1Guesses: mongoose.Schema.Types.Number,
    option2Guesses: mongoose.Schema.Types.Number,
    option3Guesses: mongoose.Schema.Types.Number,
    option4Guesses: mongoose.Schema.Types.Number,
    option5Guesses: mongoose.Schema.Types.Number,
    usePermission: mongoose.Schema.Types.Number,
    createdAt: mongoose.Schema.Types.Date,


});
questionSchema.plugin(random);
module.exports = mongoose.model('Question', questionSchema);

// const Question = sequelize.define('question', {

//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     categoryId: Sequelize.INTEGER,
//     categoryTitle: Sequelize.STRING,
//     question: Sequelize.STRING,
//     correctAnswer: Sequelize.STRING,
//     option1: Sequelize.STRING,
//     option2: Sequelize.STRING,
//     option3: Sequelize.STRING,
//     option4: Sequelize.STRING,
//     option5: Sequelize.STRING,
//     tags: Sequelize.STRING,
//     hardness: Sequelize.INTEGER,
//     status: Sequelize.INTEGER,
//     correctGuesses: Sequelize.INTEGER,
//     option1Guesses: Sequelize.INTEGER,
//     option2Guesses: Sequelize.INTEGER,
//     option3Guesses: Sequelize.INTEGER,
//     option4Guesses: Sequelize.INTEGER,
//     option5Guesses: Sequelize.INTEGER,
//     dateOfAdding: Sequelize.STRING,
//     usePermission: Sequelize.INTEGER,

// });