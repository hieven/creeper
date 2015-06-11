var Comment = require('../models').comment;

exports.create = function(req, res, next) {
  var body = req.body;

  Comment
    .create(body)
    .then(function(comment) {
      res.redirect('');
    });
};

exports.show = function(req, res, next) {
  var article_id = req.params.id;

  Comment
    .findAll({
      where: {
        articleId: article_id
      }
    })
    .then(function(comments) {
      res.render('', {
        comments: comments
      });
    });
};