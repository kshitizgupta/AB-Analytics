/**
 * Holds the respective config set for the environment
 * Created by prakhar on 11/8/14.
 */

module.exports = {

  development: {
    hostName:'localhost',
    hostIp: '0.0.0.0',
    hostPort: '9000',
    logPath: require('path').normalize(__dirname + '/../logs'),
    db: 'mongodb://localhost:27017/LMS'
  },

  staging: {
    hostName:'localhost',
    hostIp: 'localhost',
    hostPort: '9000',
    logPath: require('path').normalize(__dirname + '/../logs'),
    db: 'mongodb://localhost:27017/LMS'
  },

  production: {
    hostName:'www.vivilio.com',
    hostIp: '43.252.88.16',
    hostPort: '9000',
    logPath: require('path').normalize(__dirname + '/../logs'),
    db: 'mongodb://180.179.213.77:27017/LMS'
  }
};
