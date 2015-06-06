var express = require('express');
var router = express.Router();
var Article = require('../models').article;
var Category = require('../models').category;
var middlewares = require('./middlewares');
var categories = require('../config/category_list');
// Get all articles by category
exports.index = function(req, res, next) {
  var category = req.params.category;
  console.log(Category);
  Category.getArticles()
    .then(function(articles) {

      console.log(articles);

      res.json({
        articles: articles
      });
      //res.render('./articles/new');
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
  Article.create(body)
    .then(function(article) {
      res.redirect('/admin');
    });
};

// Show
exports.show = function(req, res, next) {


  res.json({
    status: 'succeed',
    articles: articles
  });
  //res.render('./articles/new');
};