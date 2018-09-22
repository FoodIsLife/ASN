var dsConfig = require('../datasources.json');
var path = require('path');
var passport =  require('passport');

module.exports = function(app) {
    var router = app.loopback.Router();
    var ArtistVideos = app.models.ArtistVideos;
    

    // router.post('/artistVideos', function(req, res){

        
        


    // })

    //delete user profile
 

    app.use(router);

};