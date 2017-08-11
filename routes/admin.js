var db = require("../models");





module.exports = function(app) {
    // db.Messages.findAll({})
    // app.get("/admin/admin", function(req, res) {
    //   db.Messages.findAll({
    //     // find what ever data you want
    //   })
    //   .then(function(dbMessage) {
    //     // res.json(dbMessage);
    //     console.log(dbMessage.name);
    //     // // into the main index, updating the page
    //     // var hbsObject = {
    //     //   messages: dbMessage
    //     // };
    //     res.render("/index", 
    //         {
    //             layout: 'dashboard',
    //             messages: dbMessage
    //         }
    //     );
    //   });
    // });


   app.get("/admin/admin", function(req, res) {
    db.Messages.findAll({})
    .then(function(dbMessage) {
        // res.json(dbMessage);
      // into the main index, updating the page
        res.render("/admin/admin", 
            {
                layout: 'dashboard',
                messages: dbMessage
            }
        );
    });
  });

	// app.get("/admin",function(req, res) {
	//   res.render("admin/admin",
	//   	{
 //            layout: 'dashboard',
 //            Messages: dbMessage
 //        }
	//   );
	// });

};
