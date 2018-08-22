var dsConfig = require('../datasources.json');
var path = require('path');
var passport =  require('passport');

module.exports = function(app) {
    var router = app.loopback.Router();
    var ArtistVideos = app.models.ArtistVideos;
    

    // router.post('/artistVideos', function(req, res){

    //     console.log("in create/update artist video", req.accessToken);
        
        


    // })

    //delete user profile
 

    app.use(router);

};