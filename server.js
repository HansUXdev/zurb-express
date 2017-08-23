var express 					= require("express");
var app 							= express();
var path 							= require('path');
var cookieParser  		= require('cookie-parser');
var bodyParser 				= require("body-parser");
var methodOverride 		= require("method-override");
var exphbs 						= require("express-handlebars");
var expressValidator 	= require('express-validator');
var flash 						= require('connect-flash');
var session 					= require('express-session');
var passport 					= require('passport');
var LocalStrategy 		= require('passport-local').Strategy;
var fs      					= require('fs');
var exec    					= require('child_process').exec;
var favicon 					= require('serve-favicon');

// Set this = true when you want to deploy
var prod = false;

var mongo = require('mongodb');
var mongoose = require('mongoose');
var User = require('./models/mongoose/users');

// mongodb://localhost/loginapp
// mongodb://heroku_gc22dx2t:mn01m6umsupkaili2d6lg2dkp@ds161860.mlab.com:61860/heroku_gc22dx2t
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_gc22dx2t:mn01m6umsupkaili2d6lg2dkp@ds161860.mlab.com:61860/heroku_gc22dx2t', {
  useMongoClient: true,
  /* other options */
}); 
var datab = mongoose.connection;

// Connect Flash
app.use(flash());

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
	// Express Session
	app.use(session({
	    secret: 'secret',
	    saveUninitialized: true,
	    resave: true
	}));
	app.use(passport.initialize());
	app.use(passport.session());

	// Express Validator
	app.use(expressValidator({
	  errorFormatter: function(param, msg, value) {
	      var namespace = param.split('.'), 
	      root    = namespace.shift(), 
	      formParam = root;

	    while(namespace.length) {
	      formParam += '[' + namespace.shift() + ']';
	    }
	    return {
	      param : formParam,
	      msg   : msg,
	      value : value
	    };
	  }
	}));
	app.use(function (req, res, next) {
	  res.locals.success_msg = req.flash('success_msg');
	  res.locals.error_msg = req.flash('error_msg');
	  res.locals.error = req.flash('error');
	  res.locals.user = req.user || null;
	  next();
	});


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
	require("./controllers/admin.js")(app, menu,passport,LocalStrategy,flash,User);

if (prod) {
	exec('gulp build', function (err, stdout, stderr) {
	  console.log(stdout);
	  console.log(stderr);
	});
};


app.listen(port,function(){
	console.log("App listening on PORT: "+port)
})

