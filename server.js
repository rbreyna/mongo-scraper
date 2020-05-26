var express = require("express");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var PORT = process.env.PORT || 3000;

//Initialize Express
var app = express();

// Middleware to parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/", function(req, res){
    res.send("Congrats! You're connected!")
});

app.get("/scrape", function(req, res){

});

app.get("/saved", function(req, res){

});

app.post("/saved/:id", function(req, res){

})
//Start server
app.listen(PORT, function () {
    console.log("Listening on PORT: " + PORT);
})