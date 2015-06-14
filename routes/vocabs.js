var request = require('request');
var config = require('../config/local');
var _ = require('lodash');
var Word = require('../models').word;

// Search
exports.search = function(req, res, next) {
  var vocab = req.params.vocab.toLowerCase();

  Word
    .findOne({
      where: {
        word: vocab
      }
    })
    .then(function(word) {

      // If there is no such word in database.
      if (word === null) {
        // Check youdao dictionary first
        var url = 'http://fanyi.youdao.com/openapi.do?';
        url += 'keyfrom=' + config.youdao.keyFrom;
        url += '&key=' + config.youdao.accessKey;
        url += '&type=data&doctype=json&version=1.1&q=';
        url += vocab;

        request.post({
          url: url,
        }, function(err, httpResponse, word) {
          // If there are some reason on youdao API.
          if (err) {
            console.log('youdao API errpr ' + err);
            return res.json({
              word: vocab,
              definitions: []
            });
          }

          try {
            word = JSON.parse(word);
          } catch (e) {
            word = {
              query: vocab,
              definitions: []
            };
          }

          // TODO: add this new vocab into database.

          return res.json({
            word: word.query,
            definitions: word.basic.explains
          });
        });

      } else {
        // Prevent JSON.parse error
        try {
          word.definitions = JSON.parse(word.definition);
        } catch (e) {
          word.definitions = [];
        }

        res.json(word);
      }

    });


};