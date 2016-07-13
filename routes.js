/**
 * Created by kshitiz on 5/5/15.
 */

module.exports = function (app, passport) {

  // Bootstrap controllers
  var index = require('./app/controllers/index')(passport);
  //var signup = require('./app/controllers/user_account/signup')(passport);
  //var login = require('./app/controllers/user_account/login')(passport);
  //var logout = require('./app/controllers/user_account/logout')(passport);
  //var dashboard = require('./app/controllers/dashboard')(passport);
  //var listicle = require('./app/controllers/listicles/listicle')(passport);
  var userAccountMain = require('./app/controllers/user_account/userAccountMain')(passport);
  var dashboard = require('./app/controllers/dashboard')(passport);
  var bytes = require('./app/controllers/bytes')(passport);

  app.use('/bytes', bytes);
  //app.use('/signup', signup);
  //app.use('/login', login);
  //app.use('/logout', logout);
  app.use('/dashboard', dashboard);
  app.use('/user', userAccountMain);
  //app.use('/listicle', listicle);
  app.use('/', index);

};
