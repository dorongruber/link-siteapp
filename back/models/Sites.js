const mongoose = require('mongoose');

const SiteSchema = mongoose.Schema({
  url: {
    type: String,
    require: true
  },
  cat: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('Sites', SiteSchema);
