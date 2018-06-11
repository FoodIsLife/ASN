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
          userId : '5b10131db7b13f5b7b392542',
          lastName : req.body.lastName,
          middleName: req.body.middleName,
          telephoneNumber: req.body.telephoneNumber,
          location: req.body.location
        }
        //upsertwithwhere not working,
        Artist.create(body, function (err, user) {
        
            if(err){
                console.log(err.message);
                return res.sendStatus(422)
            }
            res.sendStatus(200)
        });
        
        
    });

  
    //update profile in edit profile
    //use the built in rest apo


    //get artist details
    router.get('/userprofile', function(req, res){
        
        console.log('getting artist information');
        var artistInfo = [];

        //var userId = req.accessToken.userId;
        //Artist.findOne({where: {userId:userId}});
        Artist.findOne({ where: {userId: "5b10131db7b13f5b7b392542"}}, function (err, artist){
            console.log(artist);    
            if(err){
                console.log(err.message);
                return res.sendStatus(422);
            }
            
            //return res.json(artist);
            artistInfo.push(artist);
        });

        Gigs.find({ where: {userId: "5b10131db7b13f5b7b392542"}}, function (err, gigs){
            console.log(gigs);    
            if(err){
                console.log(err.message);
                return res.sendStatus(422);
            }
            
            //return res.json(artist);
            artistInfo.push(gigs);
        });

        Reviews.find({ where: {userId: "5b10131db7b13f5b7b392542"}}, function (err, reviews){
            console.log(reviews);    
            if(err){
                console.log(err.message);
                return res.sendStatus(422);
            }
            
            //return res.json(artist);
            artistInfo.push(reviews);
        });

        console.log(artistInfo);
        return res.json(artistInfo);

    });

    //delete user profile
 

    app.use(router);

};