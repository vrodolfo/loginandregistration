const mongoose  = require('mongoose');

var AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company Name is required']
  }
}, {timestamps: true });

// Custom Methods
// AccountSchema.methods = {
//
// }

// Before Save
// AccountSchema.pre('save', function(next) {
//   // let acct = this;
// });

module.exports = mongoose.model('Account', AccountSchema);
