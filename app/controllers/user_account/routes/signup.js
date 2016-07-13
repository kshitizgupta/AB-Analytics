/**
 * Created by kshitiz on 5/4/15.
 */

module.exports = function (router, passport) {

  // middleware specific to this router
  //router.use(function timeLog(req, res, next) {
  //  console.log('Time: ', Date.now());
  //  next();
  //});

  router.get('/signup', function (req, res, next) {
    res.render('signup', {title: 'Signup', error: req.flash('error')});
  });

  router.post('/signup', passport.authenticate('signup', {
                    successRedirect: '/user/signin',
                    failureRedirect: '/user/signup',
                    failureFlash: true,
                    successFlash: 'Welcome!'
                  }
              )
  );

  return router;
};


