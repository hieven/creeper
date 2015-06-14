var middlewares = require('./middlewares');
var Article = require('../models').article;
/***********************************************
 **  GET HOME PAGE
 ************************************************/
exports.index = function(req, res) {
  Article
    .findAll({
      where: {
        time: {
          $gte: new Date()
        }
      }
    })
    .then(function(articles) {
      var headerImage = middlewares.s3Image('header.jpg');
      res.render('index', {
        headerImage: headerImage,
        articles: articles
      });
    });

};