const moment    = require('moment');
const Account   = require('../models/account.js');
const User      = require('../models/user.js');
const ObjectId  = require('mongodb').ObjectId;
const session   = require('express-session');

module.exports = {

  new:function(req, res) {
		return res.render('accounts/accounts-new');
	},

  create:function(req, res) {
		return res.render('accounts/accounts-new');
	},

  edit:function(req, res) {
    console.log(req.params.id);
    Account.findById(req.params.id , function(err, acc) {
      if(err){
          console.log(err);
          return res.render('accounts/accounts-edit', { error: err });
        }
          return res.render('accounts/accounts-edit', { account: acc });
      });
	},

  usersAll: function(req, res) {
    console.log('Account Controller: usersAll');
    Account.findById(req.params.id , function(err, acc) {
      if(err){
          console.log(err);
          return res.json(err);
      }
      User.find({ company_id: acc.id} , function(err, users2) {
        if(err){
            console.log(err);
            return res.json(err);
        }
          var current_user;
          var pos = 'undefined';
          for (let i=0 ; i < users2.length ; i++ ){
            if (users2[i]._id.toString() == session.user_id.toString()){
              current_user = users2[i];
              pos = i;
            }
          }
          if (pos != 'undefined' ){
            console.log('remove object from array');
          }
          return res.render('accounts/accounts-users', { query: req.query, users: users2, account: acc, user: current_user})
        })
      }).sort( { createdAt: -1 } )
	}
}
