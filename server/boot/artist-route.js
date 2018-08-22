var dsConfig = require('../datasources.json');
var path = require('path');
var passport =  require('passport');

module.exports = function(app) {
    var router = app.loopback.Router();
    var Artist = app.models.Artist;
    var Container = app.models.Container;
    


    // //get artist details
    // //use nested api to get reviews and gigs localhost:9999/api/artists/{artistId}/upcominggigs
    router.get('/userprofile', function(req, res){
        console.log("user profile", req.query.uid);
        const { artistId } = req.query.uid
        Artist.findOne({include: ['upcomingGigs', 'reviews', 'artistVideos']}, { where: {id: artistId}}, function (err, artist){
            console.log(artist)
            if(err){
                return res.status(422).send({error:{message:err.message}});
            }

            return res.json(artist);
        });
    });

    //delete user profile
 

    app.use(router);

};