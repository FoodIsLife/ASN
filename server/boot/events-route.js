var dsConfig = require('../datasources.json');
var path = require('path');
var passport =  require('passport');

module.exports = function(app) {
    var router = app.loopback.Router();
    var Events = app.models.Events;

    //endpoints

    //Create events

    //get all events

    //get event by id

    //get event where filter is date range

    //get event where filter is exact date

    //get event by name


    //modify event details


    
    app.use(router);

};