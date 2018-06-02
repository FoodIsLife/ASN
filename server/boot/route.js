var dsConfig = require('../datasources.json');
var path = require('path');
var passport =  require('passport');

module.exports = function(app) {
    var router = app.loopback.Router();
    var User = app.models.User;

  var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

 //register
  router.post('/signup', function(req,res){
    var cred = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    User.create(cred, function (err, user) {
      
      if(err){
        console.log(err.message);
      return res.sendStatus(422)
      }
      res.sendStatus(200)
    });
  });

  //confirm
  router.get('/confirm', function(req,res){
    console.log('confirming user');
    var uid = req.query.uid;
    var token = req.query.token;
    var redirect = req.query.redirect;

    User.confirm(uid, token, redirect, function(err) {
      console.log(token)
      console.log('inside user.confirm');
      if(err){
        console.log(err);
        res.sendStatus(500)
      }
      res.sendStatus(200)
    });
  });

  //verified
  router.get('/verified', function(req, res) {
    if(err){
      res.sendStatus(500)
    }
    res.sendStatus(200)
  });

  //Created test views for testing
  router.get('/home', function(req, res) {
    res.render('index', {user:
      req.user,
      url: req.url,
    });
  });

//Created test views for testing
  router.get('/login', function(req, res, next) {
    res.render('login', {
      user: req.user,
      url: req.url,
    });
  });

//Created test views for testing
  router.get('/emaillogin', function(req,res){
    res.render('local', {
        user: req.user,
        url: req.url
    })
  });


    //log a user in
  router.post('/auth/emaillogin', function(req, res) {
    User.login({
      username: req.body.username,
      password: req.body.password
    }, 'user', function(err, token) {
      if (err) {
        if(err.details && err.code === 'LOGIN_FAILED_EMAIL_NOT_VERIFIED'){
          console.log(err);
          res.sendStatus(401);
        } else {
          console.log(err);
          res.sendStatus(400);
        }
        return;
      }
      console.log(token.id, "token id");
      res.cookie('access_token', token.id, { signed: true , maxAge: 300000 });
      res.render('home', {
        username: req.body.username,
        accessToken: token.id,
        redirectUrl: '/logout'
      });
      //res.sendStatus(200);
      //return token;
    });
  });

//Created test views for testing
  router.get('/auth/account', function(req,res,next){
    console.log("------USER auth/account---------");
    console.log(req.accessToken);
  
    res.render('home', {
        username: req.body.username,
        accessToken: req.accessToken,
        redirectUrl: 'logout'
      });
        
  });
  
  //log a user out
  router.get('/logout', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    User.logout(req.accessToken.id, function(err) {
      if (err) return next(err);
      console.log('user logged out');
      res.redirect('/');
    });
  });

  //send an email with instructions to reset an existing user's password
  router.post('/request-password-reset', function(req, res, next) {
    User.resetPassword({
      email: req.body.email
    }, function(err) {
      if (err) {
        return res.status(401).send(err)
      } else {
        console.log('check email for password reset');
        res.sendStatus(200);
      }
    });
  });

  //show password reset form
  //Created test views for testing
  router.get('/reset-password', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    //for testing: create page 
     res.render('password-reset', {
       redirectUrl: '/api/users/reset-password?access_token='+ req.accessToken.id
     });
    //return res;
  });

  app.use(router);
};