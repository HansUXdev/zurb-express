var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");

var port = 8000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use('/public', express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));


// Set Handlebars.
app.engine("handlebars", exphbs(
	// Options for handlebars
	// Main is the default layout
	{ defaultLayout: "offcanvas" }
));
app.set("view engine", "handlebars");

// Register menu.js globally
	var menu = require("./data/menu.js");
	app.locals.menu = menu;
	// console.log(app.locals.menu);

// Import some basic example data
	// Basic Home page
	app.get("/",function(req, res) {
	  res.render("index",{layout: 'main',});
	});

	// Example of using an alternitive layout
	app.get("/layout", function(req, res) {
	  res.render('pages/layout', 
	  	{layout: 'main',}
	  );
	});

	// create routes for each tempalate
	menu.templates.forEach(function(element) {
		app.get(element.url,function(req, res) {
		  res.render("pages/"+element.url);
		});
	});

app.listen(port);
