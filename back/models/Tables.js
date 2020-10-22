const mongoose = require('mongoose');

const TableSchema = mongoose.Schema({
 userId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Users'
 },
  categorys:
  [
    {
    catid: {type: String},
    sites:
      [{
        siteid: {type: String},
        url: {type: String}
      }]
    }
  ]
});

module.exports = mongoose.model('Tables',TableSchema);
