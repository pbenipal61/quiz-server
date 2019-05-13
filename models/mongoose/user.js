const mongoose = require('mongoose');

const miniMatchDataSchema = new mongoose.Schema({
  matchId: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: mongoose.Schema.Types.Date,
    default: new Date(),
  },
  running: {
    type: Boolean,
    default: false,
  },
  participants: [String],
});

const customLocale = new mongoose.Schema({
  country: mongoose.Schema.Types.String,
  city: mongoose.Schema.Types.String,
  language: mongoose.Schema.Types.String,
  timeZone: mongoose.Schema.Types.String,
});

const userSchema = new mongoose.Schema({
  originPlatform: mongoose.Schema.Types.String,
  originPlatformID: mongoose.Schema.Types.String,
  name: mongoose.Schema.Types.String,
  profilePhoto: mongoose.Schema.Types.String,
  birthDate: mongoose.Schema.Types.Date,
  email: mongoose.Schema.Types.String,
  points: mongoose.Schema.Types.Number,
  privilege: mongoose.Schema.Types.Number,
  correctGuesses: mongoose.Schema.Types.Number,
  incorrectGuesses: mongoose.Schema.Types.Number,
  firstLogin: mongoose.Schema.Types.Date,
  lastLogin: mongoose.Schema.Types.Date,
  loginCount: mongoose.Schema.Types.Number,
  device: mongoose.Schema.Types.String,
  locale: customLocale,
  matches: [miniMatchDataSchema],
});

module.exports = mongoose.model('User', userSchema);
