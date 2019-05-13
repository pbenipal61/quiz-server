const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

  title: mongoose.Schema.Types.String,

  status: mongoose.Schema.Types.Number,
  usePermission: mongoose.Schema.Types.Number,
  createdAt: mongoose.Schema.Types.Date,


});
// categorySchema.plugin(random);
module.exports = mongoose.model('Category', categorySchema);
