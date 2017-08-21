// USAGE
// Automate cross-browser testings and user stories

var yaml              = require("js-yaml");
var fs                = require("fs");
var Nightmare         = require("nightmare");

var nightmare = Nightmare({
  show: true
});

  nightmare
    // Visit Home page
    .goto('http://localhost:8000/').wait(500)
      // Small
      .viewport(480, 800).wait(2000)
        .screenshot("src/assets/img/small.png")
        .scrollTo(200, 0).wait(2000)
        .scrollTo(400, 0).wait(2000)
        .scrollTo(600, 0).wait(2000)
      // Medium
      .viewport(640, 800).wait(2000)
        .screenshot("src/assets/img/medium.png")
        .scrollTo(200, 0).wait(2000)
        .scrollTo(400, 0).wait(2000)
        .scrollTo(600, 0).wait(2000)
      // // Large
      .viewport(1024, 800).wait(2000)
        .screenshot("src/assets/img/large.png")
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