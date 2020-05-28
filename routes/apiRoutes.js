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

router.get("/saved", function (req, res) {

});

router.post("/saved/:id", function (req, res) {

})

module.exports = router;