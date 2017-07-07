'use strict';
var express = require('express');
var path = require('path');//处理文件路径的小工具
//var favicon = require('serve-favicon');//
var logger = require('morgan');//日志模块
var cookieParser = require('cookie-parser');//解析cookie
var session = require('express-session');//解析session
var bodyParser = require('body-parser');//bodyParser用于解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理.
var RedisStore = require('connect-redis')(session);

var index = require('./routes/index');
var user = require('./routes/user');
var commodity = require('./routes/commodity');
var personCenter = require('./routes/personCenter');
var check = require('./routes/check');
var coll = require('./routes/coll');
var follow = require('./routes/follow');

var mylog = require('./vendor/mylog');
var conf = require('./conf/conf.json');


var app = express();
var ejs = require('ejs');

let GoodsTypeModel = require('./model/GoodsTypeModel');
let SearchModel = require('./model/SearchModel');
let common = require('./common/function');

// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置页面路径

app.engine('.html', ejs.__express);//设置用ejs去解析html页面

app.set('view engine', 'html');//设置页面的引擎是html
app.set('env', 'development');




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'img/icon/logo.jpg')));
app.use(express.static(path.join(__dirname, 'public')));//设置静态文件路径,path.join连接路径
app.use(logger('dev'));//设置日志格式，且在终端输出日志,logger('common', {stream: accessLogStream}),此代码可输出到文件
app.use(bodyParser.json());//以json格式解析请求参数
app.use(bodyParser.urlencoded({ extended: false }));//以urlencoded格式解析请求参数
app.use(cookieParser());//初始化cookie
app.use(session({//给用户一个会话
    secret: "wdawdadawdatffghfhfthgfthest",//密文
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,//只能被HTTPS使用，类型Boolean，默认为false
        maxAge: 60 * 60 * 1000*24*7,//cookie超时时间,如果maxAge不设置，默认为null，这样的expire的时间就是浏览器的关闭时间，即每次关闭浏览器的时候，session都会失效。
    },
    store: new RedisStore({//redis数据库用来存储session
        host: '127.0.0.1',
        port: '6379',
        db: 0
    })
}));

//有些页面必须登录了才可以访问
app.use(['/commodity/cart', '/personCenter', '/check','/commodity/push_cart'], (req, res, next) => {
    if (!req.session.uid) {//如果没有uid，则表示还没登录，提示还没登录
        res.render('common/hint', { 'content': '您还没登录！', 'url': 'http://127.0.0.1:3000/user/login' });
		return;
    }
    next();
})
//判断用户是否是管理员
app.use((req, res, next) => {
    if (conf.admin!=req.session.uid) {//读取管理员配置文件，假如是管理员则给标识为false
        res.locals.isadmin = false;
    } else {
        res.locals.isadmin = true;
    }
    next();
})

app.use((req, res, next) => {
    try {
        res.locals.userinfo = req.session.userinfo;//从session中得到用户信息
        res.locals.get = req.query;//得到get请求的数据，物流地址那里有需要
        res.locals.post = req.body;//得到post请求的数据
    } catch (e) {}

    let goodstypemodel = new GoodsTypeModel();
    let searchmodel = new SearchModel();
    goodstypemodel.getAll()
        .then((result) => {
            res.locals.types = common.delayering(result, 0);//将得到的全部分类变成树型结构
			if(req.session.uid){//用户登录了才有关键词
				 return searchmodel.getKeyList(req.session.uid);//根据用户的uid查询用户搜索过的关键词
			}else{
				res.locals.searchWord=[];
				next();
			}
           
        })
        .then((result) => {
            res.locals.searchWord = result || [];//将关键词返回
            next();
        })
})
app.use('/', index);
app.use('/index', index);
app.use('/user', user);
app.use('/commodity', commodity);
app.use('/personCenter', personCenter);
app.use('/check', check);
app.use('/coll', coll);
app.use('/follow', follow);

// catch 404 and forward to error handler

// catch 404 and forward to error handler

//假如上面的都顺利通过，则抛异常
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    //res.render('common/hint',{'content':'页面不存在！',url:''});
    next(err);
});
//自定义的错误提示  适用开发环境
app.use((err, req, res, next) => {
        mylog.error('     ' + req.method + ' --- ' + req.url + " : " + err);
        let msg = err.toString().replace(/\n/g, '</br>');
        res.send('errorStatus:' + (err.status || 500) + '</br> Error: ' + msg + '</br>');
        res.end();
    })
    // error handler
app.use(function() {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);

    res.render('error');
});


module.exports = app;