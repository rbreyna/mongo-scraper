module.exports = function(app){

app.get("/", function(req, res){
  res.render("index", {});
  
    db.Article.find({})
    .then(function(dbArticles) {
      // If we were able to successfully find Articles, send them back to the client
      res.render("index", dbArticles);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
})}