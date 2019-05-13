const mongoose = require('mongoose');

const schema = new mongoose.Schema({

  language: String,
  description: String,
  id: {
    type: Number,
  },


});
// categorySchema.plugin(random);
module.exports = mongoose.model('Language', schema);
