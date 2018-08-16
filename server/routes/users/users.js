var router = require('express').Router();
var users  = require('../../controllers/users.js');


router.post('/test', function(req, res) {
  console.log('tetstststst');
  // users.create(req, res);
});


router.get('/users', function(req, res) {
  users.list(req, res);
});

router.get('/users/new', function(req, res) {
  users.new(req, res);
});

router.get('/users/:id', function(req, res) {
  users.findUser(req, res);
});

module.exports = router;
