const mongoose = require('mongoose');

const schema = new mongoose.Schema({

  title: String,
  description: String,
  id: {
    type: Number,
  },
});
// categorySchema.plugin(random);
module.exports = mongoose.model('UserType', schema);
