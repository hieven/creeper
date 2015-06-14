var express = require('express');
var _ = require('lodash');
var router = express.Router();
var middlewares = require('./middlewares');
var categories = require('../config/category_list');
var Article = require('../models').article;
var User = require('../models').user;
var Category = require('../models').category;
var Word = require('../models').word;
var ArticleHistory = require('../models').articleHistory;
var Sequelize = require('sequelize');
// Get all articles by category
exports.index = function(req, res, next) {
  var category = req.params.category;
  var noPhoto = middlewares.s3Image('no_photo.jpg');
  Article.findAll({
      where: {
        status: 1
      },
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
  var noPhoto = middlewares.s3Image('no_photo.jpg');
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


      res.render('./articles/show', {
        article: article,
        noPhoto: noPhoto
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
        order: 'createdAt DESC',
        include: [{
          model: Category,
          attributes: ['name']
        }]
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

  // All vocabs were searched when user read this article.
  var searched = req.body['searched[]'];
  var article = "";

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
      return Article.findById(article_id);
    })
    .then(function(arti) {
      article = arti;
      console.log(article.level);
      return Word.findAll({
        where: {
          word: searched
        },
        attributes: ['difficulty']
      });
    })
    .then(function(words) {

      // Handle recommended article
      var nextArticleLevel = analyzeUserLevel(words, article.easyCnt, article.hardCnt, article.level);
      return Article.findAll({
        where: {
          level: nextArticleLevel,
          id: {
            $ne: article.id
          }
        },
        limit: 5,
        order: [
          Sequelize.fn('RAND'),
        ],
        attributes: ['id', 'title', 'author', 'caption', 'time'],
        include: [{
          model: Category,
          attributes: ['name']
        }]
      });

    })
    .then(function(articles) {
      req.session.recommendArticles = articles;
      res.json({
        status: true
      });
    });
};

function analyzeUserLevel(words, easyCnt, hardCnt, arti_level) {
  var hardLine = 10;
  var easyLine = 8;
  var winnerPercent = 0.6;
  var loserPercent = 0.4;
  var hardHit = 0;
  var easyHit = 0;
  var level_hop = 0;

  words.forEach(function(word) {
    hardHit += (word.level >= hardLine) ? 1 : 0;
    easyHit += (word.level <= easyLine) ? 1 : 0;
  });

  var userPercent = parseFloat(hardHit / words.length);
  var userPower = 0;

  // Winner
  if (userPercent > winnerPercent) {
    userPower = parseFloat(hardHit / hardCnt);

    if (userPower < 0.2) {
      level_hop = 2;
    } else if (userPower > 0.8) {
      level_hop = 0;
    } else {
      level_hop = 1;
    }


  } else if (userPercent < loserPercent) { // Loser
    userPower = parseFloat(easyHit / easyCnt);

    if (userPower < 0.02) {
      level_hop = 0;
    } else if (userPower > 0.2) {
      level_hop = -1;
    } else {
      level_hop = -2;
    }
  } else { // Normal
    level_hop = 0;
  }

  return arti_level + level_hop;
}


// Random
exports.random = function(req, res, next) {

  Article.findOne({
      where: {
        status: 1
      },
      order: [
        Sequelize.fn('RAND'),
      ],
      include: [{
        model: Category,
        attributes: ['name']
      }]
    })
    .then(function(article) {
      res.redirect('./' + article.category.name + '/' + article.id);
    });

};