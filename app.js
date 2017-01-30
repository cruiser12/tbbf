var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql      = require('mysql');

var dbconfig = require('./config/db');

var index = require('./routes/index');
var users = require('./routes/users');
var examine = require('./routes/examine');

var app = express();

//db setup
var db = mysql.createConnection(dbconfig);
db.connect();

app.set('db',db);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/examine', examine);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var matrix =
    [
        ['T','Z','O','S','S','E'],
        ['E','L','A','T','A','C'],
        ['R','E','W','U','H','H'],
        ['K','L','S','F','N','L'],
        ['E','E','T','T','E','G'],
        ['S','D','E','E','L','N'],
        ['T','E','A','N','E','E']
    ];

var words = require('./lib/examiner')(db,matrix);

console.log(words);

module.exports = app;
