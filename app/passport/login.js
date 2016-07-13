var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var userDao = require('../dao/userAccountDao');


module.exports = function (passport) {

  passport.use('login', new LocalStrategy({
                     passReqToCallback: true
                   },
                   function (req, username, password, done) {
                     userDao.findByUserName(username, function (err, user) {

                       if (err) {
                         return done(err);
                       }

                       if (!user) {
                         return done(null, null, {message: "Invalid username or password"});
                       }

                       if (!isValidPassword(user, password)) {
                         return done(null, null, {message: "Invalid password"});
                       }

                       req.session.success = 'You are successfully logged in ' + username + '!';
                       return done(null, user, {message: "kshitiz is logged in"});
                     });
                   })
  );

  var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
  }
};