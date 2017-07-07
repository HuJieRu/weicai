var express = require('express');
var router = express.Router();
let UserModel = require('../model/UserModel');
let CommodityModel = require('../model/CommodityModel');
let GoodsTypeModel = require('../model/GoodsTypeModel');
let OrdersModel = require('../model/OrdersModel');
let CollModel = require('../model/CollModel');
let CommModel = require('../model/CommModel');
let FollowStudentModel = require('../model/FollowStudentModel');
let FollowSchoolModel = require('../model/FollowSchoolModel');
let common = require('../common/function');
//收藏商品列表
router.get('/personalCenter', function(req, res, next) {
    let goodstypemodel = new GoodsTypeModel();
    let collmodel = new CollModel();
    let data = {};
    let p = req.query.p || 0;
    let param = req.session.uid;
    collmodel.countUserColl(param)//查找用户收藏的商品
        .then((result) => {
            let number = result && result[0] ? result[0].number : 0;//有商品则得到收藏商品的数目
            data['page'] = common.getPage(number);//通过数目得到页数
            return collmodel.getUserColl(param, common.cPage(p));//通过uid和数目得到收藏的商品
        })
        .then((result) => {
            data['goods'] = result;//得到商品数组
            res.render('personCenter/personalCenter', data);
        })
});
//评价商品get
router.get('/reviews', function(req, res, next) {
    let ordersmodel = new OrdersModel();
    ordersmodel.getIndentInfo(req.query.id)//根据订单id得到订单内容
        .then((result) => {
            let data = {};
            if (result && result[0]) {
                data = result[0];
            }

            res.render('personCenter/reviews', { data: data });
        })

});
//评价商品post
router.post('/reviews', function(req, res, next) {
    let commmodel = new CommModel();
    let ordersmodel = new OrdersModel();
 /*    let param = req.body; */
    commmodel.hasComm(req.body.id)//根据订单id查找相应评价
        .then((result) => {
            if (result && result.length) {//有说明已经评价了
                res.render('common/hint', { 'content': '已评价', 'url': 'http://127.0.0.1:3000/personCenter/myIndent' });
            } else {//没有则添加
                return commmodel.add({ uid: req.session.uid, oid: req.body.id, level: req.body.level, content: req.body.content });
            }
        })
        .then((result) => {
            if (result && result.insertId) {//如果评价成功
                return ordersmodel.update([{ payment_status: 3 }, req.body.id]);//将订单的状态改成用户已经评价

            } else {
                res.render('common/hint', { 'content': '评价失效！', 'url': 'http://127.0.0.1:3000/personCenter/myIndent' });
            }
        })
        .then(() => {
            res.render('common/hint', { 'content': '评价成功！', 'url': 'http://127.0.0.1:3000/personCenter/myIndent' });
        })

});
//我发布的商品显示
router.get('/publish', function(req, res, next) {
    let commoditymodel = new CommodityModel();
    let goodstypemodel = new GoodsTypeModel();
    let data = {};
    let p = req.query.p || 0;
    commoditymodel.countMyGoods([req.session.uid])//根据uid得到发布的商品总数量
        .then((result) => {
            let number = result && result[0] ? result[0].number : 0;
            data['page'] = common.getPage(number);//总页数
            return commoditymodel.myGoods(req.session.uid, common.cPage(p));//根据uid得到发布的商品，5条
        })
        .then((result) => {
            data['goods'] = result;//存储发布的商品
            res.render('personCenter/publish', data);
        });
});
//删除发布的商品
router.get('/deletePublish',function(req, res, next){
	let commoditymodel = new CommodityModel();
	commoditymodel.del(req.query.id)
	.then((result) => {
         if(result){
			res.render('common/hint', { 'content': '删除成功！', 'url': 'http://127.0.0.1:3000/personCenter/publish' }); 
		 }else{
			res.render('common/hint', { 'content': '删除失败！', 'url': 'http://127.0.0.1:3000/personCenter/publish' });  
		 }
    });
});
//删除收藏的商品
router.get('/deleteColl',function(req, res, next){
	let collmodel=new CollModel();
	collmodel.delete([req.session.uid,req.query.id])
	.then((result) => {
         if(result){
			res.render('common/hint', { 'content': '删除成功！', 'url': 'http://127.0.0.1:3000/personCenter/personalCenter' }); 
		 }else{
			res.render('common/hint', { 'content': '删除失败！', 'url': 'http://127.0.0.1:3000/personCenter/personalCenter' });  
		 }
    });
});
//删除关注的同学
router.get('/deleteStudent',function(req, res, next){
	let followstudentmodel = new FollowStudentModel();
	followstudentmodel.deleteStudent([req.session.uid,req.query.id])
	.then((result) => {
         if(result){
			res.render('common/hint', { 'content': '删除成功！', 'url': 'http://127.0.0.1:3000/personCenter/attentionPerson' }); 
		 }else{
			res.render('common/hint', { 'content': '删除失败！', 'url': 'http://127.0.0.1:3000/personCenter/attentionPerson' });  
		 }
    });
});
//删除关注的学校
router.get('/deleteSchool',function(req, res, next){
	let followschoolmodel = new FollowSchoolModel();
	followschoolmodel.deleteSchool([req.session.uid,req.query.id])
	.then((result) => {
         if(result){
			res.render('common/hint', { 'content': '删除成功！', 'url': 'http://127.0.0.1:3000/personCenter/attentionSchool' }); 
		 }else{
			res.render('common/hint', { 'content': '删除失败！', 'url': 'http://127.0.0.1:3000/personCenter/attentionSchool' });  
		 }
    });
});
/* router.get('/smallRegister', function(req, res, next) {
    res.render('personCenter/smallRegister', { title: 'Express' });
});
router.get('/specific', function(req, res, next) {
    res.render('personCenter/specific', { title: 'Express' });
}); */
// 我的订单显示
router.get('/myIndent', function(req, res, next) {
    let ordersmodel = new OrdersModel();
    let data = {};
    let param = req.session.uid;
    let p = req.query.p || 0;
    ordersmodel.countUserIndent(param)//根据uid得到订单总数量
        .then((result) => {
            let page = result && result[0] ? result[0].number : 0;
            data['page'] = common.getPage(page);//总页数
            return ordersmodel.getUserIndent(param, common.cPage(p));//根据uid得到订单，6条
        })
        .then((result) => {
            data['indent'] = result;//存储订单
            res.render('personCenter/myIndent', data);
        })
});
// 关注的学校列表
router.get('/attentionSchool', (req, res, next) => {
        let followschoolmodel = new FollowSchoolModel();
        let commoditymodel = new CommodityModel();
        let data = {};
        let param = req.session.uid;
        let p = req.query.p || 0;
        followschoolmodel.countMyFollow(param)//得到关注学校的数量
            .then((result) => {
				/* console.log("number"+result[0].number); */
                let page = result && result[0] ? result[0].number : 0;
                data['page'] = common.getPage(page);//总页数
                return followschoolmodel.getSidOfSchool(param, common.cPage(p));//查找需要数量的学校
            })
            .then((result) => {
				
                data['data'] = [];
                if (!result || !result.length) {//没有数据直接渲染空数组
                    res.render('personCenter/attentionSchool', data);
					return;
                }
				let count=0;
                result.forEach((val, index) => {//遍历学校
                    commoditymodel.schoolGoods(val.sid, [0, 4]).then((goods) => {//得到学校热门前4条商品
						/* console.log("goods"+JSON.stringify(goods)); */
                        if (goods && goods.length) {//如果有商品
                            data['data'][index]={//把每个商品都装进去
                                title: goods[0]['schoolname'],
                                sid: goods[0]['sid'],
                                goods: goods,
                            };
                        }
                        if (count == result.length - 1) {//当遍历完最后一个学校之后，则渲染数据
							/* console.log("data"+JSON.stringify(data)); */
							count=null;
                            res.render('personCenter/attentionSchool', data);
                        }
						count++;
                       /*  index = null;//因为闭包的原因需要清空内部函数引用外部函数的值 */
                    })
                })
            })
    })
 // 关注的学生列表
