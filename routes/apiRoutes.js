//Initialize express and router
var express = require("express");
var router = express.Router();

//Set up dependencies
var axios = require("axios");
var cheerio = require("cheerio");

//Routes
router.get("/", function(req, res){
    res.send("Congrats! You're connected!")
});

router.get("/scrape", function(req, res){

});

router.get("/saved", function(req, res){

});

router.post("/saved/:id", function(req, res){

})

module.exports = router;