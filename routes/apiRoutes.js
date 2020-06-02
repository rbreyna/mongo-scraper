//Initialize express and router
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

//Set up dependencies
var axios = require("axios");
var cheerio = require("cheerio");

//Require all models
var db = require("../models/");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/articles", { useNewUrlParser: true });

//Routes
router.get("/api/scrape", function (req, res) {
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

                db.Article.create(result)
                    .then(function(dbArticle){
                        console.log(dbArticle)
                    })
                    .catch(function(err){
                        console.log(err)
                    })
                articles.push(result);
            })

            res.send("Scrape Complete!");
        })
});

router.get("/api/articles", function (req, res) {
    db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

router.get("/api/article/:id", function (req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.find({ _id: req.params.id }).lean()
    // ..and populate all of the notes associated with it
    //.populate("note")
    .then(function(dbArticle) {
      console.log(req.params.id);
      res.json(dbArticle);
    })
    .catch(function(err) {

      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
router.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function(dbNote) {
       var article = db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
       return article;
    })
      .then(function(dbArticle) {
      
        res.json(dbArticle);
      })
      .catch(function(err) {

        res.json(err);
      });
  });

module.exports = router;