var Comment = require('../models').comment;
var User = require('../models').user;
var middlewares = require('./middlewares');


// Create
exports.create = function(req, res, next) {
  var body = req.body;
  body.userId = req.session.user.user_id;
  body.articleId = req.params.id;


  Comment
    .create(body)
    .then(function(comment) {

      res.redirect('./comments');
    });
};

// Show
exports.show = function(req, res, next) {
  var article_id = req.params.id;
  var noPhoto = middlewares.s3Image('no_photo.jpg');


  Comment
    .findAll({
      include: [{
        model: User,
        attributes: ['username']
      }],
      where: {
        articleId: article_id
      },
      order: 'createdAt DESC'
    })
    .then(function(comments) {
      res.render('./comments/show', {
        comments: comments,
        recommendArticles: req.session.recommendArticles,
        noPhoto: noPhoto
      });
    });
};