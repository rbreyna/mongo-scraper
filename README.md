# mongo-scraper

Long gone are the days of making sidenotes on a boring black and white newspaper. Say hello to my Mongo-Scraper! With my app, you're able to scrape the front page of the New York Times, save articles that interest you, and make personal notes about them.

## How does this exactly happen?

Well... as soon as the user opens this app, the backend is scraping the front page of the NYT website using *Cheerio* and saves the artciles in a locally defined array. With the help of *Express-Handlebars* and *Bootstrap*, the articles are rendered to the screen so that the user can have the opportunity to save the one's that interest them. 

Each article has a link to the NYT, in case they want to read the article themselves, and a butotn to save the article. Upon clicking *Save Article*, a route is hit to save the article in a Mongo DB with help of Mongoose. The user can view their saved articles by clicking the *Saved Articles* link at the top of the Nav Bar. 

On the **Saved Articles** page, the user will see all of their saved articles rendered (again) with *Express-Handlebars*. 

Each article has three buttons:
* Add a Note (to that specific article)
* View Notes (all of the saved notes connected to that article)
* Delete the Article (from their saved collection and from the database)