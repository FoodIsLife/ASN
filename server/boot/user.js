'use strict';

var config = require('../../server/config.json');
var path = require('path');
var senderAddress = "emails@gigifier.com"; //Replace this address with your actual address

module.exports = function (app) {
    const User = app.models.User;
    const Artist = app.models.Artist;

    //send verification email after registration
    Artist.observe('after save', function (ctx, next) {
        
        var userInstance = ctx.instance;
        if (ctx.isNewInstance) {
            var verifyLink= 'https://gigifier.com/server/confirm' +
                            '?uid=' +
                            userInstance.id +
                            '&redirect=/verified';

            var options = {
                type: 'email',
                to: userInstance.email,
                from: senderAddress,
                subject: 'You’re almost there...',
                template: path.resolve(__dirname, '../../server/views/verify.ejs'),
                verifyHref: verifyLink,
                redirect: '/verified',
                user: userInstance,
            };


            //create artist after user creation
            // Artist.create(body, function (err, user) {
                userInstance.verify(options, function (err, response) {
                    if (err) {
                        console.log(err)
                        Artist.deleteById(userInstance.id);
                    }
                    //res.sendStatus(200)
                });
                
                
            // });
        }
        next();
    });

    //send password reset link when requested
    Artist.on('resetPasswordRequest', function(info) {
        var url = 'https://gigifier.com/resetpassword'; //this is the default api endpoint of lb
        var html = 'Click <a href="' + url + '?access_token=' +
            info.accessToken.id + '">here</a> to reset your password';

            Artist.app.models.Email.send({
            to: info.email,
            from: senderAddress,
            subject: 'Password reset',
            html: html
            }, function(err) {
            if (err) return console.log('> error sending password reset email');
            });
    });


    //CODE BELOW NOT BEING FIRED
    // // //Method to render
    // Artist.afterRemote('prototype.verify', function(context, user, next) {
    //         console.log('proptype verify');
    //         context.res.render('response', {
    //         title: 'A Link to reverify your identity has been sent '+
    //             'to your email successfully',
    //         content: 'Please check your email and click on the verification link '+
    //             'before logging in',
    //         redirectTo: '/',
    //         redirectToLinkText: 'Log in'
    //         });
    //     });

    




};
