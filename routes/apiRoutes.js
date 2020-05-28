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
mongoose.connect("mongodb://localhost/", { useNewUrlParser: true });

//Routes
router.get("/", function (req, res) {
    res.send("Congrats! You're connected!")
});

router.get("/scrape", function (req, res) {
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

router.get("/articles", function (req, res) {
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

router.get("/article/:id", function (req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Article.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate("note")
    .then(function(dbArticle) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

module.exports = router;