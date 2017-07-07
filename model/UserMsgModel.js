let Model = require('../vendor/model');
class UserMsgModel extends Model{
	add(param){//添加用户完整信息
		return this.query('insert into users_msg set ?',param);
	}
	getCheckUsers(param=[0]){//得到需要审核的用户，状态为0
		return this.query('select um.*,u.account phone from users_msg um join users u on u.mid=um.id where um.status=?',param);
	}
	getCheckResult(param=[0]){//查询状态为1的已经审核的用户
		return this.query('select um.*,u.account phone,r.status reviewStatus from users_msg um join users u on u.mid=um.id join check_user_status r on r.aid=u.id where um.status=?',param);
	}
	getUserInfo(param){//查询用户完整信息
		return this.query('select um.*,u.account phone,s.name schoolName,p.name provinceName from users_msg um join users u on u.mid=um.id join school s on um.school=s.id join province p  on um.school_city=p.id where um.id=?',param);
	}
	updateUserStatus(param){//修改用户审核状态
		return this.query('update users_msg set ? where id=?',param);
	}
	getmySchool(param){//得到用户学校名称
		return this.query('select s.id,s.name from users_msg um join users u on u.mid=um.id join school s on um.school=s.id where u.id=? ',param);
	}
}
module.exports=UserMsgModel;