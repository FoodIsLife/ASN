'use strict';

var config = require('../../server/config.json');
var path = require('path');
var CONTAINERS_URL = '/api/containers/';

module.exports = function(Artist) {
    Artist.validatesUniquenessOf('userId', {message: 'User is not unique'});
    Artist.validatesUniquenessOf('email', {message: 'email is not unique'});
    console.log('here');

    Artist.upload = function (ctx,options,cb) {
        if(!options) options = {};
        ctx.req.params.container = 'images';
        Artist.app.models.container.upload(ctx.req,ctx.result,options,function (err,fileObj) {
            if(err) {
                cb(err);
            } else {
                console.log(fileObj.files);
                var fileInfo = fileObj.files;
                var profPicInfo = {
                    profPicName: fileInfo.name,
                    profPicType: fileInfo.type,
                    container: fileInfo.container,
                    profPicUrl: CONTAINERS_URL+fileInfo.container+'/download/'+fileInfo.name
                }

                Artist.findById(ctx.req.accessToken.userId, function(err, artist) {
                    if (err) return cb(err);//res.sendStatus(404);
                    console.log("file upload", profPicInfo);
                    artist.updateAttributes(profPicInfo, {validate:false}, function(err, artist) {
                    if (err) return cb(err)//res.sendStatus(404);
                      console.log('> profile picture uploaded successfully');
                      //res.status(200).send({message: "profile picture uploaded!"})
                      cb(null,obj);
                    });
                });

                // Artist.create({
                //     name: fileInfo.name,
                //     type: fileInfo.type,
                //     container: fileInfo.container,
                //     url: CONTAINERS_URL+fileInfo.container+'/download/'+fileInfo.name
                // },function (err,obj) {
                //     if (err !== null) {
                //         cb(err);
                //     } else {
                //         cb(null, obj);
                //     }
                // });


            }
        });
    };

    Artist.remoteMethod(
        'upload',
        {
            description: 'Uploads a file',
            accepts: [
                { arg: 'ctx', type: 'object', http: { source:'context' } },
                { arg: 'options', type: 'object', http:{ source: 'query'} }
            ],
            returns: {
                arg: 'fileObject', type: 'object', root: true
            },
            http: {verb: 'post'}
        }
    );

};
