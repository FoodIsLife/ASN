var dsConfig = require('../datasources.json');
var path = require('path');
var passport =  require('passport');

module.exports = function(app) {
    var router = app.loopback.Router();
    var Artist = app.models.Artist;
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
      console.log(user);
      if(err){
        res.sendStatus(500)
      }
      res.sendStatus(200)
    });
  });

  //confirm
  router.get('/confirm', function(req,res){
    console.log(res, 'RESPONSE ____________');
    console.log(req, 'REQUEST __________');
    
    User.confirm(uid, token, redirect, function(err) {
      console.log(err);
    });
  });


  //verified
  router.get('/verified', function(req, res) {
    console.log("VERIFIED");
  });

  router.get('/home', function(req, res) {
    res.render('index', {user:
      req.user,
      url: req.url,
    });
  });

  app.get('/login', function(req, res, next) {
    res.render('login', {
      user: req.user,
      url: req.url,
    });
  });

    //log a user in
  router.post('/auth/local', function(req, res) {
    User.login({
      username: req.body.username,
      password: req.body.password
    }, 'User', function(err, token) {
      if (err) {
        if(err.details && err.code === 'LOGIN_FAILED_EMAIL_NOT_VERIFIED'){
          // res.render('reponseToTriggerEmail', {
          //   title: 'Helooooo Login failed',
          //   content: err,
          //   redirectToEmail: '/api/Artists/'+ err.details.userId + '/verify',
          //   redirectTo: '/',
          //   redirectToLinkText: 'Click here',
          //   userId: err.details.userId
          // });
          return err;
        } else {
          // res.render('response', {
          //   title: 'Login failed. Wrong username or password',
          //   content: err,
          //   redirectTo: '/',
          //   redirectToLinkText: 'Please login again',
          // });
          return err;
        }
        return;
      }
      // res.render('home', {
      //   username: req.body.username,
      //   accessToken: token.id,
      //   redirectUrl: '/api/Artists/change-password?access_token=' + token.id
      // });
      return token;
    });
  });


  app.get('/auth/account', function(req,res,next){
    console.log("---------------");
    console.log(req.accessToken);
    //return accesstoken to frontend
  });


  //log a user out
  router.get('/logout', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    User.logout(req.accessToken.id, function(err) {
      if (err) return next(err);
      res.redirect('/');
    });
  });

  //send an email with instructions to reset an existing user's password
  router.post('/request-password-reset', function(req, res, next) {
    User.resetPassword({
      email: req.body.email
    }, function(err) {
      if (err) return res.status(401).send(err);
      return res;
      // res.render('response', {
      //   title: 'Password reset requested',
      //   content: 'Check your email for further instructions',
      //   redirectTo: '/',
      //   redirectToLinkText: 'Log in'
      // });
    });
  });

  //show password reset form
  router.get('/reset-password', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    // res.render('password-reset', {
    //   redirectUrl: '/api/Artists/reset-password?access_token='+
    //     req.accessToken.id
    // });
    return res;
  });

  app.use(router);
};