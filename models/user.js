const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    originPlatform: mongoose.Schema.Types.String,
    originPlatformID: mongoose.Schema.Types.String,
    name: mongoose.Schema.Types.String,
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
    country: mongoose.Schema.Types.String

});

module.exports = mongoose.model('User', userSchema);