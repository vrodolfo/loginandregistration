const moment    = require('moment');
const Account   = require('../models/account.js');
const ObjectId  = require('mongodb').ObjectId;
const session   = require('express-session');

module.exports = {

  new:function(req, res) {
		return res.render('accounts/accounts-new');
	},

  create:function(req, res) {
		return res.render('accounts/accounts-new');
	}

}
