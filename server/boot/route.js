var dsConfig = require('../datasources.json');
var path = require('path');

module.exports = function(app) {
    var router = app.loopback.Router();
    var Artist = app.models.Artist;

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

  //verified
  router.get('/verified', function(req, res) {
    res.render('verified');
  });

    //log a user in
  router.post('/auth/local', function(req, res) {
    console.log(req.body);
    Artist.login({
      username: req.body.username,
      password: req.body.password
    }, 'Artist', function(err, token) {
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

  //log a user out
  router.get('/logout', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    Artist.logout(req.accessToken.id, function(err) {
      if (err) return next(err);
      res.redirect('/');
    });
  });

  //send an email with instructions to reset an existing user's password
  router.post('/request-password-reset', function(req, res, next) {
    Artist.resetPassword({
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