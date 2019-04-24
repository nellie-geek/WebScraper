var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");

var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

app.get("/scrape", function (req, res) {
    axios.get("https://www.theonion.com/").then(function (response) {

        var $ = cheerio.load(response.data);

        var articles = [];

        $("article").each(function (i, element) {

            var result = {};

            result.title = $(this)
                .find("h1.headline")
                .text().trim();
            result.link = $(this)
                .find("h1.headline")
                .children("a")
                .attr("href")
            result.summary = $(this)
                .find("div.item__content")
                .children("div.entry-summary")
                .children("p")
                .text().trim()
            articles.push(result);

            db.article.create(result)
                .catch(function(err) {
                return console.log(err)
            });
        })

        console.log(articles);
    });

});







// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});