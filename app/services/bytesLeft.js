/**
 * Created by kshitiz on 5/9/15.
 */
var request = require('request');
var cheerio = require('cheerio');
var logger = require('../../config/logging').logger;

module.exports = function (cb) {
  var options = {
    url: 'http://www.airtel.in/smartbyte-s/page.html',
    timeout: 5000
  };
  request.get(options, function (err, resp, body) {
    if(err) {
      logger.error("Error in bytesLeft = ", err);
      cb(null);
      return;
    }
    var $ = cheerio.load(body);
    var newUrl = $('iframe').attr('src');
    console.log("newUrl = ", newUrl);
    var option = {
      url: newUrl,
      followAllRedirects: true,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36",
        'Accept-Encoding': 'gzip,deflate'
      },
      encoding: null,
      timeout: 5000
    };
    request.get(option, function (err, resp, body) {
      if(err) {
        logger.error("Error in 2nd level = ", err.stack);
        cb(null);
        return;
      }
      var $ = cheerio.load(body);
      var details = $('.dashboard .detail span').text().toLowerCase();
      //var details = $('.list1 .description').text();
      //var noOfDaysLeft = $('.list1 .description').text();
      var bytesLeft = parseFloat(details.split('gb')[0]);
      var daysLeft = parseInt(details.split('gb')[1].split('kbps')[1]);
      logger.debug("DETAILS = ", details);
      logger.debug("CURRENT BYTES  = %s GBs", bytesLeft);
      logger.debug("DAYS LEFT = %s days", daysLeft);
      cb({
        bytesLeft: bytesLeft,
        daysLeft: daysLeft,
        additionalInfo: details
      });
    });
  });
};
