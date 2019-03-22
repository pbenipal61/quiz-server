const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
    type: String
});

module.exports = mongoose.model('Match', matchSchema);