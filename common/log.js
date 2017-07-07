var log4js = require('log4js');

var levels = ['trace', 'info', 'error'];
var appenders = [{
    "type": "logLevelFilter",
    "level": 'INFO',
    "appender": {
        "type": "console"
    }
}];
for(var i in levels){
    var level = levels[i];
    appenders.push({
        "type": "logLevelFilter",
        "level": level.toUpperCase(),
        "appender": {
            "type": "dateFile",
            "filename": "logs/",
            //目录
            "pattern": "yyyy-MM-dd-"+level+".log",
            //命名规则，我们是按天，也可以设置为yyyyMMddhh.log，为按时
            "absolute": true,
            "alwaysIncludePattern": true
        }
    });
}

log4js.configure({
    "appenders": appenders
});

let logger=log4js.getLogger('app');
exports.useLog = function(){   
    //app.use(log4js.connectLogger(dateFileLog, {level:'INFO', format:':method :url'}));  
    return log4js.connectLogger(logger, {level:log4js.levels.ERROR}) 
}