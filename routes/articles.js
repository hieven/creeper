var express = require('express');
var _ = require('lodash');
var router = express.Router();
var Article = require('../models').article;
var Category = require('../models').category;
var middlewares = require('./middlewares');
var categories = require('../config/category_list');
// Get all articles by category
exports.index = function(req, res, next) {
  var category = req.params.category;
  Article.findAll({
      include: [{
        model: Category,
        where: {
          name: category
        }
      }]
    })
    .then(function(articles) {

      res.render('./articles/index', {
        category: category,
        articles: articles
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
      article.increment('seen').then();
    });
};