var request = require('request');
var config = require('../config/local');
var _ = require('lodash');
// Search
exports.search = function(req, res, next) {
  var vocab = req.params.vocab;
  var url = 'http://fanyi.youdao.com/openapi.do?';
  url += 'keyfrom=' + config.youdao.keyFrom;
  url += '&key=' + config.youdao.accessKey;
  url += '&type=data&doctype=json&version=1.1&q=';
  url += vocab;

  request.post({
    url: url,
  }, function(err, httpResponse, vocab) {
    if (err) {
      console.log(err);
      return res.json({
        vocab: {}
      });
    }

    try {
      vocab = JSON.parse(vocab);
    } catch (e) {
      vocab = {};
    }
    vocab = _.omit(vocab, 'errorCode');
    res.json({
      vocab: vocab
    });
  });

};