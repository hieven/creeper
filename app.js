var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var config = require('./config/local');
var app = express();

var SESSION_SECRET = 'evenandrewyiling';



/***********************************************
 **  VIEW ENGINE SETUP
 ************************************************/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(
  sassMiddleware({
    src: __dirname + '/scss', //where the sass files are 
    dest: __dirname + '/public', //where css should go
    debug: true // obvious
  })
);



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


/***********************************************
 **  SESSION SETTING (USING REDIS)
 ***********************************************/
var redis = require('redis');
var client = redis.createClient(); //CREATE REDIS CLIENT
client.select(3, function() { /* ... */ });
client.set("string key", "string val", redis.print);
client.on('error', function(err) {
  console.log('Redis error: ' + err);
});
client.on('ready', function(err) {
  console.log('connected');
  app.use(session({
    store: new RedisStore({

      client: client
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }));
});


console.log(config.session.redis);



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