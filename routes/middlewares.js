var User = require('../models').User;
var config = require('../config/local');
var categoryList = require('../config/category_list');
var adminList = require('../config/admin');
var Article = require('../models').article;
var ArticleHistory = require('../models').articleHistory;
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: config.aws.accessKey,
  secretAccessKey: config.aws.secretKey
});

exports.assign_user = function(req, res, next) {
  var user = null;


  // Check user login or not
  if (req.session.user) {
    user = {};
    user.user_id = req.session.user.user_id;
    user.username = req.session.user.username;
  }

  res.locals.user = user;
  next();
};

exports.assign_category = function(req, res, next) {
  res.locals.categoryList = categoryList.category;
  res.locals.categoryZh = categoryList.zh;
  next();
};

exports.assign_popular = function(req, res, next) {
  Article.findAll({
    order: 'seen DESC',
    limit: 5
  }).then(function(articles) {
    res.locals.popularArticles = articles;
    next();
  });

};

exports.check_admin = function(req, res, next) {

  // User does not login
  if (!req.session.user) {
    console.log('Sorry, you does not login!!!!!!!');
    return res.redirect('/users/login');
  }

  // User does not an admin
  if (adminList.indexOf(req.session.user.user_id) === -1) {
    console.log('Sorry, you are not an admin!!!!!!!');
    return res.redirect('/');
  }

  next();
};

// Below are just lots of normal functions used everywhere.

exports.s3Image = function(object) {
  var url = 'https://' + config.aws.region + '.amazonaws.com/' + config.aws.bucket;
  url += '/website-photo/';
  url += object;
  return url;
};

exports.updateHistory = function(req, res, next) {

  if (!req.session.user) {
    return next();
  }

  ArticleHistory.findOrCreate({
      where: {
        userId: req.session.user.user_id,
        articleId: req.params.id
      },
      defaults: {
        userId: req.session.user.user_id,
        articleId: req.params.id,
        isDone: false
      }
    })
    .then(function(articleHistory) {
      next();
    });
};