// Requiring our Todo model
var db = require("../models");



module.exports = function(app) {

  // catch 404 and forward to error handler
  // app.use(function(req, res, next) {
  //   var err = new Error('Not Found');
  //   err.status = 404;
  //   next(err);
  // });



  app.get("/home",function(req, res) {
    res.render("index",{layout: 'main',});
  });


  // GET route for getting all of the posts
  app.get("/api/Messages/", function(req, res) {
    db.Messages.findAll({})
    .then(function(dbMessage) {
      res.json(dbMessage);
    });
  });

  app.post("/api/Messages", function (req, res){
    // console.log(req.body);
    db.Messages.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    })
    .then(function(dbMessage) {
      res.json(dbMessage);
    });
  });

};