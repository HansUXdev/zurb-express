var express 				= require("express");
var app 						= express();
var path 						= require('path');
var cookieParser  	= require('cookie-parser');
var bodyParser 			= require("body-parser");
var methodOverride 	= require("method-override");
var exphbs 					= require("express-handlebars");
var fs      				= require('fs');
var exec    				= require('child_process').exec;
var favicon 				= require('serve-favicon');

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(cookieParser());


var port = process.env.PORT || 8000;

// Serve static content for the app from the "public" directory in the application directory.
app.use('/public', express.static('public'));
app.use(favicon(path.join(__dirname, 'public/assets/img', 'favicon.ico')));



// Set Handlebars.
// Options for handlebars
// Main is the default layout
app.set('views', path.join(__dirname, 'views'));
app.engine("handlebars", exphbs(
	{ defaultLayout: "offcanvas" }
));
app.set("view engine", "handlebars");
// Register Global Vars for static prototyping
	var menu = require("./src/data/menu.js");
	app.locals.menu = menu;
	// app.locals.assets = "public/assets/";
// Import your routes
	// require("./routes/sessions.js")(app, menu);
	require("./controllers/home.js")(app, menu);
	require("./controllers/admin.js")(app);

app.listen(port,function(){
	console.log("App listening on PORT: "+port)
})

