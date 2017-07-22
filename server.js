var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");

var port = 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
// app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));


// Set Handlebars.
app.engine("handlebars", exphbs(
	// Options for handlebars
	{ defaultLayout: "main" }
));
app.set("view engine", "handlebars");



// Import routes and give the server access to them.
	// var routes = require("./controllers/catsController.js");
	// app.use("/", routes);

	// Basic Home page
	app.get("/", function(req, res) {
	  res.render("index");
	});

	// Example of using an alternitive layout
	app.get("/test", function(req, res) {
	  res.render('pages/test', {layout: false});
	});

	// Example of data being used with handlebars
	/*
	app.get("/dog", function(req, res) {
	  // Handlebars requires an object to be sent to the dog handlebars file.
	  // Lucky for us, animals[0] is an object!

	  // 1. send the dog object from the animals array to the dog handlebars file.
	  res.render("dog", animals[0]);
	});
	*/

app.listen(port);
