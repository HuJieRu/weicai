'use strict'
let mysql = require('mysql');
let moment = require('moment');
moment.locale('zh-cn');
let fs=require("fs");
let dbConfig={}
try{
	dbConfig=fs.readFileSync('conf/dbConfig.json','utf-8');//读取数据库配置文件
	dbConfig=JSON.parse(dbConfig);//转化成json对象
}catch(err){
	console.log(err);
	fs.appendFile('logs/'+moment().format('L')+'-mysql.txt','ERROR: '+err+'\n',()=>{});
}
let pool = mysql.createPool(dbConfig);//建立地址池
let query=(sql,param,callback)=>{//本地的query方法
    pool.getConnection((err,conn)=>{  //地址池连接
        if(err){  
            callback(err,null,null);//如果有错误则传错误  
        }else{
            let res=conn.query(sql,param||[],(qerr,vals,fields)=>{//如果连接池打开正常，则执行语句
                //释放连接  
                conn.release();  
                //事件驱动回调  
                callback(qerr,vals,fields,res);
				res=null;//释放资源
            });  
        }  
    });
};  

class Model{
	query(sql,param){//父类的query方法
		let callbackList=[];
		let cache=null;
		query(sql,param,(err,result,fields,res)=>{//执行本地的query方法
		//打印错误
	
			if(err){
				console.log(err);
			}
			let str=moment().format()+':\n'+'   sql:'+res.sql;
			// if(typeof result =="object"){
				// str+='\n   result:'+JSON.stringify(result);
			// }
			// if(err){
				// str+='\n   '+err;
			// }
			//记录到日志
			fs.appendFile('logs/'+moment().format('L')+'-mysql.txt',str+'\n',()=>{});
			let callback=callbackList.shift();//删除回调数组头部元素
			callback&&(cache=callback(result));//如果有回调，则执行回调，并且将查询的结果传进去
			cache&&cache.callbackList&&[].push.apply(cache.callbackList,callbackList);//如果子model有回调则合并
		})
		
		return {
			then:function(callback){
				callbackList.push(callback);//添加回调数组尾部元素
				return this;
			},
			callbackList:callbackList,
		}
	}
	db(name){
		let filename='/model/'+name+'Model';
		try{
			fs.accessSync('./note.txt',fs.constants.F_OK);
			let DB=require();
			return new DB();
		}catch(ex){
			console.log(filenam+'不存在');
		}
	}
}
module.exports=Model;