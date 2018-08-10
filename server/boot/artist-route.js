var dsConfig = require('../datasources.json');
var path = require('path');
var passport =  require('passport');

module.exports = function(app) {
    var router = app.loopback.Router();
    var Artist = app.models.Artist;
    var Gigs = app.models.UpcomingGigs;
    var Reviews = app.models.Reviews;
    var Gallery = app.models.Gallery;
    var Videos = app.models.Videos;
    var SoundCloud = app.models.SoundCloud;
    

    /*endpoints*/

    //create artist upon registration
    router.post('/artist-update', function(req,res){

        //comment for now
        //var uid = req.accessToken.userId;
        console.log(req.body);
        var body = {
          firstName : req.body.firstName,
          userId : req.body.userId, //req.accessToken.userId,
          lastName : req.body.lastName,
          middleName: req.body.middleName,
          telephoneNumber: req.body.telephoneNumber,
          location: req.body.location
        }
        //upsertwithwhere not working,
        //change to update
        // Artist.create(body, function (err, user) {
        
        //     if(err){
        //         console.log(err.message);
        //         return res.sendStatus(422)
        //     }
        //     res.sendStatus(200)
        // });
        
        
    });

  
    //update profile in edit profile
    //use the built in rest apo


    //get artist details
    //use nested api to get reviews and gigs localhost:3000/api/artists/{artistId}/upcominggigs
    router.get('/userprofile', function(req, res){
        const { userId } = req.query
        Artist.findOne({ where: {userId: userId}}, function (err, artist){
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