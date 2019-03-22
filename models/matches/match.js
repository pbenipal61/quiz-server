const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    type: String
});

module.exports = mongoose.model('Match', matchSchema);