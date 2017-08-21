var express           = require("express");
var app               = express();
var path              = require('path');
var cookieParser      = require('cookie-parser');
var bodyParser        = require("body-parser");
var methodOverride    = require("method-override");
var exphbs            = require("express-handlebars");
var expressValidator  = require('express-validator');
var flash             = require('connect-flash');
var session           = require('express-session');
var passport          = require('passport');
var LocalStrategy     = require('passport-local').Strategy;
var fs                = require('fs');
var exec              = require('child_process').exec;


////// port
var port = process.env.PORT || 8000;




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
  require("./controllers/sessions.js")(app,session,passport,LocalStrategy);
  // require("./controllers/errors.js")(app,flash,expressValidator,session);

// Require your helpers 
  // Connect Flash
    app.use(flash());
  // catch 404 and forward to error handler
    // app.use(function(req, res, next) {
    //   // errors out and say "Not Found"
    //   var err = new Error('Not Found'); 
    //   err.status = 404;
    //   next(err);
    // });

  // // Express Validator
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

  // // Set error messages to display on handlebars
    app.use(function (req, res, next) {
      res.locals.success_msg = req.flash('success_msg');
      res.locals.error_msg = req.flash('error_msg');
      res.locals.error = req.flash('error');
      res.locals.user = req.user || null;
      next();
    });

//////
// Require your databases
////// 
  /// mongo/mongoose
  var mongo = require('mongodb');
  var mongoose = require('mongoose');
  // var User = require('./models/mongoose/users.js');
  // require("./controllers/mongo.js")(mongo,mongoose);
  /// sequelize
    // var sql = require("./models/sequelize");
    // require("./controllers/sql.js")(app,sql,port);


// Set Handlebars.
// Options for handlebars
// Main is the default layout
  app.set('views', path.join(__dirname, 'views'));
  app.engine("handlebars", exphbs(
  	{ defaultLayout: "offcanvas" }
  ));
  app.set("view engine", "handlebars");
  // Register Global Vars
    var menu = require("./src/data/menu.js");
    app.locals.menu = menu;
  // Import your routes
  	require("./controllers/home.js")(app, menu);
  	// require("./controllers/admin/admin.js")(app, passport,LocalStrategy,flash,sql,User);



app.listen(port,function(){
  console.log("App listening on PORT: "+port)
})

