const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
  numberOfQuestions: mongoose.Schema.Types.Number,
  questions: [],
});

const roundsTaken = new mongoose.Schema({
  by: mongoose.Schema.Types.String,
  checks: [[Boolean]],
  answers: [[mongoose.Schema.Types.String]],
});
const matchSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.Number,
  participants: [String],
  numberOfRounds: mongoose.Schema.Types.Number,
  bet: mongoose.Schema.Types.Number,
  currentRound: mongoose.Schema.Types.Number,
  currentTurn: String,
  rounds: [roundSchema],
  roundsTaken: [roundsTaken],
});

module.exports = mongoose.model('Match', matchSchema);
