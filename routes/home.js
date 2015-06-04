var middlewares = require('./middlewares');
var Article = require('../models').article;
/***********************************************
 **  GET HOME PAGE
 ************************************************/
exports.index = function(req, res) {
  Article.findAll().then(function(articles) {

    res.render('index', {
      articles: articles
    });
  });

};