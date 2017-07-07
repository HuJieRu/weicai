let Model = require('../vendor/model');
class FollowStudentModel extends Model{
	add(param){//添加关注该学生
		return this.query('insert into follow_student set uid=?,to_uid=?,create_time=now()',param);
	}
	deleteStudent(param){//删除关注该学生
		return this.query('delete from follow_student where uid=? and to_uid=?',param);
	}
	hasFollow(param){//通过uid和同学uid查找是否有关注该学生
		return this.query('select * from follow_student where uid=? and to_uid=?',param);
	}
	/* getFollowStudentList(param){
		return this.query('select um.* from follow_student fs left join user u on fs.uid=u.id left join user_msg um on um.id=u.mid where fs.uid=?',param);
	} */
	getUidOfUser(param,page){//通过用户uid得到一定数量的关注的学生的数据
		return this.query('select to_uid from follow_student  where uid=? order by create_time DESC limit ?',[param,page]);
	}
	countMyFollow(param){//得到关注同学的数量
		return this.query('select count(*) number from follow_student where uid=?',param);
	}
}
module.exports=FollowStudentModel;