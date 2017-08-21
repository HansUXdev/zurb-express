

module.exports = function(app) {
  app
  // Registration
    .get('/register', function(req, res){
        res.render('register');
    })
    .post('/register', function(req, res){
      res.redirect('/login');
    })
  // Login
    .get('/login', function(req, res){
      res.render('login');
    })
    .post('/login', function(req, res){
      res.redirect('/admin');
    })
  // Admin Page
    .get('/admin/admin', function(req, res){
      res.render('admin');
    })
  // Log out
    .get('/logout', function(req, res){
        res.redirect('/');
    })
};
