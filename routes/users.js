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
    var user = new User(body);
    user.save(function(err, user) {
        if (err) {
            console.log(err);
            return res.redirect(200, 'back');
        }
        res.render('index');
    });
    /*res.json({
        body: body,
        user: user,
        status: 'succeed'
    });*/
});

/***********************************************
 **  NEW
 ************************************************/
router.get('/new', function(req, res, next) {
    res.render('./users/new');
});

/***********************************************
 **  LOGIN
 ************************************************/
router.get('/login', function(req, res, next) {
    res.render('./users/login');
});

router.post('/login', function(req, res, next) {
    var body = req.body;

    User.findOneAsync(body)
        .then(function(user) {
            if (user === null) {
                console.log('There is no such user.');
                return res.redirect(301, 'back');
            }

            res.cookie('member', {
                id: user.id
            }, {
                expires: new Date(Date.now() + 10000)
            });
            res.redirect(301, '/');
        })
        .error(function(err) {
            res.json({
                error: err,
                status: 'error'
            });
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