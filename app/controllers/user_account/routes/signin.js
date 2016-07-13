/**
 * Created by kshitiz on 5/4/15.
 */

module.exports = function (router, passport) {
  router.get('/signin', function (req, res, next) {
    res.render('signin', {message: req.flash('error')});
  });

  router.post('/signin', passport.authenticate('login', {
    successRedirect: '/dashboard',
    failureRedirect: '/user/signin',
    failureFlash: true
  }));

  return router;
};
