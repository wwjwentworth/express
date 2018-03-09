let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let videos_banner = require('./routes/videos/banner')
let videos_push_on = require('./routes/videos/push_on')
let videos_trailer = require('./routes/videos/trailer')
let videos_cut = require('./routes/videos/cut')
let videos_details = require('./routes/videos/video_details')
let register = require('./routes/register/register')
let isRepeatName = require('./routes/register/isRepeatName')
let login = require('./routes/login/login')
let community = require('./routes/community/community')
let tree = require('./routes/community/tree')
let update = require('./routes/community/update')
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
app.use('/videos_banner', videos_banner)
app.use('/videos_push_on', videos_push_on)
app.use('/videos_trailer', videos_trailer)
app.use('/videos_cut', videos_cut)
app.use('/videos_details', videos_details)
app.use('/register', register)
app.use('/isRepeatName', isRepeatName)
app.use('/login', login)
app.use('/community', community)
app.use('/tree', tree)
app.use('/update', update)
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

  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
