var middlewares = require('./middlewares');
var Article = require('../models').article;
var Category = require('../models').category;
var _ = require('lodash');
/***********************************************
 **  GET HOME PAGE
 ************************************************/
exports.index = function(req, res) {
  var noPhoto = middlewares.s3Image('no_photo.jpg');
  Article
    .findAll({
      where: {
        time: {
          $gte: new Date() - 1
        },
        status: 1
      },
      include: [{
        model: Category,
        attributes: ['name', 'zh']
      }]
    })
    .then(function(articles) {

      articles = _.shuffle(articles);
      var headerImage = middlewares.s3Image('header.jpg');
      res.render('index', {
        headerImage: headerImage,
        articles: articles,
        noPhoto: noPhoto
      });
    });

};