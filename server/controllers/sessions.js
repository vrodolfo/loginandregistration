const session = require('express-session');
const User    = require('../models/user.js');
const bcrypt  = require('bcrypt-as-promised');

module.exports = {
  create: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        console.log('Email not found')
        // return res.redirect('/');
        return res.render('index', { errs2: 'Email not found'});
      }

      bcrypt.compare(req.body.password, user.password)
      .then(() => {
        session.user_id = user._id;
        return res.redirect(`/users/${user._id}/dashboard`);
      })
      .catch(() => {
        let error = [{message: 'Invalid Password'}];
        console.log(error);
        return res.redirect('/');
      });
    });
  },

  delete: (req, res) => {
    console.log('Logout / Deleting Session')
    if ('user_id' in session) {
      delete session['user_id']
    }
    return res.redirect('/');
  }
}
