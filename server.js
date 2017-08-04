var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");

var PORT = 8000;
var app = express();
// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serve static content for the app from the "public" directory in the application directory.
app.use('/public', express.static('public'))


// Override with POST having ?_method=DELETE
// app.use(methodOverride("_method"));

// Register menu.js globally
	var menu = require("./src/data/menu.js");
	app.locals.menu = menu;
	// console.log(app.locals.menu);

// Set Handlebars.
app.engine("handlebars", exphbs(
	// Options for handlebars
	// Main is the default layout
	{ defaultLayout: "offcanvas" }
));
app.set("view engine", "handlebars");


// Require your backend components if you need them
		require("./routes/components/to-do.js")(app);


// Import some basic example data
	// Basic Home page
		require("./routes/home.js")(app);
		

		app.get("/",function(req, res) {
		  res.render("components",{layout: 'main',});
		});

	// // Example of using an alternitive layout
	// app.get("/layout", function(req, res) {
	//   res.render('pages/layout', 
	//   	{layout: 'main',}
	//   );
	// });

	// create routes for layout pages
	menu.layouts.forEach(function(element) {
		app.get(element.url,function(req, res) {
		  res.render(
		  	element.page,
		  	{layout: element.layout}
		  );
		});
	});

	// create routes for each tempalate
	menu.templates.forEach(function(element) {
		app.get(element.url,function(req, res) {
		  res.render("pages/"+element.url);
		});
	});

// app.listen(port);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
