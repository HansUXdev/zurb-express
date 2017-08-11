var yaml              = require("js-yaml");
var fs                = require("fs");
var Nightmare         = require("nightmare");

// Load settings from settings.yml
// const { PORT } = loadConfig();

// //console.log(PORT);

// function loadConfig() {
//   let ymlFile = fs.readFileSync('config.yml', 'utf8');
//   return yaml.load(ymlFile);
// }


var nightmare = Nightmare({
  show: true
});

  const breakpoints = [
    "640",
    "1024",
    "1200",
    "1440"
  ];


// function homePage (){

  nightmare
    // Visit Home page
    .goto('localhost:3000/').wait(500)
      // Small
      .viewport(622, 800).wait(2000)
        .scrollTo(200, 0).wait(2000)
        .scrollTo(400, 0).wait(2000)
        .scrollTo(600, 0).wait(2000)
      // Medium
      .viewport(640, 800).wait(2000)
        .scrollTo(200, 0).wait(2000)
        .scrollTo(400, 0).wait(2000)
        .scrollTo(600, 0).wait(2000)
      // Large
      .viewport(1024, 800).wait(2000)
        .scrollTo(200, 0).wait(2000)
        .scrollTo(400, 0).wait(2000)
        .scrollTo(600, 0).wait(2000)
      .viewport(1440, 800).wait(2000)
        .scrollTo(200, 0).wait(2000)
        .scrollTo(400, 0).wait(2000)
        .scrollTo(600, 0).wait(2000)

    .wait(5000)
    .end()
    // Execute commands
    .then(function () {
      console.log("Done!")
    })
    // Catch errors
    .catch(function (err) {
       console.log(err)
     })
// }

// homePage();