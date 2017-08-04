// Requiring our Todo model
var db = require("../models");





module.exports = function(app) {

  // Require your backend components if you need them
  require("./controllers/to-do.js")(app);
 // Require your backend components if you need them
  require("./controllers/contact-panel.js")(app);

  // catch 404 and forward to error handler
  // app.use(function(req, res, next) {
  //   var err = new Error('Not Found');
  //   err.status = 404;
  //   next(err);
  // });

  app.get("/home",function(req, res) {
    res.render("index",{layout: 'main',});
  });


};

