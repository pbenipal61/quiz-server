const mongoose = require('mongoose');

const schema = new mongoose.Schema({

  platform: String,
  description: String,
  id: {
    type: Number,
  },
});
// categorySchema.plugin(random);
module.exports = mongoose.model('OriginPlatform', schema);
