const mongoose = require('mongoose');


const roundSchema = mongoose.Schema({
    numberOfQuestions: mongoose.Schema.Types.Number,
    questions: [],
    taken: []

});

const matchSchema = mongoose.Schema({
    type: mongoose.Schema.Types.Number,
    participants: [mongoose.Schema.Types.ObjectId],
    numberOfRounds: mongoose.Schema.Types.Number,
    bet: mongoose.Schema.Types.Number,
    currentRound: mongoose.Schema.Types.Number,
    currentTurn: mongoose.Schema.Types.ObjectId,
    rounds: [roundSchema]

});

module.exports = mongoose.model('Match', matchSchema);