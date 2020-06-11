var router = require("express").Router();

//Set up dependencies
var axios = require("axios");
var cheerio = require("cheerio");
//Require all models

var db = require("../models/");

router.get("/", function (req, res) {
  console.log("Route hit.");

  axios.get("https://www.nytimes.com/")
  .then(function (response) {

      var $ = cheerio.load(response.data);
      var articles = [];

      $("div.css-6p6lnl").each(function(i, element){
         
          var result = {};

          result.link = $(element).children("a").attr("href");

          let title = $(element).children().children().children("h2").text();
          if(!title){
              let name = $(element).children().children().children().children("span").text();
              result.title = name;
          } else {
              result.title = title;
          }
          
          articles.push(result);
      })
      res.render("index", {Articles: articles});
  })

})

router.get("/saved", function (req, res) {
  console.log("Saved route hit.");

  db.Article.find({}).lean()
    .then(function (dbArticles) {
      // If we were able to successfully find Articles, send them back to the client
      res.render("saved", { Articles: dbArticles });
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
})

module.exports = router;