
module.exports = function(app,session,passport,LocalStrategy) {
  app
    // Express Session
    .use(session({
        secret: 'secret',
        saveUninitialized: true,
        resave: true
    }))
    .use(passport.initialize())
    .use(passport.session());
}

