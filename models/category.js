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

const categorySchema = mongoose.Schema({

    title: mongoose.Schema.Types.String,

    status: mongoose.Schema.Types.Number,
    usePermission: mongoose.Schema.Types.Number,
    createdAt: mongoose.Schema.Types.Date,


});
//categorySchema.plugin(random);
module.exports = mongoose.model('Category', categorySchema);

// id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
// },
// title: Sequelize.STRING,
// numberOfQuestions: Sequelize.INTEGER,
// uses: Sequelize.INTEGER,
// status: Sequelize.INTEGER,
// dateOfAdding: Sequelize.STRING,
// usePermission: Sequelize.INTEGER