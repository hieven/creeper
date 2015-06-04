var middlewares = require('./middlewares');

/***********************************************
 **  GET HOME PAGE
 ************************************************/
exports.index = function(req, res) {

  res.render('index');
};