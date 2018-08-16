// var router = require('express').Router();
//
// router.get('/', function(req, res) {
//   return res.render('index');
// });
//
// router.use('/users', require('./users/users'));
//
// module.exports = router;

const users     = require('../controllers/users');
const sessions  = require('../controllers/sessions');

module.exports = (app) => {

  app.get('/', function(req, res) {
    return res.render('index');
  });

  app.post('/users', function(req, res) {
    console.log('create');
    users.create(req, res);
  });

  app.get('/users', function(req, res) {
    users.list(req, res);
  });

  app.get('/users/new', function(req, res) {
    users.new(req, res);
  });

  app.get('/users/:id', function(req, res) {
    users.findUser(req, res);
  });

  app.post('/sessions', sessions.create);
  app.post('/sessions/delete', sessions.delete);

  app.all('**', (req, res) => { res.redirect('/') });
}
