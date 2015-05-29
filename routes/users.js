var express = require('express');
var router = express.Router();
var User = require('../model').User;

/***********************************************
 **  GET USERS
 ************************************************/
router.get('/', function(req, res, next) {
    res.json({
        status: 'succeed'
    });
});


/***********************************************
 **  CREATE
 ************************************************/
router.post('/', function(req, res, next) {
    var body = req.body;
    res.json({
        body: body,
        status: 'succeed'
    });
});

/***********************************************
 **  NEW
 ************************************************/
router.get('/new', function(req, res, next) {
    res.json({
        status: 'succeed'
    });
});



/***********************************************
 **  SHOW
 ************************************************/
router.get('/:id', function(req, res, next) {
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

});


/***********************************************
 **  EDIT
 ************************************************/
router.get('/:id/edit', function(req, res, next) {
    var body = req.body;
    res.json({
        status: 'succeed'
    });
});


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
router.delete('/:id', function(req, res, next) {
    var body = req.body;
    res.json({
        status: 'succeed'
    });
});
module.exports = router;