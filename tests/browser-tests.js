"use strict";

var Nightmare = require("nightmare");
// var should = require("chai").should();

var nightmare = Nightmare({
  show: true
});

  const breakpoints = [
    "640",
    "1024",
    "1200",
    "1440"
  ];

nightmare
  // Visit Home page
  .goto("https://trilogy-times.herokuapp.com/").wait(500)
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
