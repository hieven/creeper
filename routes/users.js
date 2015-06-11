var express = require('express');
var router = express.Router();
var User = require('../models').user;
var middlewares = require('./middlewares');

/***********************************************
 **  GET ALL USERS
 ************************************************/
exports.index = function(req, res, next) {
    res.json({
        status: 'succeed'
    });
};


/***********************************************
 **  CREATE
 ************************************************/
exports.create = function(req, res, next) {
    var body = req.body;

    User.create(body)
        .then(function(user) {
            req.session.user = {
                user_id: user.id,
                username: user.username,
            };
            res.redirect('/');
        });
};

/***********************************************
 **  NEW
 ************************************************/
exports.new = function(req, res, next) {
    res.render('./users/new');
};

/***********************************************
 **  LOGIN
 ************************************************/
exports.login_page = function(req, res, next) {
    res.render('./users/login');
};

exports.login = function(req, res, next) {
    var body = req.body;


    User.findOne({
        where: body
    }).then(function(user) {

        if (user === null) {
            return res.redirect('back');
        }
        console.log(user);
        req.session.user = {
            user_id: user.id,
            username: user.username,
        };

        res.redirect('/');
    });
};

/***********************************************
 **  LOGOUT
 ************************************************/
exports.logout = function(req, res, next) {
    req.session.destroy(function(err) {
        if (err) console.log('session delete error ' + err);
        res.redirect('/');
    });

};

/***********************************************
 **  SHOW
 ************************************************/
exports.show = function(req, res, next) {
    var member = middlewares.assign_user(req);
    var id = req.params.id;
    console.log(id);
    User.findAsync({
            _id: id
        })
        .then(function(u) {

            res.json({
                user: u,
                status: 'succeed'
            });
        });
};


/***********************************************
 **  EDIT
 ************************************************/
exports.edit = function(req, res, next) {
    var body = req.body;



    /*res.json({
        body: body
    });*/
};


/***********************************************
 **  UPDATE
 ************************************************/
/*router.get('/:id/edit', function(req, res, next) {
    var body = req.body;
    res.json({
        status: 'succeed'
    });
});*/


/***********************************************
 **  DELETE
 ************************************************/
exports.delete = function(req, res, next) {
    var body = req.body;
    res.json({
        status: 'succeed'
    });
};