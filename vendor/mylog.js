'use strict'
let fs=require('fs');
let moment = require('moment');
moment.locale('zh-cn');
class MyLog{
	error(content){
		this.echo(content,'error');
	}
	echo(content,type){
		if(typeof content=='object'){
			content=JSON.stringify(content);
		}
		fs.appendFile('logs/'+moment().format('L')+'-'+type+'.txt','\n'+moment().format()+': \n'+content+'\n',()=>{});
	}
	debug(content){
		this.echo(content,'debug');
	}
}
module.exports=new MyLog();