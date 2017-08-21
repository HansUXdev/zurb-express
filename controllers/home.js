// // Requiring our Todo model
// var db = require("../models");





module.exports = function(app,menu) {

 // Require your backend components if you need them
  // require("./controllers/to-do.js")(app);
  // require("./controllers/contact-panel.js")(app);

  // catch 404 and forward to error handler
  // app.use(function(req, res, next) {
  //   var err = new Error('Not Found');
  //   err.status = 404;
  //   next(err);
  // });

  app.get("/",function(req, res) {
    res.render("Components",
      {layout: 'main'}
    );
  });

  ///// create routes for layout pages
  menu.layouts.forEach(function(element) {
   app.get(element.url,function(req, res) {
     res.render(
       element.page,
       {layout: element.layout}
     );
   });
  });

  ///// create routes for each tempalate
  menu.templates.forEach(function(element) {
   app.get(element.url,function(req, res) {
     res.render("pages/"+element.url);
   });
  });


};

