const mongoose = require('mongoose');

const schema = new mongoose.Schema({

  title: String,
  description: String,
  id: {
    type: Number,
  },
  numberOfRounds: {
    type: Number,
  },
  numberOfQuestions: {
    type: Number,
  },
  minBet: {
    type: Number,
    default: 10,
  },
  maxBet: {
    type: Number,
  },


});
// categorySchema.plugin(random);
module.exports = mongoose.model('MatchType', schema);
