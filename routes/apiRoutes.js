var express = require("express");
var router = express.Router();

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