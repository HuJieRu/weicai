let Model = require('../vendor/model');

class CheckUserStatusModel extends Model{
	/* getUsersReviewStatus(param){
		return this.query('select status from check_user_status where type=1 and aid=? limit 1',param);
	}
	getNotReviewUsers(){
		return this.query('select u.account phone,um.* from check_user_status r join users u on u.id=r.aid join users_msg um on u.mid=um.id where r.aid is null');
	} */
	checkReviewStatus(param){//审核用户是否通过
		return this.query('select id from users where mid=?',param).then((result)=>{//通过mid查找用户
			return this.query('select status from check_user_status where aid=?',[result[0].id]);//通过aid查找用户状态
		});
	}
/* 	getGoodsReviewStatus(param){
		return this.query('select status from check_user_status where type=2 and aid=? limit 1',param);
	} */
	add(param){//插入一条审核数据
		return this.query('insert into check_user_status set ?,check_time=now()',param);
	}
}
module.exports=CheckUserStatusModel;