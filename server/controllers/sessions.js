const session = require('express-session');
const User    = require('../models/user.js');
const bcrypt  = require('bcrypt-as-promised');

module.exports = {
  create: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        console.log('Email not found')
        let error = 'Email not found';
        return res.redirect('/?error=' + encodeURIComponent(error));
      }

      bcrypt.compare(req.body.password, user.password)
      .then(() => {
        session.user_id = user._id;
        session.account_id = user.company_id;
        console.log(typeof session);
        return res.redirect(`/users/${user._id}/dashboard`);
      })
      .catch(() => {
        // let error = [{message: 'Invalid Password'}];
        let error = 'Invalid Password';
        console.log(error);
        // return res.redirect('/');
        return res.redirect('/?error=' + encodeURIComponent(error));
      });
    });
  },

  delete: (req, res) => {
    console.log('Logout / Deleting Session')
    if ('user_id' in session) {
      delete session['user_id']
    }
    if ('account_id' in session) {
      delete session['account_id']
    }
    return res.redirect('/');
  }
}
