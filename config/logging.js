/**
 * A simple logging module made to take count of environment when logging.
 * Created by prakhar on 1/3/15.
 */

var logger = require('winston');
var env = require('./environment').environment || 'development',
    config = require('./config')[env];
var mkdirp = require('mkdirp');

console.log(config.logPath);
mkdirp(config.logPath, function (err) {
  if (!err) {
    if (env != 'test') {
      console.log("success in creating log folder, path = " + config.logPath);
    }
    logger.info(__filename + " --> " + "First log after creating log folder");
  } else {
    console.log("Error in creating log folder = " + err)
  }
});

var dailyRotateConfig = {
  filename: config.logPath + '/vivilio.log',
  dirname: config.logPath,
  timestamp: true,
  colorize: true,
  maxsize: 1024 * 1024 * 10,
  maxFiles: 10,
  json: true
};

//var logglyConfig = {
//  level: 'error',
//  subdomain: "ibsdevops",
//  auth: {
//    username: "techdevops",
//    password: "indi@123"
//  },
//  inputName: "Test",
//  inputToken: "7facd974-c753-49ae-9f62-9f9d48895f74",
////  json: true,
//  tags: ['MobileApi', env]
//};

if (env != 'development') {
  logger.remove(logger.transports.Console);
  logger.add(logger.transports.Console, {level: 'info'});
  //logger.add(loggly, logglyConfig);
} else {
  logger.remove(logger.transports.Console);
  logger.add(logger.transports.Console, {level: 'debug'});
}

logger.add(logger.transports.DailyRotateFile, dailyRotateConfig);

exports.logger = logger;
