"use strict";

var Nightmare = require("nightmare");
// var should = require("chai").should();

var nightmare = Nightmare({
  show: true
});

// STORY: As a developer nerd, I want to be able to take courses on web tech.
nightmare
  // Visit Home page
  .viewport(500, 500)
  .goto("http://localhost:8000/")
  .wait(500)
    // .viewport(500, 500)
    .scrollTo(500, 0).wait(500)
    .screenshot("home.png")
  // Visit Blog page
  // .goto("http://localhost:8000/blog")
  //   .scrollTo(500, 0)
  //   .screenshot("home.png")
  // End test
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
