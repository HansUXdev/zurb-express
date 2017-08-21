
module.exports = function(app, menu) {
  app.get("/",function(req, res) {
    res.render("index",
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

