// Message us 
// The backend logic for 
// http://foundation.zurb.com/building-blocks/blocks/contact-panel.html
// =============================================================
// Requiring our models
var db = require("../../models");


module.exports = function(app) {

  // GET route for getting all of the posts
  // 1). end users should NOT be able to view messages
  // 2). should only able to view data if you are loged in
  // 3). OPTIONAL integration with oauth needs to be required in here

  app.post("/api/Messages/create", function (req, res){
    // console.log(req.body);
    db.Messages.create({
      name: req.body.name,
      email: req.body.email,
      text: req.body.text
    })
    .then(function(dbMessage) {
      // res.json(dbMessage);
      console.log(dbMessage);
      res.redirect("/");
    });
  });



// Seperate this

// var MessageController = function(app){
  //  app.get("/api/Messages/", function(req, res) {
  //   db.Messages.findAll({
  //     // find what ever data you want
  //   })
  //   .then(function(dbMessage) {
  //     res.json(dbMessage);
  //     // // into the main index, updating the page
  //     var hbsObject = {
  //       messages: dbMessage
  //     };
  //     return res.render("index", hbsObject);
  //   });
  // });
// };
// module.exports = MessageController;


};


