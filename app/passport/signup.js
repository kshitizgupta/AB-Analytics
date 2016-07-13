var LocalStrategy = require('passport-local').Strategy
    , bCrypt = require('bcrypt-nodejs')
    , logger = require('../../config/logging').logger
    , userDao = require('../dao/userAccountDao')
    ;

module.exports = function (passport) {
  passport.use('signup', new LocalStrategy({
                     passReqToCallback: true
                   },
                   function (req, username, password, done) {

                     var findOrCreateUser = function () {

                       if (!username || !password) {
                         return done(null, false, {message: 'Email and password required.'});
                       }

                       // Grab user fields.
                       var newUser = {
                         username: username,
                         password: createHash(password),
                         firstName: req.body.firstName,
                         secondName: req.body.secondName
                       };

                       logger.debug("newUser = ", newUser);

                       userDao.findByUserName(username, function (err, result) {
                         if (err) {
                           logger.error("Error = ", err)
                         } else if (result) {
                           logger.debug("User already exists");
                           var usr_exist_msg = "This email is already registered with us, Please choose a different email id";
                           return done(null, false, {message: usr_exist_msg})
                         } else {
                           userDao.addUser(newUser, function (err, addedUser) {
                             if (err) {
                               var mongo_err_msg = "Something went wrong, could not add user. Apologies for the inconvenience";
                               return done(err, false, {message: mongo_err_msg});
                             } else {
                               return done(null, addedUser);
                             }
                           });
                         }
                       });
                     };

                     process.nextTick(findOrCreateUser);
                   })
  );

  var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }
};