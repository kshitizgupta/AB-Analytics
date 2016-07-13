/**
 * Created by kshitiz on 5/12/15.
 */
var User = require('../models/users').User;
var logger = require('../../config/logging').logger;

module.exports = userAccountDao = {};

userAccountDao.findByUserName = function (userName, cb) {
  User.findOne({username: userName}, function (err, result) {
    if (err) {
      logger.error("Error in findByUserName, err = ", err);
      cb(err);
    } else {
      cb(null, result);
    }
  });
};

userAccountDao.addUser = function (user, cb) {
  var newUser = new User({
    username: user.username,
    password: user.password,
    firstName: user.firstName,
    secondName: user.secondName
  });

  newUser.save(function (err, result) {
    if(err) {
      logger.error("Error in addUser, err = ", err);
      cb(err);
    } else {
      cb(null, result);
    }
  });
};


