var express = require('express');
var router = express.Router();


/***********************************************
 **  REQUIRE EACH ROUTE
 ************************************************/
router.use('/users', require('./users'));



/***********************************************
 **  GET HOME PAGE
 ************************************************/
router.get('/', function(req, res) {
    res.render('index', {});
});

module.exports = router;