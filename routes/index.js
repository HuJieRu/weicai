'use strict';
let express = require('express');
let router = express.Router();
let GoodsTypeModel = require('../model/GoodsTypeModel');
let CommodityModel = require('../model/CommodityModel');
let UserMsgModel = require('../model/UserMsgModel');
let common = require('../common/function');
/* GET home page. */
router.get(['/index', '/'], function(req, res, next) {
    let commoditymodel = new CommodityModel();
    let usersmsgmodel = new UserMsgModel();
    let data = {};
    commoditymodel.recommendGoods()
        .then((result) => {
            data['recommend'] = result || [];
            data['schoolname'] = '';
            data['hot'] = '';
            if (!req.session || !req.session.uid) {//如果用户第一次进入或者用户第二次进入没有uid都是表示用户没登录
                res.render('index/index', data);
                return false;
            }
            return usersmsgmodel.getmySchool([req.session.uid]);
        })
        .then((result) => {
            if (!result || !result[0]) {//如果没有学校名称也直接渲染
                res.render('index/index', data);
                return false;
            }
            data['schoolname'] = result[0].name; 
            data['schoolid'] = result[0].id;
            return commoditymodel.schoolGoods([result[0].id]);
        })
        .then((result) => {
            data['hot'] = result;//得到学校的热门商品
            res.render('index/index', data);
        })
});
module.exports = router;