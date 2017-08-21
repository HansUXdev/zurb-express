

module.exports = function(app,session) {
	// Express Session
	app.use(session({
	    secret: 'secret',
	    saveUninitialized: true,
	    resave: true
	}));


}