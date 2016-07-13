/**
 * Created by kshitiz on 5/9/15.
 */

var express = require('express');
var router = express.Router();
var bytesLeft = require('../services/bytesLeft');
var dataDao = require('../dao/dataDao');
var plot = require('plotter').plot;

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports = function (passport) {

  router.get('/', function (req, res, next) {
    plot({
      data:       [ 3, 1, 2, 3, 4 ],
      filename:   'output.pdf',
      style:      'linespoints',
      title:      'Example \'Title\', \\n runs onto multiple lines',
      logscale:   true,
      xlabel:     'time',
      ylabel:     'length of string',
      format:     'pdf'
    });
    bytesLeft(function (data) {
      var bytesLeft = data.bytesLeft;
      console.log("bytesLeft = ", bytesLeft)
      dataDao.addNew({bytesLeft: bytesLeft}, function (err, res) {

      });
      dataDao.getAll(function (err, results) {
        if (err) {
          console.log("Error = ", err)
        } else {
          console.log();
          var dataUsed = [];
          for (var i = 0; i < results.length; i++) {
            dataUsed.push({
              date: results[i].date,
              usage: (results[i] && results[i + 1])?results[i+1].bytesLeft -results[i].bytesLeft:0
            });
          }
          console.log(dataUsed);

          res.render('bytes', {title: 'DashBoard', bytesLeft: bytesLeft, stats: dataUsed});
        }
      });
    })
  });

  return router;
};

