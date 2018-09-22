'use strict';

var config = require('../../server/config.json');
var path = require('path');
var CONTAINERS_URL = '/api/containers/';

module.exports = function(Artist) {
    Artist.validatesUniquenessOf('userId', {message: 'User is not unique'});
    Artist.validatesUniquenessOf('email', {message: 'email is not unique'});

    Artist.upload = function (req,res,cb) {
        //if(!options) options = {};
        //ctx.req.params.container = 'images';
        Artist.app.models.container.upload(req,res,{container: "images"},function (err,fileObj) {
            
            if(err) {
                res.sendStatus(401);
            } else {
                var fileInfo = fileObj.files;
                var profPicInfo = {
                    profPicName: fileInfo.file[0].name,
                    profPicType: fileInfo.file[0].type,
                    container: fileInfo.file[0].container,
                    profPicUrl: CONTAINERS_URL+fileInfo.file[0].container+'/download/'+fileInfo.file[0].name
                }
                Artist.findById(req.accessToken.userId, function(err, artist) {
                    var profPicUrl = CONTAINERS_URL+fileInfo.file[0].container+'/download/'+fileInfo.file[0].name;
                    if (err) return res.sendStatus(404);
                    artist.updateAttributes(profPicInfo, {validate:false}, function(err, artist) {
                    if (err) return res.sendStatus(404);
                      res.status(200).send({message: "profile picture uploaded!", url: profPicUrl})
                    });
                });
            }
        });
    };

    Artist.remoteMethod(
        'upload',
        {
            description: 'Uploads a file',
            accepts: [
                //{ arg: 'ctx', type: 'object', http: { source:'context' } },
                //{ arg: 'options', type: 'object', http:{ source: 'query'} }
                {arg: 'req', type: 'object', 'http': {source: 'req'}},
                {arg: 'res', type: 'object', 'http': {source: 'res'}},
                {arg: 'token', type: 'string'},
            ],
            returns: {
                arg: 'fileObject', type: 'object', root: true
            },
            http: {path: '/upload' ,verb: 'post'}
        }
    );

};
