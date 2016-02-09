// base server stuffs
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

// our controllers
var index = require('./app/controllers/index');
var lists = require('./app/routers/lists');
//var users = require('./app/routers/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'raive is awesome', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport/passport')(passport);
app.use(function (req, res, next) {
  global.currentUser = req.user;
  next();
});

app.use('/', index);
//app.use('/users', users);
app.use('/lists', lists);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Database connections!
if (app.get('env') === 'development') {
  mongoose.connect('mongodb://localhost/raive');
} else {
  mongoose.connect(process.env.MONGOLAB_URI);
}

mongoose.connection.on('error', function (err) {
  console.error('mongodb connection error:', err);
  process.exit(-1);
});

mongoose.connection.once('open', function () {
  console.log('Mongoose has connected to mongodb');
});

console.log('Running in %s mode', app.get('env'));

module.exports = app;
