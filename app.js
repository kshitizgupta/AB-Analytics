//Dependencies
var express = require('express')
    , path = require('path')
    , favicon = require('serve-favicon')
    , logger = require('morgan')
    , flash = require('connect-flash')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , compression = require('compression')
    , config = require('./config/appConfig')
    , passport = require('passport')
    , passportLocal = require('passport-local')
    , expressSession = require('express-session')
    ;

//Setting up Passport
require('./app/passport/init')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(compression({
  threshold: 1024,
  filter: function (req, res) {
    return true;
  }
}));
//app.use(favicon(__dirname + '/public/logo.ico'));
app.use(logger('dev'));
//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({
  secret: 'IiQ5ZJhWSnrGutXH6bgBcg5Q73dnC7JkNxTrNF4rbwYVmbTtlRiBEKUvrflPqScYnl16XdyJw46puYs2rlsATQ==',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 7200000}, //2 hours of idle timeout
  rolling: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


//Routes
require('./routes')(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
