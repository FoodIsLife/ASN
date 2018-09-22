'use strict';

var CONTAINERS_URL = '/api/containers/';

module.exports = function(Artistgallery) {
    Artistgallery.upload = function (req,res,cb) {
        
        //if(!options) options = {};
        //ctx.req.params.container = 'images';
        Artistgallery.app.models.container.upload(req,res,{container: "images"},function (err,fileObj) {
            
            if(err) {
                //cb(err);
                res.sendStatus(401);
            } else {
                
                var fileInfo = fileObj.files;
                var imageCollection = [];
                Object.keys(fileInfo).map(function(keyName, keyIndex) {
                    imageCollection.push(CONTAINERS_URL+fileInfo[keyName][0].container+'/download/'+fileInfo[keyName][0].name)
                })

                var galleryInfo = {
                    artistId: req.accessToken.userId,
                    pictureURL: imageCollection
                }
                Artistgallery.findOne({where: {artistId:req.accessToken.userId}}, function(err, artistgallery) {
                    if (artistgallery == null) {
                        Artistgallery.create(galleryInfo,function(err,artistgallery){
                            if(err){
                                res.sendStatus(401);
                            } else {
                                res.status(200).send({message: "artist gallery uyploaded!"})
                            }
                        });
                    } else {
                        artistgallery.updateAttributes(galleryInfo, {validate:false}, function(err, artistgallery) {
                            if (err) return res.sendStatus(404);
                              res.status(200).send({message: " artist gallery uploaded!"})
                              
                            });
                    }
                   
                });
            }
        });
    };

    Artistgallery.remoteMethod(
        'upload',
        {
            description: 'Uploads a file',
            accepts: [
                //{ arg: 'ctx', type: 'object', http: { source:'context' } },
                //{ arg: 'options', type: 'object', http:{ source: 'query'} }
                {arg: 'req', type: '[object]', 'http': {source: 'req'}},
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