router.get('/attentionPerson', (req, res, next) => {
        let followstudentmodel = new FollowStudentModel();
        let commoditymodel = new CommodityModel();
        let data = {};
        let param = [req.session.uid];
        let p = req.query.p || 0;
        followstudentmodel.countMyFollow(param)//得到关注同学的数量
            .then((result) => {
                let page = result && result[0] ? result[0].number : 0;
                data['page'] = common.getPage(page);//总页数
                return followstudentmodel.getUidOfUser(param, common.cPage(p));//通过用户uid得到一定数量的关注的学生的数据
            })
            .then((result) => {
                data['data'] = [];
                if (!result || !result.length) {//没有数据直接渲染空数组
                    res.render('personCenter/attentionPerson', data);
					return;
                }
				let count=0;
				/* console.log('result'+result); */
                result.forEach((val, index) => {
				/* 	console.log('val'+JSON.stringify(val)); */
                    commoditymodel.myGoods(val.to_uid, [0, 4])
					.then((goods) => {//得到同学热门前4条商品
                        if (goods && goods.length) {//如果有商品
                            data['data'][index]={//把每个商品都装进去
                                title: goods[0]['username'],
                                avatar: goods[0]['avatar'],
                                uid: goods[0]['uid'],
                                schoolname: goods[0]['schoolname'],
                                goods: goods,
                            };
                        }
                        if (count == result.length - 1) {//当遍历完最后一个同学只有，则渲染数据
							/* console.log('data'+JSON.stringify(data['data'])); */
							count=null;
                            res.render('personCenter/attentionPerson', data);
                        }
						count++;
                        index = null; 
                    })
                })
            })
    })

