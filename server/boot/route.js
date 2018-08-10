var dsConfig = require('../datasources.json');
var path = require('path');
var passport =  require('passport');

module.exports = function(app) {
    var router = app.loopback.Router();
    var User = app.models.User;
    var Artist = app.models.Artist;

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
        return res.status(400).send({error: {message:err.message}})
      }
      res.status(200).send({message:"user created"})
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
      res.redirect('http://localhost:3000/')
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



  router.get('/auth/account', function(req,res,next){
    console.log(req);
    
    // console.log(req);

  //   //res redirect to login - may code 
    res.redirect(`http://localhost:3000/auth/account?userId=${req.accessToken.userId}&token=${req.accessToken.id}/`)
    // res.render('home', {
    //     username: req.body.username,
    //     accessToken: req.accessToken,
    //     redirectUrl: 'logout'
    //   });
        
  });
  

  //log a user out
  router.get('/logout', function(req, res, next) {
    console.log(req)
    if (!req.query.accessToken) return res.sendStatus(401);
    User.logout(req.query.accessToken, function(err) {
      if (err) return next(err);
      console.log('user logged out');
      res.send(200);
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