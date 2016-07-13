/**
 * Created by kshitiz on 5/11/15.
 */

var express = require('express');
var router = express.Router();
var fs = require('fs');

module.exports = function (passport) {
  var normalizedPath = require("path").join(__dirname, "routes");

  //Requiring all the routes
  require("fs").readdirSync(normalizedPath).forEach(function(file) {
    require("./routes/" + file)(router, passport);
  });

  return router;
};
