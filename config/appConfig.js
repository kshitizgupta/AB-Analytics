/**
 * This file resolves the config string to proper config settings
 * Created by prakhar on 11/8/14.
 */

var env = require('./environment').environment || 'development',
    config = require('./config')[env]
    ;

module.exports = config;
