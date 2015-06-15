var express = require('express');
var router = express.Router();
var middlewares = require('./middlewares');
var home = require('./home');
var users = require('./users');
var admins = require('./admins');
var articles = require('./articles');
var vocabs = require('./vocabs');
var comments = require('./comments');

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
router.get('/articles/history', articles.history);
router.get('/articles/random', articles.random);
router.get('/articles/:category', middlewares.assign_popular, articles.index);
router.get('/articles/:category/:id', middlewares.updateHistory, articles.show);
router.post('/articles/:category/:id/complete', articles.complete);

// Comment API
router.get('/articles/:category/:id/comments', comments.show);
router.post('/articles/:category/:id/comments', comments.create);

// Vocabs API
router.get('/vocabs', middlewares.check_login, vocabs.index);
router.post('/vocabs/:vocab', vocabs.addVocab);
router.post('/vocabs/:vocab/search', vocabs.search);



module.exports = router;