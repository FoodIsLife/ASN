var dsConfig = require('../datasources.json');
var path = require('path');
var passport =  require('passport');

module.exports = function(app) {
    var router = app.loopback.Router();
    var Gigs = app.models.Upcominggigs;
    var Artist = app.models.Artist;

    //endpoints

    //Create gig

    //get all gigs of artist

    //get gig by id

    //get gig where filter is date range

    //get gig where filter is exact date

    //get gig by name


    //modify gig details

    //delete gig and delete gig in artist db



    app.use(router);
    

};