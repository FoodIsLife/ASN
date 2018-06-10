var dsConfig = require('../datasources.json');
var path = require('path');
var passport =  require('passport');

module.exports = function(app) {
    var router = app.loopback.Router();
    var Reviews = app.models.Reviews;
    var Artist = app.models.Artist;

    //endpoints

    //Create review

    //get gig by id

    //get reviews by userId (all reviews of artist)


    //modify review details (only the reviwer can edit it)

    //delete review and delete review in artist db



    app.use(router);
    

};