// 用户签收货物
router.get('/sign', function(req, res, next) {
    let ordersmodel = new OrdersModel();
    let id = req.query.id;
    ordersmodel.update([{ 'payment_status': 2 }, id])//将订单的状态改成交易完成。
        .then((result) => {
            res.render('common/hint', { 'content': '交易完成！', 'url': 'http://127.0.0.1:3000/personCenter/myIndent' });
        })
});
// 待发货商品列表
router.get('/sendCommodity', function(req, res, next) {
    let ordersmodel = new OrdersModel();
    let id = req.query.id;
    let data = {};
    let p = req.query.p || 0;
    ordersmodel.countStoreIndent([0],req.session.uid)//得到待发货的店家订单总数
        .then((result) => {
            let page = result && result[0] ? result[0].number : 0;
            data['page'] = common.getPage(page);//总页数
            return ordersmodel.getStoreIndent([0], req.session.uid, common.cPage(p));//选出待发货的订单，限制条数
        })
        .then((result) => {
            data['goods'] = result;//存储
            res.render('personCenter/sendCommodity', data);
        })
});
// 发货
router.get('/send', function(req, res, next) {
    let ordersmodel = new OrdersModel();
    let id = req.query.id;
    ordersmodel.update([{ 'payment_status': 1 }, id])//将订单的状态改成已经发货。
        .then((result) => {
            res.render('common/hint', { 'content': '发货成功！', 'url': 'http://127.0.0.1:3000/personCenter/sendCommodity' });
        })
});

// 查看已发货的商品
router.get('/lookSendCommodityResult', function(req, res, next) {
    let ordersmodel = new OrdersModel();
   /*  let id = req.query.id; */
    let data = {};
    let p = req.query.p || 0;
    ordersmodel.countStoreIndent([1,2,3], req.session.uid)//得到已发货的店家订单总数
        .then((result) => {
            let page = result && result[0] ? result[0].number : 0;
            data['page'] = common.getPage(page);//总页数
            return ordersmodel.getStoreIndent([1,2,3], req.session.uid, common.cPage(p));//选出已发货的订单，限制条数
        })
        .then((result) => {
            data['goods'] = result;//存储
            res.render('personCenter/lookSendCommodityResult', data);
        })
});
module.exports = router;