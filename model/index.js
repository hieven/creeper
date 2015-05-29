var config = require('../config/local');
var mongoose = require('mongoose');
var Promise = require("bluebird");
var User = require('./user');


var mongoURL = 'mongodb://' + config.mongo.host + '/' + config.mongo.database;
mongoose.connect(mongoURL);


exports.User = Promise.promisifyAll(User);