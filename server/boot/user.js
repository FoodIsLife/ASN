'use strict';

var config = require('../../server/config.json');
var path = require('path');
var senderAddress = "artistsn123@gmail.com"; //Replace this address with your actual address

module.exports = function (app) {
    const User = app.models.User;


    //send verification email after registration
    User.observe('after save', function (ctx, next) {
        console.log('supports isNewInstance?', ctx.isNewInstance !== undefined);
        console.log(ctx.instance, 'usercreated!!!!!--------------', ctx.isNewInstance);
        var userInstance = ctx.instance;

        if (ctx.isNewInstance) {

            var verifyLink= 'http://localhost:3000/confirm' +
                            '?uid=' +
                            userInstance.id +
                            '&redirect=/verified';

            var options = {
                type: 'email',
                to: userInstance.email,
                from: senderAddress,
                subject: 'Thanks for registering.',
                //template: path.resolve(__dirname, '../../server/views/verify.ejs'),
                verifyHref: verifyLink,
                redirect: '/verified',
                user: userInstance,
                text: 'Please verify your email by opening this link in a web browser'
            };

            

            userInstance.verify(options, function (err, response) {
                if (err) {
                    User.deleteById(userInstance.id);
                }
            });
        }
        next();
    });

    //send password reset link when requested
    User.on('resetPasswordRequest', function(info) {
        var url = 'http://' + config.host + ':' + config.port + '/reset-password';
        var html = 'Click <a href="' + url + '?access_token=' +
            info.accessToken.id + '">here</a> to reset your password';

            User.app.models.Email.send({
        to: info.email,
        from: senderAddress,
        subject: 'Password reset',
        html: html
        }, function(err) {
        if (err) return console.log('> error sending password reset email');
        console.log('> sending password reset email to:', info.email);
        });
    });


    //CODE BELOW NOT BEING FIRED
    // //Method to render
        User.afterRemote('prototype.verify', function(context, user, next) {
            console.log('proptype verify');
            context.res.render('response', {
            title: 'A Link to reverify your identity has been sent '+
                'to your email successfully',
            content: 'Please check your email and click on the verification link '+
                'before logging in',
            redirectTo: '/',
            redirectToLinkText: 'Log in'
            });
        });

    


     

      //render UI page after password change
      User.afterRemote('changePassword', function(context, user, next) {
        context.res.render('response', {
          title: 'Password changed successfully',
          content: 'Please login again with new password',
          redirectTo: '/',
          redirectToLinkText: 'Log in'
        });
      });

      //render UI page after password reset
      User.afterRemote('setPassword', function(context, user, next) {
        context.res.render('response', {
          title: 'Password reset success',
          content: 'Your password has been reset successfully',
          redirectTo: '/',
          redirectToLinkText: 'Log in'
        });
      });

};
