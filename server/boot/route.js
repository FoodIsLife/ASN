var dsConfig = require('../datasources.json');
var path = require('path');
var passport =  require('passport');

module.exports = function(app) {
    var router = app.loopback.Router();
    //var User = app.models.User;
    var Artist = app.models.Artist;

  var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

 //register
  router.post('/signup', function(req,res){
    var cred = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      userType: req.body.userType,
      name: req.body.name,
      allowsearch: "yes"
    }

    if(req.body.artistType){
      cred["artistType"] = req.body.artistType
    }

    Artist.create(cred, function (err, user) {
      if(err){
        return res.status(400).send({error: {message:err.message}})
      }
      res.status(200).send({message:"user created"})
    });
  });

  //confirm
  router.get('/confirm', function(req,res){
    var uid = req.query.uid;
    var token = req.query.token;
    var redirect = req.query.redirect;

    Artist.confirm(uid, token, redirect, function(err) {
      if(err){
        res.sendStatus(500)
      }
      res.redirect('https://gigifier.com/login?confirmed=true')
    });
  });

  //verified
  router.get('/verified', function(req, res) {
    res.sendStatus(200)
  });

  
  router.get('/auth/account', function(req,res,next){
  //   //res redirect to login - may code 
    res.redirect(`https://gigifier.com/server/auth/account?artistId=${req.accessToken.userId}&token=${req.accessToken.id}/`)
        
  });
  

  //log a user out
  router.get('/logout', function(req, res, next) {
    if (!req.query.accessToken) return res.sendStatus(401);
    Artist.logout(req.query.accessToken, function(err) {
      if (err) return next(err);
      res.send(200);
    });
  });

  //send an email with instructions to reset an existing user's password
  router.post('/forgot-password', function(req, res, next) {
    console.log('forgot password email',req.body.email);
    Artist.resetPassword({
      email: req.body.email
    }, function(err) {
      if (err) {
        return res.status(401).send(err)
      } else {
        res.status(200).send({message:"check email for password reset instructions"});
      }
    });
  });

   //show password reset form
  //  app.get('/resetpassword', function(req, res, next) {
  //   if (!req.accessToken) return res.sendStatus(401);
  //   res.redirect('http://localhost:3000/resetpassword?access_token='+ req.accessToken.id)
  //   // res.render('password-reset', {
  //   //   redirectUrl: '/api/users/reset-password?access_token='+
  //   //     req.accessToken.id
  //   // });
  // });

  //reset user password
  router.post('/reset-password', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    Artist.findById(req.accessToken.userId, function(err, artist) {
      if (err) return res.sendStatus(404);
      console.log("reset password new:",req.body.newPassword);
      artist.updateAttribute('password', Artist.hashPassword(req.body.newPassword), function(err, artist) {
      if (err) return res.sendStatus(404);
        console.log('> password reset processed successfully');
        res.status(200).send({message: "Password has been successfully changed"})
      });
   });
  });

  router.post('/change-password', function(req,res,next){
    console.log("in change password", req.accessToken);
    Artist.findById(req.accessToken.userId, function(err, artist) {
      if (err) return res.sendStatus(404);
      artist.hasPassword(req.body.oldPassword, function(err, isMatch) {
        if (!isMatch) {
          return res.sendStatus(401);
        } else {
          artist.updateAttribute('password', Artist.hashPassword(req.body.newPassword), function(err, artist) {
            if (err) return res.sendStatus(404);
            res.status(200).send({msg: 'password change request processed successfully'});
          });
        }
      });
    });
  });

  app.use(router);
};