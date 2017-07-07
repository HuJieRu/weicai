let Model = require('../vendor/model');
class FollowSchoolModel extends Model{
	add(param){//添加关注该学校
		return this.query('insert into follow_school set uid=?,sid=?,create_time=now()',param);
	}
	deleteSchool(param){//删除关注该学校
		return this.query('delete from follow_school where uid=? and sid=?',param);
	}
	hasFollow(param){//通过uid和学校sid查找是否有关注该学校
		return this.query('select * from follow_school where uid=? and sid=?',param);
	}
	getSidOfSchool(param,page){//根据uid查到需要数量的学校
		
		return this.query('select sid from follow_school where uid=? order by create_time DESC limit ?',[param,page]);
	}
	countMyFollow(param){//根据uid得到用户关注学校的数量
		return this.query('select count(*) number from follow_school where uid=?',param);
	}
}
module.exports=FollowSchoolModel;