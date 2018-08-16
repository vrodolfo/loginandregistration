const moment    = require('moment');
const User      = require('../models/user.js');
const ObjectId  = require('mongodb').ObjectId;
const session   = require('express-session');

module.exports = {

  findUser: function(req, res) {
    console.log(req.params.id);
    console.log('ffffff');

    User.findById(req.params.id , function(err, user2) {
      if(err){
          console.log(err);
          return res.json(err);
        }
          // return res.json(user);
          return res.render('users/users-show', { user: user2})
      }).sort( { createdAt: -1 } )
  },

	list: function(req, res) {
		User.find({}, function(err, users) {
			if(err){
	    		console.log(err);
	    		return res.json(err);
	    	}
	        // return res.json(users);
          return res.render('users/users-list', { users: users})
	    }).sort( { createdAt: -1 } )
	},

	create: function(req, res) {
		  var user = new User(req.body);
	    user.save(function(err){
	        if(err){
	            // console.log(err);
	            return res.render('index', { errs: err});
	        }
          session.user_id = user._id;
          return res.redirect(`/users/${user._id}`);
	    });
	},

	update: function(req, res) {
		const doc = {
          username: req.body.username,
	        updatedAt: Date.now(),
	      };

	      User.update({_id: req.params.id}, doc, function(err, raw) {
	        if(err){
	    		return res.json(err);
	    	}
	    	console.log('going back');
	        return res.json(raw);
	      });

	},

	destroy: function(req, res) {
	    User.remove({_id:req.params.id}, function(err, raw) {
	    	if(err){
	    		return res.json(err);
	    	}
	    	return res.json(raw);
	    });
	}

}
