'use strict';
let express = require('express');
let router = express.Router();
let UserMsgModel = require('../model/UserMsgModel');
let CheckUserStatusModel = require('../model/CheckUserStatusModel');
let SeasonModel = require('../model/SeasonModel');
let UserModel = require('../model/UserModel');
/* 
router.get('/checkCommodity', (req, res, next) => {
    res.render('check/checkCommodity', { title: 'Express' });
});
router.get('/checkCommodityInfo', (req, res, next) => {
    res.render('check/checkCommodityInfo', { title: 'Express' });
}); */
//审核用户列表
router.get('/checkUser', (req, res, next) => {
    let usermsgmodel = new UserMsgModel();
    usermsgmodel.getCheckUsers()//得到需要审核的用户，状态为0
        .then((result) => {
            res.render('check/checkUser', { 'data': result });//直接显示结果
        })
});
//审核用户详情
router.get('/checkUserInfo', (req, res, next) => {
    let usermsgmodel = new UserMsgModel();
    usermsgmodel.getUserInfo([req.query.id]).then((result) => {//查询用户完整信息
        if (result && result.length) {//需要审核则渲染详情页面
            res.render('check/checkUserInfo', { 'data': result[0] });
        } else {//如果没有用户信息则该用户还没有完善信息，不需要审核
            res.render('common/hint', { 'content': '该用户还没有完善信息！', 'url': 'http://127.0.0.1:3000/check/checkUser' });
        }

    })
});
//查看审核结果
router.get('/lookCheckUserResult', (req, res, next) => {
    let usermsgmodel = new UserMsgModel();
    usermsgmodel.getCheckResult([1]).then((result) => {//查询状态为1的已经审核的用户
        res.render('check/lookCheckUserResult', { 'data': result });
    })
})
//提交审核
router.post('/check', (req, res, next) => {
    let usermodel = new UserModel();
    usermodel.getUidOfMid([req.body.id])//通过mid查找用户
        .then((result) => {
            let checkuserstatusmodel = new CheckUserStatusModel();
			//插入一条审核数据
            return checkuserstatusmodel.add({ 'author_id': req.session.uid, 'type': 1, 'aid': result[0].id,'status': req.body.result });
        })
        .then((result) => {
            let usermsgmodel = new UserMsgModel();
            usermsgmodel.updateUserStatus([{ 'status': 1 }, req.body.id]);//更新用户状态为已经审核
            if (req.body.result == 0) {//如果审核是不通过
                let seasonmodel = new SeasonModel();
                return seasonmodel.add({ 'rid': result.insertId, 'season': req.body.season });//将不通过的原因存起来
            } else {
                res.render('common/hint', { 'content': '审核通过', 'url': 'http://127.0.0.1:3000/check/checkUser' });
            }
        })
        .then(() => {//提示不通过
            let content = "审核不通过";
            res.render('common/hint', { 'content': content, 'url': 'http://127.0.0.1:3000/check/checkUser' });
        })
});
module.exports = router;