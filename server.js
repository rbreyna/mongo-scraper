var express = require("express");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

//Initialize Express
var app = express();
var routes = require("./routes/apiRoutes");

// Middleware to parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Use routes js file
app.use("/", routes);

//Start server
app.listen(PORT, function () {
    console.log("Listening on PORT: " + PORT);
})