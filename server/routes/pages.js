var express = require("express");
var path = require("path");
var router = express.Router();
// var burger = require("../models/burger.js");

// get route -> index
router.get("/", function(req, res) {
  // res.render("index");
  res.sendFile(path.join(__dirname, "../../src/pages/index.hbs"));
});

router.get("/menu", function(req, res) {
  // res.render("index");
  res.render('menu', {layout: '/src/layouts/topbar.hbs'});
  // res.sendFile(path.join(__dirname, "../../src/pages/index.hbs"));
});

module.exports = router;
