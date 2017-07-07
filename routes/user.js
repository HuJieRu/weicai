let express = require('express');
let router = express.Router();
let md5 = require('md5');
let formidable = require('formidable');
let UserModel = require('../model/UserModel');
let SchoolModel = require('../model/SchoolModel');
let ProvinceModel = require('../model/ProvinceModel');
let fs = require('fs');
let UserMsgModel = require('../model/UserMsgModel');
let mylog = require('../vendor/mylog');
let path = require('path');
let codeData = require('../conf/codeData.json');
let common = require('../common/function');
/* let Canvas=require('canvas');
let canvas;
let ctx;
canvas=new Canvas(72,28);
ctx=canvas.getContent('2d');
 */
router.get(['/register'], (req, res, next) => {
    if (!req.session.uid) {
        res.render('common/hint', { 'content': '您还没登录！', 'url': 'http://127.0.0.1:3000/user/login' });
		return;
    }
    next();
})
router.post(['/register'], (req, res, next) => {
    if (!req.session.uid) {
        res.render('common/hint', { 'content': '您还没登录！', 'url': 'http://127.0.0.1:3000/user/login' });
		return;
    }
    next();
})
//登录get
router.get('/login', function(req, res, next) {
	 let data={};

	/*ctx.fillText(createCode());
	ctx.strokeStyle='rgba(0,0,0,0.5)';
	ctx.stroke();
	data['codesrc']=canvas.toDataURL(); */
	data['code']=createCode();
    res.render('user/login',data);
});
router.get('/getCode', function(req, res, next) {
	res.send({error_code:0,code:createCode()});
});
//得到验证码
 function createCode(id){  
	 let code = "";   
	 let codeLength = 4;//验证码的长度  
	 let random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',  
	 'S','T','U','V','W','X','Y','Z');//随机数  
	 for(let i = 0; i < codeLength; i++) {//循环操作  
		let index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）  
		code += random[index];//根据索引取得随机数加到code上  
	}  
	codeData["id"]=code;
	return code;  
}  
//登录post
router.post('/login', function(req, res, next) {
    let usermodel = new UserModel();
	if(req.body.code.toUpperCase()!=codeData["id"]){
		res.render('common/hint', { 'content': '验证码不正确！', 'url': 'http://127.0.0.1:3000/user/login' });
		return;
	}
    usermodel.login([req.body.phone, md5(req.body.password)])
        .then((result) => {
            if (result && result.length) {//查到了用户信息
                req.session.uid = result[0].id;
                req.session.userinfo = result[0];
                if (result[0].mid) {//假如用户有完整信息
                    let usermsgmodel = new UserMsgModel();
					usermodel.updateLastTime([result[0].id]);//更新用户登录时间
                    return usermsgmodel.getUserInfo([result[0].mid]);//查询用户完整信息
                } else {
                    res.redirect('/index/index');
                }
            } else {
                res.render('common/hint', { 'content': '账号或者密码错误！', 'url': 'http://127.0.0.1:3000/user/login' });
            }
        })
        .then((result) => {
            if (result && result.length) {
				
                Object.assign(req.session.userinfo, result[0]);//合并用户的完整信息
				/* console.log("session"+JSON.stringify(req.session.userinfo)); */
            }
            res.redirect('/index/index');
        })

});
//完善信息注册get
router.get('/register', function(req, res, next) {
	let data={};
	let province=[];
	let school=[];
	let schoolmodel=new SchoolModel();
	let provinceModel=new ProvinceModel();
	provinceModel.getAllProvince()//得到城市
	.then((result)=>{
		province=result;
		return schoolmodel.getAllSchool();//得到学校
	})
	.then((result)=>{
		school=result;
		data['schoolData']=common.delayeringSchool(province,school);//整理城市和学校的关系
		res.render('user/register',data);
	})
   
});
//完善信息注册post
router.post('/register', (req, res, next) => {
    let usermsgmodel = new UserMsgModel();

    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        let data = fields;//存储用户基本信息
		//得到图片的名称，分割名字和后缀
        let avatarNamelist = files.avatar.name.split('.');
        let cardPhotoNamelist = files.card_photo.name.split('.');
        let studentPhotoNamelist = files.student_photo.name.split('.');
		//得到图片保存在服务器的路径
        data['avatar'] = '/upload/files/' + (new Date()).getTime() + parseInt(Math.random() * 100) + '.' + avatarNamelist[avatarNamelist.length - 1];
        data['card_photo'] = '/upload/files/' + (new Date()).getTime() + parseInt(Math.random() * 100) + '.' + cardPhotoNamelist[cardPhotoNamelist.length - 1];
        data['student_photo'] = '/upload/files/' + (new Date()).getTime() + parseInt(Math.random() * 100) + '.' + studentPhotoNamelist[studentPhotoNamelist.length - 1];
        //将图片保存到服务器，第一个参数是临时文件的路径，第二个是服务器的路径
		fs.renameSync(files.avatar.path, path.join(__dirname, '../public' + data['avatar']));
        fs.renameSync(files.card_photo.path, path.join(__dirname, '../public' + data['card_photo']));
        fs.renameSync(files.student_photo.path, path.join(__dirname, '../public' + data['student_photo']));
		
        usermsgmodel.add(data).then((result) => {//添加用户完整信息
                mylog.debug(result);
                if (result.insertId) {//如果添加用户完整信息成功
                    let usermodel = new UserModel();
                    return usermodel.update([{ 'mid': result.insertId, }, req.session.uid]);//将用户的mid更新
                } else {
                    res.render('common/hint', { 'content': '添加信息失败', 'url': 'http://127.0.0.1:3000/user/register})' })
                }
            })
            .then(() => {//mid更新成功之后信息添加才成功
                res.render('common/hint', { 'content': '信息添加成功！', 'url': 'http://127.0.0.1:3000/personCenter/personalCenter' })
            })
    })
})
//快速注册get
router.get('/smallRegister', function(req, res, next) {
    res.render('user/smallRegister');
});
//快速注册post
router.post('/smallRegister', function(req, res, next) {
    let usermodel = new UserModel();
    usermodel.getUserInfo([req.body.phone])//通过手机号查询用户信息
        .then((result) => {
            if (result && result.length) {//如果数据库中已经有该手机号
                res.render('common/hint', { 'content': '该账号已被注册！', 'url': 'http://127.0.0.1:3000/user/smallRegister' });
                return false;
            } else {
                return usermodel.addUserMsg([req.body.phone, md5(req.body.password)]);//没有该手机号则添加这个用户
            }
        })
        .then((result) => {
			usermodel.updateLastTime([result.insertId]);//更新用户登录时间
            return usermodel.getUserInfoOfId(result.insertId);//通过添加用户的返回id得到用户信息
        })
        .then((result) => {
            if (result && result.length) {
                req.session.uid = result[0].id;//储存用户id
                req.session.userinfo = result[0];//储存用户信息
                res.redirect('/index/index');//重定向到首页
            }
        })

});
module.exports = router;