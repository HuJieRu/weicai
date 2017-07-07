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
            //Ŀ¼
            "pattern": "yyyy-MM-dd-"+level+".log",
            //�������������ǰ��죬Ҳ��������ΪyyyyMMddhh.log��Ϊ��ʱ
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