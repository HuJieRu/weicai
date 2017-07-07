let Model = require('../vendor/model');
class UserModel extends Model{
	getUserInfo(param){//通过手机号查询用户信息
		return this.query('select id,mid,gid,account,reg_time,last_time,status from users where account=?',param);
	}
	
	getUidOfMid(param){//通过mid查找用户
		return this.query('select id from users where mid=? limit 1',param);
	}
	login(param){//根据手机号和密码来查询用户
		return this.query('select id,mid,gid,account,reg_time,last_time,status from users where account=? and password=?',param);
	}
	/* getUserInfoOfId(uid){//通过uid查询用户信息
		return this.query('select * from users where id=?',uid);
	} */
	addUserMsg(param){//通过手机号和密码添加用户
		return this.query('insert into users(account,password,reg_time) values(?,?,now())',param);
	}
	getUserInfoOfId(param){//通过id查询用户基本信息信息
		return this.query('select id,mid,gid,account,reg_time,last_time,status from users where id=?',param);
	}
	update(param){//更新用户的mid
		return this.query('update users set ? where id=?',param);
	}
	updateLastTime(param){//更新用户登录时间
		return this.query("update users set last_time=now() where id=?",param);
	}
}
module.exports=UserModel;