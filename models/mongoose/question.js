const mongoose = require('mongoose');
const random = require('mongoose-simple-random');

const questionSchema = new mongoose.Schema({
  categoryId: mongoose.Schema.Types.ObjectId,
  categoryTitle: mongoose.Schema.Types.String,
  uses: mongoose.Schema.Types.Number,
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
