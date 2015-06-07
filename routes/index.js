var express = require('express');
var router = express.Router();
var middlewares = require('./middlewares');
var home = require('./home');
var users = require('./users');
var admins = require('./admins');
var articles = require('./articles');


// General API
router.get('*', middlewares.assign_user);
router.get('*', middlewares.assign_category);

// Get Home page
router.get('/', home.index);


// Users API
router.get('/users/', users.index);
router.post('/users/', users.create);
router.get('/users/new', users.new);
router.get('/users/login', users.login_page);
router.post('/users/login', users.login);
router.get('/users/logout', users.logout);
router.get('/users/:id', users.show);
router.get('/users/:id/edit', users.edit);
router.post('/users/:id/delete', users.delete);

// Admins API
router.all('/admin', middlewares.check_admin);
router.get('/admin', admins.index);
router.get('/admin/articles/new', articles.new);
router.post('/admin/articles/new', articles.create);

// Articles API
router.get('/articles/:category', articles.index);
router.get('/articles/:category/:id', articles.show);
module.exports = router;