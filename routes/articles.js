var express = require('express');
var router = express.Router();
var Article = require('../models').article;
var middlewares = require('./middlewares');

// Get all articles
exports.index = function(req, res, next) {

}



// Get all articles
exports.new = function(req, res, next) {
  res.render('./articles/new');
}


// Get all articles
exports.create = function(req, res, next) {
  var body = req.body;
  body.seen = 0;
  Article.create(body)
    .then(function(article) {
      res.redirect('/admin');
    });
}