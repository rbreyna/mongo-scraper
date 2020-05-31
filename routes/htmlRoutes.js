var router = require("express").Router();
//Require all models
var db = require("../models/");

router.get("/", function(req, res){
    console.log("Route hit.");
    
    db.Article.find({}).lean()
    .then(function(dbArticles) {
      // If we were able to successfully find Articles, send them back to the client
      res.render("index", {dbArticles: dbArticles});
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
})

module.exports = router;