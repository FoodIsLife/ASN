'use strict';

var config = require('../../server/config.json');
var path = require('path');
var CONTAINERS_URL = '/api/containers/';

module.exports = function(Artist) {
    Artist.validatesUniquenessOf('userId', {message: 'User is not unique'});
    Artist.validatesUniquenessOf('email', {message: 'email is not unique'});
    console.log('here');

    Artist.upload = function (req,res,cb) {
        //if(!options) options = {};
        //ctx.req.params.container = 'images';
        Artist.app.models.container.upload(req,res,{container: "images"},function (err,fileObj) {
            
            if(err) {
                cb(err);
            } else {
                //console.log("image uploaded", fileObj.files);
                var fileInfo = fileObj.files;
                console.log("file details", fileInfo);
                var profPicInfo = {
                    profPicName: fileInfo.file[0].name,
                    profPicType: fileInfo.file[0].type,
                    container: fileInfo.file[0].container,
                    profPicUrl: CONTAINERS_URL+fileInfo.file[0].container+'/download/'+fileInfo.file[0].name
                }
                console.log("update user for prof pic", req.accessToken);
                console.log("profpic info", profPicInfo);
                Artist.findById(req.accessToken.userId, function(err, artist) {
                    
                    if (err) return cb(err);//res.sendStatus(404);
                    console.log("file upload", profPicInfo);
                    artist.updateAttributes(profPicInfo, {validate:false}, function(err, artist) {
                    if (err) return cb(err)//res.sendStatus(404);
                      console.log('> profile picture uploaded successfully');
                      res.status(200).send({message: "profile picture uploaded!"})
                      //cb(null,obj);
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
