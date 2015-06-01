var express = require('express');
var router = express.Router();
var User = require('../models').user;

/***********************************************
 **  GET USERS
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
            res.json({
                body: body,
                user: user,
                status: 'succeed'
            });
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
        res.json({
            user: user,
            status: 'success'
        });
    });
};

/***********************************************
 **  SHOW
 ************************************************/
exports.show = function(req, res, next) {
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
    res.json({
        status: 'succeed'
    });
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