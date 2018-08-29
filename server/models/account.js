const mongoose  = require('mongoose');

var AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
        },
    description: {
          type: String,
          required: [true, 'Description is required']
        },
    email: {
          type: String,
          required: [true, 'Email is required'],
          unique: [true, 'Email is already taken']
        }
}, {timestamps: true });

// Custom Methods
AccountSchema.methods = {

}

// Before Save
AccountSchema.pre('save', function(next) {
  // let acct = this;
});

module.exports = mongoose.model('Account', AccountSchema);
