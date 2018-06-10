var dsConfig = require('../datasources.json');
var path = require('path');
var passport =  require('passport');

module.exports = function(app) {
    var router = app.loopback.Router();
    var Artist = app.models.Artist;

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
        //var userId = req.accessToken.userId;
        //Artist.findOne({where: {userId:userId}});
        Artist.findOne({ where: {userId: "5b10131db7b13f5b7b392542"}}, function (err, artist){
            console.log(artist);    
            if(err){
                console.log(err.message);
                return res.sendStatus(422);
            }
            //res.sendStatus(200);
            return res.json(artist);
        });

    });

    

    //delete user profile
 

    app.use(router);

};