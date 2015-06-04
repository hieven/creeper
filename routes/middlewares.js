var User = require('../models').User;

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
  if (req.session.user.user_id !== 4) {
    console.log('Sorry, you are not an admin!!!!!!!');
    return res.redirect(301, '/');
  }

  next();
};