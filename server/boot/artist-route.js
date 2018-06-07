var dsConfig = require('../datasources.json');
var path = require('path');
var passport =  require('passport');

module.exports = function(app) {
    var router = app.loopback.Router();
    var Artist = app.models.Artist;

    /*endpoints*/

    //create artist upon registration
    router.post('/artist-update', function(req,res){
        var id = req.accessToken.userId;
        var body = {
          firstName : 'Page',
          userId : id,
          lastName : 'Tangalin',
          middleName: 'Perez',
          telephoneNumber: '123456',
          location: 'UK'


        }
        Artist.create(body, function (err, user) {
          
          if(err){
            console.log(err.message);
          return res.sendStatus(422)
          }
          res.sendStatus(200)
        });
      });


    //update profile in edit profile

    //get artist details
    
    //add gigs 

    //update gigs

    //get gigs

    //add reviews

    //get reviews

    app.use(router);

};