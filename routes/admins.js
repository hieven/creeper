var express = require('express');
var router = express.Router();
var User = require('../models').user;
var Article = require('../models').article;
var middlewares = require('./middlewares');

// Index page
exports.index = function(req, res, next) {
  console.log('--------------------->');
  res.render('./admins/index');
};