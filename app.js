let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let index = require('./routes/index');
let users = require('./routes/users');
let movies_banner = require('./routes/movies_banner')
let movies_content = require('./routes/movies_content')
//获取应用实例
let app = express();


// view engine setup
//试用模板引擎
app.set('views', path.join(__dirname, 'views'));//模板文件所在目录
app.set('view engine', 'ejs');//要试用的模板引擎,事先要npm install ejs --save

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//试用第三方中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//use static files
//试用内置中间件
app.use(express.static(path.join(__dirname, 'public')));


//试用路由级中间件
app.use('/', index);
app.use('/users', users);
app.use('/movies_banner', movies_banner)
app.use('/movies_content', movies_content)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  //调用错误级中间价
  next(err);
});

// error handler
//错误级中间件
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
