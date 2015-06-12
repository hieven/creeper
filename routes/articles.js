var express = require('express');
var _ = require('lodash');
var router = express.Router();
var middlewares = require('./middlewares');
var categories = require('../config/category_list');
var Article = require('../models').article;
var User = require('../models').user;
var Category = require('../models').category;
var ArticleHistory = require('../models').articleHistory;

// Get all articles by category
exports.index = function(req, res, next) {
  var category = req.params.category;
  var noPhoto = middlewares.s3Image('no_photo.jpg');
  Article.findAll({
      include: [{
        model: Category,
        where: {
          name: category
        }
      }],
      order: 'createdAt DESC'
    })
    .then(function(articles) {

      res.render('./articles/index', {
        category: category,
        articles: articles,
        noPhoto: noPhoto
      });
    });
};


// Admin create article page
exports.new = function(req, res, next) {
  res.render('./articles/new', {
    categories: categories
  });
};


// Admin create article manually
exports.create = function(req, res, next) {
  var body = req.body;
  body.seen = 0;
  body.caption = _(body.content).split(' ').take(50).value().join(' ');
  Article.create(body)
    .then(function(article) {
      res.redirect('/admin');
    });
};

// Show
exports.show = function(req, res, next) {
  var aid = req.params.id;
  var category = req.params.category;

  Article.findOne({
      where: {
        id: aid
      },
      include: [{
        model: Category,
        where: {
          name: category
        }
      }]
    })
    .then(function(article) {

      /*res.json({
        article: article
      });*/


      res.render('./articles/show', {
        article: article
      });
      // Increase article seen count
      article.increment('seen');
    });
};

// History
exports.history = function(req, res, next) {
  var user_id = req.session.user.user_id;

  User.findById(user_id)
    .then(function(user) {
      return user.getArticles({
        order: 'createdAt DESC'
      });
    })
    .then(function(articles) {
      res.render('./articles/history', {
        articles: articles
      });
    });
};

// Complete
exports.complete = function(req, res, next) {
  var user_id = req.session.user.user_id;
  var article_id = req.params.id;

  ArticleHistory.findOne({
      where: {
        userId: user_id,
        articleId: article_id
      }
    })
    .then(function(articleHistory) {
      return articleHistory.update({
        isDone: true
      });
    })
    .then(function() {
      res.json({
        status: true
      });
    });

};