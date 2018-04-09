var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var login = require('./routes/login');
var users = require('./routes/users');
var kind = require('./routes/kind');
var news = require('./routes/news');
var petList = require('./routes/petList');
var banner = require('./routes/banner');
var list = require('./routes/list');
var nav = require('./routes/nav');
var customer = require('./routes/customer');
var instructor = require('./routes/instructor');
var app = express();

// view engine setup
//console.log(__dirname)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//------------------------设置无跨域------------------
app.all("*", function(req,res,next){
  res.header('Access-Control-Allow-Origin',"*");
  next()
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//把静态资源文件放在Public中，能够通过跟路径去访问，可以省略public的绝对路径
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', index);
app.use('/login', login);
app.use('/users', users);
app.use('/kind', kind);
app.use('/news', news);
app.use('/banner', banner);
app.use('/list', list);
app.use('/petList', petList);
app.use('/nav', nav);
app.use('/customer',customer);
app.use('/instructor',instructor);
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

module.exports = app;