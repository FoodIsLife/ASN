'use strict';

var config = require('../../server/config.json');
var path = require('path');

module.exports = function(Artist) {
    Artist.validatesUniquenessOf('userId', {message: 'User is not unique'});
    Artist.validatesUniquenessOf('email', {message: 'email is not unique'});
    console.log('here');

    // Artist.observe('after save', function (ctx, next) {
    //     console.log('supports isNewInstance?', ctx.isNewInstance !== undefined);
    //     console.log(ctx.instance, 'Artist Created!!!!!--------------', ctx.isNewInstance);
    //     var userInstance = ctx.instance;

    //     if (ctx.isNewInstance) {

            
    //     } else {
    //         console.log();
    //     }
    //     next();
    // });



};
