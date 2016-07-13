/**
 * Created by kshitiz on 5/12/15.
 */

exports.requireLogin = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.loggedin = true;
    return next();
  }
  res.redirect('/user/signin');
};


exports.loggedIn = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/user/login');
  }
}