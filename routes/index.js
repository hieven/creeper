var express = require('express');
var router = express.Router();
var home = require('./home');
var users = require('./users');


/***********************************************
 **  GET HOME PAGE
 ************************************************/
router.get('/', home.index);



// Users API
router.get('/users/', users.index);
router.post('/users/', users.create);
router.get('/users/new', users.new);
router.get('/users/login', users.login_page);
router.post('/users/login', users.login);
router.get('/users/:id', users.show);
router.get('/users/:id/edit', users.edit);
router.post('/users/:id/delete', users.delete);



module.exports = router;