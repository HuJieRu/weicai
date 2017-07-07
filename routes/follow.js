let express = require('express');
let router = express.Router();
let FollowStudentModel = require('../model/FollowStudentModel');
let FollowSchoolModel = require('../model/FollowSchoolModel');
let CommodityModel = require('../model/CommodityModel');
// 关注学生
router.get('/followStudent',(req, res, next)=>{
	let followstudentmodel=new FollowStudentModel();
/* 	let status=req.query.status; */
	let follow=null;
	let param=[req.session.uid,req.query.id];
	if(req.session.uid==req.query.id){
		res.send({error_code:400,content:'不能关注自己'});
		return;
	}
	
	if(req.session&&req.session.uid){
		followstudentmodel.hasFollow(param)//查找该用户是否有关注该学生
		.then((result)=>{
			if(result&&result.length){//如果有则取消关注
				follow=0;
				return followstudentmodel.deleteStudent(param);
			}else{//没有则关注
				follow=1;
				return followstudentmodel.add(param);
				
			}	
		})
		.then((result)=>{
			if(follow==1){//如果需要关注
				if(result&&result.insertId||result.insertId===0){//如果成功关注
					res.send({error_code:0,content:'关注成功'});
				}else{//如果失败
					res.send({error_code:400,content:'关注失败'});
				}		
			}else{//如果取消关注
				res.send({error_code:0,content:'取消关注成功'});
			}
		});
	}else{
		res.send({error_code:400,content:'您还没登录，不能关注！'});
		return;
		
	}
	
})
// 关注学校
router.get('/followSchool',(req, res, next)=>{
	let followschoolmodel=new FollowSchoolModel();
/* 	let status=req.query.status; */
	let follow=null;
	let param=[req.session.uid,req.query.id];
	if(req.session&&req.session.uid){
		followschoolmodel.hasFollow(param)//查找该用户是否有关注该学校
		.then((result)=>{
			if(result&&result.length){//如果有则取消关注
				follow=0;
				return followschoolmodel.deleteSchool(param);
			}else{//没有则关注
				follow=1;
				return followschoolmodel.add(param);
			}	
		})
		.then((result)=>{
			if(follow==1){//如果需要关注
				if(result&&result.insertId||result.insertId===0){//如果成功关注
					res.send({error_code:0,content:'关注成功'});
				}else{//如果失败
					res.send({error_code:400,content:'关注失败'});
				}			
			}else{//如果取消关注
				res.send({error_code:0,content:'取消关注成功'});
			}
		})
	}else{
		res.send({error_code:400,content:'您还没登录，不能关注！'});
		return;
	}
	
})

// 关注学生列表
/* router.get('/followStudentList',(req, res, next)=>{
	let followstudentmodel=new FollowStudentModel();
	followstudentmodel.getFollowStudentList([req.query.id])
	.then((result)=>{
		res.send({error_code:0,content:'取消关注成功'});
	})
}) */

module.exports = router;