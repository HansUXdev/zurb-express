
module.exports = function(app, menu) {
  app.get("/",function(req, res) {
    res.render("index",
      {layout: 'main'}
    );
  });

  ///// create routes for layout pages
  menu.layouts.forEach(function(layouts) {
   app.get(layouts.url,function(req, res) {
     res.render(
       layouts.page,
       {layout: layouts.layout}
     );
   });
  });

  ///// create routes for each tempalate
  menu.templates.forEach(function(templates) {
   app.get(templates.url,function(req, res) {
     res.render("pages/"+templates.url);
   });
  });


};

