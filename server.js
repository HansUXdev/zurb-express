var express = require("express");
var bodyParser = require("body-parser");
// var methodOverride = require("method-override");
var PORT = process.env.PORT || 3000;
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/server/public"));

// Handbars with partials
// var hbs = require('hbs')
var hbs = require("express-handlebars");
// var hbs = exphbs.create({
//     defaultLayout: 'default',
//     // helpers      : helpers,

//     // Uses multiple partials dirs, templates in "shared/templates/" are shared
//     // with the client-side of the app (see below).
//     partialsDir: __dirname +'src/partials'
// });
// app.engine('handlebars', hbs.engine);
app.engine('hbs', hbs({  
  defaultLayout: __dirname + '/src/layouts/default.html',
  partialsDir: __dirname + '/src/partials',
  layoutsDir: __dirname + '/src/layouts'
}));
app.set("view engine", "handlebars");

// Define your routes
var routes = require("./server/routes/page.js");
app.use("/", routes);
// app.use("/update", routes);
// app.use("/create", routes);

app.listen(PORT, function() {
  console.log("Listening on port:%s", PORT);
});

// https://stackoverflow.com/questions/16385173/node-js-express-handlebars-js-partial-views
// hbs.registerPartials(__dirname + '/src/partials');