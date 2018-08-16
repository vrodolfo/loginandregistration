const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt-as-promised');

var UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'First Name is required']
        },
    last_name: {
          type: String,
          required: [true, 'Last Name is required']
        },
    email: {
          type: String,
          required: [true, 'Email is required'],
          unique: [true, 'Email is already taken']
        },
    password: {
          type: String,
          required: [true, 'Password is required']
        }
}, {timestamps: true });

// Custom Methods
UserSchema.methods = {
  encryptPassword: function(next) {
    let user = this;

    bcrypt.hash(user.password, 10)
    .then( (hashed_password) => {
      user.password = hashed_password;
      next();
    });

  },

  authenticate: function(password) {
    var user = this;
  }
}

// Before Save
UserSchema.pre('save', function(next) {
  let user = this;
  user.encryptPassword(next);
});

module.exports = mongoose.model('User', UserSchema);
