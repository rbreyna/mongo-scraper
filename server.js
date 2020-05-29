var express = require("express");

var PORT = process.env.PORT || 3000;

//Initialize Express
var app = express();
var exphbs = require("express-handlebars");

//Setup Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Middleware to parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Use routes js file
var route1 = require("./routes/apiRoutes");
var route2 = require("./routes/htmlRoutes");

app.use(route1);
app.use(route2);

//Start server
app.listen(PORT, function () {
    console.log("Listening on PORT: " + PORT);
})