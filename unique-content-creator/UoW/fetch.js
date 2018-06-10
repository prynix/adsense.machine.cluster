const
  request = require('request'),
  cheerio = require('cheerio');

module.exports = function fetch(url) {
  return new Promise(function (resolve, reject) {
    request({
      url,
      method: 'GET',
      timeout: 10000
    }, function (error, response, body) {
      if (error) return reject(error);
      return resolve(cheerio.load(body));
    });
  });
}