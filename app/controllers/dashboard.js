/**
 * Created by kshitiz on 5/5/15.
 */

var express = require('express');
var router = express.Router();
var auth = require('./user_account/authorization');

module.exports = function (passport) {

  router.get('/', auth.requireLogin, function (req, res, next) {
    res.render('dashboard', {title: 'DashBoard'});
  });

  return router;
};
