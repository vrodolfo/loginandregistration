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
const accounts  = require('../controllers/accounts');

module.exports = (app) => {

  app.get('/', function(req, res) {
    return res.render('index');
  });

  app.post('/users', function(req, res) {
    console.log('create');
    users.create(req, res);
  });

  app.post('/users/account', function(req, res) {
    console.log('create user to acc');
    users.createUsertoAccount(req, res);
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

  app.get('/users/:id/delete', function(req, res) {
    users.destroy(req, res);
  });

  app.get('/accounts/:id/edit', function(req, res) {
    accounts.edit(req, res);
  });

  app.post('/users/update', function(req, res) {
    users.usersUpdate(req, res);
  });

  app.get('/accounts/:id/users/new', function(req, res) {
    accounts.usersAll(req, res);
  });

  app.get('/accounts/users/:id/edit', function(req, res) {
    accounts.usersEdit(req, res);
  });

  app.get('/users/:id/dashboard', function(req, res) {
    users.dashboard(req, res);
  });

  app.post('/sessions', sessions.create);
  app.get('/sessions/delete', sessions.delete);

  app.get('/accounts/new', accounts.new);

  app.post('/accounts', function(req, res) {
    console.log('create account');
    accounts.create(req, res);
  });

  app.all('**', (req, res) => { res.redirect('/') });
}
