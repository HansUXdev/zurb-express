var db = require("../models");





module.exports = function(app) {

    // app.get("/admin", function(req, res) {
    //   db.Messages.findAll({
    //     // find what ever data you want
    //   })
    //   .then(function(dbMessage) {
    //     // res.json(dbMessage);
    //     console.log(dbMessage);
    //     // // into the main index, updating the page
    //     var hbsObject = {
    //       messages: dbMessage
    //     };
    //     res.render("/index", hbsObject);
    //   });
    // });

		app.get("/admin",function(req, res) {
		  res.render("admin/admin",
		  	{layout: 'dashboard'}
		  );
		});

};
