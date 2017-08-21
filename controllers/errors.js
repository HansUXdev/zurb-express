
module.exports = function(app) {
	var expressValidator = require('express-validator');
	var flash 					 = require('connect-flash');

		// Connect Flash
	app.use(flash());


  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });



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


	// Set error messages to display on handlebars
	app.use(function (req, res, next) {
	  res.locals.success_msg = req.flash('success_msg');
	  res.locals.error_msg = req.flash('error_msg');
	  res.locals.error = req.flash('error');
	  res.locals.user = req.user || null;
	  next();
	});

};