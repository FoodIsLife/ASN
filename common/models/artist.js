'use strict';

var config = require('../../server/config.json');
var path = require('path');
var senderAddress = "artistsn123@gmail.com"; //Replace this address with your actual address

module.exports = function(Artist) {
// //send verification email after registration
// Artist.beforeRemote('create', function( ctx, next) {
//   //...
//   console.log('dsad')
//   next();
// });
// Artist.afterRemote('create', function(context, artist, next) {
//     var options = {
//       type: 'email',
//       to: artist.email,
//       from: senderAddress,
//       subject: 'Thanks for registering.',
//       //template: path.resolve(__dirname, '../../server/views/verify.ejs'),
//       redirect: '/verified',
//       artist: artist
//     };

//     artist.verify(options, function(err, response) {
//       if (err) {
//         Artist.deleteById(artist.id);
//         return next(err);
//       }
//       context.res.render('response', {
//         title: 'Signed up successfully',
//         content: 'Please check your email and click on the verification link ' +
//             'before logging in.',
//         redirectTo: '/',
//         redirectToLinkText: 'Log in'
//       });
//     });
//   });

//   // Method to render
//   Artist.afterRemote('prototype.verify', function(context, artist, next) {
//     context.res.render('response', {
//       title: 'A Link to reverify your identity has been sent '+
//         'to your email successfully',
//       content: 'Please check your email and click on the verification link '+
//         'before logging in',
//       redirectTo: '/',
//       redirectToLinkText: 'Log in'
//     });
//   });

//   //send password reset link when requested
//   Artist.on('resetPasswordRequest', function(info) {
//     var url = 'http://' + config.host + ':' + config.port + '/reset-password';
//     var html = 'Click <a href="' + url + '?access_token=' +
//         info.accessToken.id + '">here</a> to reset your password';

//     Artist.app.models.Email.send({
//       to: info.email,
//       from: senderAddress,
//       subject: 'Password reset',
//       html: html
//     }, function(err) {
//       if (err) return console.log('> error sending password reset email');
//       console.log('> sending password reset email to:', info.email);
//     });
//   });

//   //render UI page after password change
//   Artist.afterRemote('changePassword', function(context, artist, next) {
//     context.res.render('response', {
//       title: 'Password changed successfully',
//       content: 'Please login again with new password',
//       redirectTo: '/',
//       redirectToLinkText: 'Log in'
//     });
//   });

//   //render UI page after password reset
//   Artist.afterRemote('setPassword', function(context, artist, next) {
//     context.res.render('response', {
//       title: 'Password reset success',
//       content: 'Your password has been reset successfully',
//       redirectTo: '/',
//       redirectToLinkText: 'Log in'
//     });
//   });

};
