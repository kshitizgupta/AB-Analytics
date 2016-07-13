/**
 * This controller handles logging the user out
 * Created by prakhar on 5/6/15.
 */

module.exports = function (router, passport) {
  router.get('/signout', function (req, res, next) {
    req.logout();
    res.redirect('/');
  });

  return router;
};
