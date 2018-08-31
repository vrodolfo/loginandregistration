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
const session   = require('express-session');

function isAuthenticated(req, res, next) {
  if (session.user_id && session.account_id){
    return next();
  }
  res.redirect('/');
}

module.exports = (app) => {

  app.get('/',  function(req, res) {
    return res.render('index', {query: req.query});
  });

  app.post('/users', isAuthenticated, function(req, res) {
    users.create(req, res);
  });

  app.post('/users/account', isAuthenticated, function(req, res) {
    users.createUsertoAccount(req, res);
  });

  app.get('/users', isAuthenticated, function(req, res) {
    users.list(req, res);
  });

  app.get('/users/new', isAuthenticated, function(req, res) {
    users.new(req, res);
  });

  app.get('/users/:id', isAuthenticated, function(req, res) {
    users.findUser(req, res);
  });

  app.get('/users/:id/delete', isAuthenticated, function(req, res) {
    users.destroy(req, res);
  });

  app.post('/users/update', isAuthenticated, function(req, res) {
    users.usersUpdate(req, res);
  });

  app.get('/users/:id/dashboard', isAuthenticated, function(req, res) {
    users.dashboard(req, res);
  });

  app.get('/accounts/:id/edit', isAuthenticated, function(req, res) {
    accounts.edit(req, res);
  });

  app.get('/accounts/:id/users/new', isAuthenticated, function(req, res) {
    accounts.usersAll(req, res);
  });

  app.get('/accounts/new', accounts.new);

  app.post('/accounts', function(req, res) {
    console.log('create account');
    accounts.create(req, res);
  });

  app.get('/accounts/users/:id/edit', isAuthenticated, function(req, res) {
    accounts.usersEdit(req, res);
  });

  app.post('/sessions', sessions.create);
  app.get('/sessions/delete', sessions.delete);

  app.all('**', (req, res) => { res.redirect('/') });
}
