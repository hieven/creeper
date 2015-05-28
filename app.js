var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();


/***********************************************
 **  DATABASE CONNECTION
 ************************************************/
var db = require('./model');



/***********************************************
 **  VIEW ENGINE SETUP
 ************************************************/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



/***********************************************
 **  DEFAULT SETTING
 ************************************************/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes'));

/***********************************************
 **  CATCH 404 AND FORWARD TO ERROR HANDLER
 ***********************************************/
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



/***********************************************
 **  DEVELOPMENT ERROR HANDLER
 **  WILL PRINT STACKTRACE
 ************************************************/
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}



/***********************************************
 **  PRODUCTION ERROR HANDLER
 **  NO STACKTRACE LEAKED TO USER
 ************************************************/
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;