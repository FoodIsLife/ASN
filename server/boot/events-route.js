module.exports = function(app) {
  var router = app.loopback.Router()
  var Events = app.models.Events

  router.get("/myjobs", function(req, res) {
    var ownerId = req.query.id
    console.log(ownerId)
    if (ownerId) {
      const db = Events.getDataSource().connector
      const eventCollection = db.collection(Events.modelName)
      var eventResult = eventCollection.find({ eventOwner: ownerId })
      eventResult.toArray(function(err, data) {
        if (err) {
          return res.json([])
        }
        return res.json(data)
      })
    } else {
      return res.json([])
    }
  })

  app.use(router)
}
