var express = require("express");
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var fs      = require('fs')
var exec    = require('child_process').exec;


var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/loginapp', {
  useMongoClient: true,
  /* other options */
}); 
var datab = mongoose.connection;


var PORT = 8000;

var port = process.env.PORT || PORT;

var app = express();
// Requiring our models for syncing
var db = require("./models");


// Override with POST having ?_method=DELETE
// app.use(methodOverride("_method"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(cookieParser());


// Serve static content for the app from the "public" directory in the application directory.
app.use('/public', express.static('public'))

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

// Connect Flash
app.use(flash());



// Register Global Vars
	////
	// menu.js and data.js are purely intended for rapid prototyping...
	////
	var menu = require("./src/data/menu.js");
	app.locals.menu = menu;

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



// Import your routes
	require("./routes/home.js")(app, menu);
	require("./routes/admin.js")(app,passport,LocalStrategy,flash);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  // run gulp with the server
  // NOTE if you use nodemon without a nodemon.json 
  //      ignoring the public folder then it will loop...
  // 
  exec(`gulp`, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
  }); 
});
