var User = require('../models').User;
var config = require('../config/local');
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

exports.check_admin = function(req, res, next) {

  // User does not login
  if (!req.session.user) {
    console.log('Sorry, you does not login!!!!!!!');
    return res.redirect('/users/login');
  }

  // User does not an admin
  if (req.session.user.user_id !== 4 && req.session.user.user_id !== 5) {
    console.log('Sorry, you are not an admin!!!!!!!');
    return res.redirect(301, '/');
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