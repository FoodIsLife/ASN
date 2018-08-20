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
    var Events = app.models.Events;

        
    router.post('/search-artists', function(req,res){
        console.log('search triggered', req.body.searchterm);
        var searchText = req.body.searchterm;
        const db = Artist.getDataSource().connector;
        const artistCollection = db.collection(Artist.modelName);

        var artistResult = artistCollection.find({ $text: { $search: searchText } });

        //var searchRes = [...artistResult,...eventResult,...gigResult];
        
        //return res.json(searchRes);
             
        artistResult.toArray(function(err, art){
            console.log(art);
            
            if (err){
                console.log(err);
                return res.json([])
            }
            return res.json(art);
        });
    });


    router.post('/search-events', function(req,res){
        console.log('search triggered', req.body.searchterm);
        var searchText = req.body.searchterm;
        const db = Artist.getDataSource().connector;
        const eventCollection = db.collection(Events.modelName);

        var eventResult = eventCollection.find({ $text: {$search: searchText}});
           
        eventResult.toArray(function(err, art){
            console.log(art);
            
            if (err){
                console.log(err);
                return res.json([])
            }
            return res.json(art);
        });
    });

app.use(router);
};