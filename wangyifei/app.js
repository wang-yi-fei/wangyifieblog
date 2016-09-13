var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var user = require('./routes/user');
var article = require('./routes/article');
require('./db');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');//设置模板引擎
app.engine('html', require('ejs').__express);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
var fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
var settings = require('./settings');
var flash = require('connect-flash');
app.use(session({
    secret: 'zfpx',//指定要加密cookie的密钥
    resave: true,//每次请求都要重新保存session
    saveUninitialized: true,//保存未初始化的session
    store: new MongoStore({ //指定session存储位置
        url: settings.dbUrl
    })
}));
//放在session之后，放在读取flash之前
app.use(flash());
//用来将flash消息赋给模板数据对象
app.use(function (req, res, next) {
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    res.locals.user = req.session.user;
    res.locals.keyword = '';
    next();
});
//静态文件中间件 根目录是public目录,所以在页面中引用静态文件的时候必须以public目录作为根目录
app.use(express.static(path.join(__dirname, 'public')));

//当路径是/开头的话交由routes处理
app.use('/', routes);
//当路径/users开头的话交由users
app.use('/user', user);
app.use('/article', article);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log(req.url);
    res.render('404');
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.error(err);
        errorStream.write(err.toString());
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
