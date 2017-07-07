let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');
let formidable = require('formidable');
let CommodityModel = require('../model/CommodityModel');
let UserMsgModel = require('../model/UserMsgModel');
let UserModel = require('../model/UserModel');
let CheckUserStatusModel = require('../model/CheckUserStatusModel');
let GoodsTypeModel = require('../model/GoodsTypeModel');
let ProvinceModel = require('../model/ProvinceModel');
let SchoolModel = require('../model/SchoolModel');
let ShopCartModel = require('../model/ShopCartModel');
let LogisticsModel = require('../model/LogisticsModel');
let OrdersModel = require('../model/OrdersModel');
let SearchModel = require('../model/SearchModel');
let FollowStudentModel = require('../model/FollowStudentModel');
let FollowSchoolModel = require('../model/FollowSchoolModel')
let CollModel = require('../model/CollModel');
let CommModel = require('../model/CommModel');
let TagsModel = require('../model/TagsModel');
let common = require('../common/function');
//添加商品类型
router.get('/add', function(req, res, next) {
    let goodstypemodel = new GoodsTypeModel();
    var classifyData = [{ "name": "食品饮品", "small": [{ "name": "豆干类" }, { "name": "肉类" }, { "name": "茶饮料" }, { "name": "奶茶" }, { "name": "牛奶" }, { "name": "腌制品" }, { "name": "果冻布丁" }] },
        { "name": "化妆品", "small": [{ "name": "化妆水" }, { "name": "洁面" }, { "name": "眼霜" }, { "name": "粉底" }, { "name": "BB霜" }, { "name": "面膜" }, { "name": "爽肤水" }, { "name": "香水" }, { "name": "口红/唇彩" }] },
        { "name": "鞋帽", "small": [{ "name": "皮鞋" }, { "name": "女鞋" }, { "name": "男鞋" }, { "name": "运动鞋" }, { "name": "休闲鞋" }, { "name": "拖鞋" }] },
        { "name": "女装", "small": [{ "name": "袜子" }, { "name": "睡衣" }, { "name": "裤子" }, { "name": "针织" }, { "name": "t恤" }, { "name": "外套" }, { "name": "衬衫" }, { "name": "裙子" }] },
        { "name": "图书", "small": [{ "name": "小说" }, { "name": "中国名著" }, { "name": "外国文学" }, { "name": "教科书" }, { "name": "试卷" }, { "name": "动漫" }, { "name": "科普读物" }, { "name": "期刊" }] },
        { "name": "百货", "small": [{ "name": "坐垫" }, { "name": "被单" }, { "name": "被子" }, { "name": "耳环" }, { "name": "手链" }, { "name": "影音" }, { "name": "公仔" }, { "name": "模型" }, { "name": "床垫" }] },
        { "name": "日用品", "small": [{ "name": "牙膏" }, { "name": "洗发水" }, { "name": "护发素" }, { "name": "洗手液" }, { "name": "牙刷" }, { "name": "洗衣粉/液" }, { "name": "毛巾" }, { "name": "镜子/梳子" }, { "name": "盆具" }, { "name": "牙签" }, { "name": "保鲜盒" }] },
        { "name": "数码家电", "small": [{ "name": "数码相机" }, { "name": "数码配件" }, { "name": "数码摄影机" }, { "name": "手机" }, { "name": "通讯配件" }, { "name": "剃须刀" }, { "name": "饮水机" }, { "name": "吹风筒" }, { "name": "空调" }, { "name": "洗衣机" }, { "name": "电视" }, { "name": "冰箱" }] },
        { "name": "男装", "small": [{ "name": "袜子" }, { "name": "睡衣" }, { "name": "裤子" }, { "name": "针织" }, { "name": "t恤" }, { "name": "外套" }, { "name": "衬衫" }] },
        { "name": "文化体育", "small": [{ "name": "球类" }, { "name": "健身器材" }, { "name": "学习用品" }, { "name": "运动防护" }, { "name": "文化娱乐" }] },
        { "name": "电脑", "small": [{ "name": "笔记本" }, { "name": "鼠标" }, { "name": "键盘" }, { "name": "摄像头" }, { "name": "主板" }, { "name": "内存" }, { "name": "打印机" }, { "name": "扫描仪" }, { "name": "计算器" }, { "name": "电源" }] },
    ];
    let addGoods = (data, parentid) => {
        data.forEach((value) => {//遍历数据
            goodstypemodel.add({ 'name': value.name, 'parentid': parentid })//插入一条数据
                .then((result) => {
                    if (value.small && value.small instanceof Array) {//假如改数据有儿子，且儿子是个数组，则继续添加
                        addGoods(value.small, result.insertId);
                    }
                })
        })
    }
    addGoods(classifyData, 0);
    res.send({ 'text': 123 });
})
//测试
router.get('/test', (req, res, next) => {
    let goodstypemodel = new GoodsTypeModel();
    goodstypemodel.getAll()
        .then((result) => {
            let data = common.delayering(result, 0);
            res.send(data);
        })
})
//添加学校和城市
router.get('/addSchool', (req, res, next) => {
    let schoolData = [{ "name": "广东", "school": [{ "name": "广州商学院" }, { "name": "广州大学" }, { "name": "华南农业大学" }, { "name": "广东药学院" }, { "name": "东莞理工" }, { "name": "嘉应学院" }, { "name": "广东海洋" }] },
        { "name": "北京", "school": [{ "name": "清华大学" }, { "name": "北京大学" }, { "name": "中科院" }, { "name": "外交学院" }, { "name": "中国农业大学" }, { "name": "中央财经大学" }] },
        { "name": "上海", "school": [{ "name": "复旦大学" }, { "name": "华东师大" }, { "name": "上海大学" }, { "name": "上海戏剧学院" }, { "name": "上海工程" }, { "name": "上海电力" }] },
    ];
    schoolData.forEach((value) => {//遍历第一层城市
        let provincemodel = new ProvinceModel();
        let schoolmodel = new SchoolModel();
        provincemodel.add({ name: value.name })//添加城市
            .then((result) => {
                value.school && value.school.forEach((val) => {//遍历城市下面的学校
                    schoolmodel.add({ name: val.name, parentid: resutl.insertId });//添加学校
                })
                value = null;
            })
    })

})
// 判断是否审核通过
router.get(['/addCommodity','/cart','/push_cart'], function(req, res, next) {
    let usermodel = new UserModel();
    usermodel.getUserInfoOfId([req.session.uid])
        .then((result) => {
            if (result && result[0] && result[0].mid) {
                // 审核用户信息
                let checkuserstatusmodel = new CheckUserStatusModel();
                return checkuserstatusmodel.checkReviewStatus([result[0].mid]);
            } else {
				res.render('common/hint', { 'content': '请先完善个人信息之后再操作！', 'url': 'http://127.0.0.1:3000/user/register' });
            }
        })
        .then((result) => {
            if (result && result[0] && result[0].status == 1) {//如果用户状态为1，则表示通过审核
                next();
            } else {
                res.render('common/hint', { 'content': '完善个人身份认证且待管理员审核完毕后，才可以操作！', 'url': 'http://127.0.0.1:3000/personCenter/personalCenter' });
            }
        })
       


});
// 添加商品页面
router.get('/addCommodity', function(req, res, next) {
  /*   let usermodel = new UserModel();
    usermodel.getUserInfoOfId([req.session.uid])
        .then((result) => {
            if (result && result[0] && result[0].mid) {
                // 审核用户信息
                let reviewmodel = new ReviewModel();
                return reviewmodel.checkReviewStatus([result[0].mid]);
            } else {
				res.render('common/hint', { 'content': '请先完善个人信息之后再添加商品！', 'url': 'http://127.0.0.1:3000/user/register' });
            }
        })
        .then((result) => {
            if (result && result[0] && result[0].status == 1) {//如果用户状态为1，则表示通过审核
                let goodstypemodel = new GoodsTypeModel();
                return goodstypemodel.getAll();//得到所有的商品类型
            } else {
                res.render('common/hint', { 'content': '完善个人身份认证且待管理员审核完毕后，才可以添加商品！', 'url': 'http://127.0.0.1:3000/personCenter/personalCenter' });
            }
        })
        .then((result) => {
            let data = common.delayering(result, 0);//将商品类型转换成树状结构
            res.render('commodity/addCommodity', { 'data': data });
        }) */
		
		let goodstypemodel = new GoodsTypeModel();
		goodstypemodel.getAll()//得到所有的商品类型
        .then((result) => {
            let data = common.delayering(result, 0);//将商品类型转换成树状结构
            res.render('commodity/addCommodity', { 'data': data });
        }) 


});
// 添加商品
router.post('/addCommodity', function(req, res, next) {
    let commoditymodel = new CommodityModel();

    let form = new formidable.IncomingForm();
    let images = [];
    form.on('file', function(filed, file) {
        images.push(file);
    })//每当有一对字段/文件已经接收到，便会触发该事件
    form.parse(req, (err, fields, files) => {//该方法会转换请求中所包含的表单数据，callback会包含所有字段域和文件信息
        let data = fields || {};//得到基本数据
        let urls = [];
        let url = '';
        let types = '';
        images.forEach((file) => {//遍历图片
            types = file.name.split('.');//分解图片名称
            url = '/upload/files/' + (new Date()).getTime() + parseInt(Math.random() * 100) + '.' + types[types.length - 1];//得到图片保存地址
            urls.push(url);
            fs.renameSync(file.path, path.join(__dirname, '../public' + url));//保存图片到服务器
        });
		
		if (urls.length) {
			data['image'] = urls.join(',');//用逗号分隔图片地址成为一个字符串
		}
		/* console.log('images'+images);
		console.log('urls'+urls);
		console.log('data'+data); */
        data['uid'] = req.session.uid;
        commoditymodel.add(data)//插入全部数据
            .then((result) => {
                if (result.insertId) {//有插入id返回则物品添加成功，跳到商品详情页
                    res.render('common/hint', { 'content': '物品添加成功！', 'url': 'http://127.0.0.1:3000/commodity/commoditySpecific?id=' + result.insertId });
                } else {
					res.render('common/hint', { 'content': '物品添加失败，请重新添加！', 'url': 'http://127.0.0.1:3000/commodity/addCommodity' });
                   
                }

            })
    })

});
// 编辑商品信息查看
router.get('/editCommodity', function(req, res, next) {
    let commoditymodel = new CommodityModel();
    let goodstypemodel = new GoodsTypeModel();
    let tagsmodel = new TagsModel();
    let id = req.query.id;
    let data = {};
    commoditymodel.info(id)//根据gid得到商品信息
        .then((result) => {
            data['info'] = {};
            if (result && result.length) {
                data['info'] = result[0];
            }
            return goodstypemodel.getAll();//得到所有的商品类型
        })
        .then((result) => {
            data['types'] = common.delayering(result, 0);
            return tagsmodel.getAll();//得到所有的标签
        })
        .then((result) => {
            data['tags'] = result || [];
            res.render('commodity/editCommodity', data);//渲染
        })
});
// 编辑商品信息保存
router.post('/editCommodity', function(req, res, next) {
    let commoditymodel = new CommodityModel();
    let form = new formidable.IncomingForm();
    let images = [];
    form.on('file', function(filed, file) {
        images.push(file);
    })//每当有一对字段/文件已经接收到，便会触发该事件
    form.parse(req, (err, fields, files) => {//该方法会转换请求中所包含的表单数据，callback会包含所有字段域和文件信息
        let data = fields || {};//得到基本数据
        let id = data['id'];
        delete data['id'];
        let urls = [];
        let url = '';
        let types = '';
        images.forEach((file) => {//遍历图片
            types = file.name.split('.');//分解图片名称
            url = '/upload/files/' + (new Date()).getTime() + parseInt(Math.random() * 100) + '.' + types[types.length - 1];//得到图片保存地址
            urls.push(url);
            fs.renameSync(file.path, path.join(__dirname, '../public' + url));//保存图片到服务器
        })
        if (urls.length) {
            data['image'] = urls.join(',');//用逗号分隔图片地址成为一个字符串
        }
        commoditymodel.update(data, id)//更新商品信息
            .then((result) => {
                res.render('common/hint', { 'content': '编辑成功', 'url': 'http://127.0.0.1:3000/commodity/commodityInfo?id=' + id });
            })
    })

});
// 商品信息详情
router.get('/commodityInfo', function(req, res, next) {
    let commoditymodel = new CommodityModel();
    let id = req.query.id;
    let data = {};
    commoditymodel.info(id)//根据gid得到商品信息
        .then((result) => {
            if (result && result.length) {
                data['info'] = result[0];
            }
            res.render('commodity/commodityInfo', data);
        });
});

// 结算页面
router.get('/indent', function(req, res, next) {
    let shopCartmodel = new ShopCartModel();
    let logisticsmodel = new LogisticsModel();
    let id = req.query.sid;//此id是购物车表里面的id
    let data = {};
    if (!req.query.sid) {
        res.redirect('/commodity/cart');
    }
    logisticsmodel.getUserLogistics(req.session.uid)//通过uid查找5条物流地址
        .then((result) => {
            data['logistics'] = result || [];
            return shopCartmodel.getShopCart([id]);//通过id得到购物车数据
        })
        .then((result) => {
            let total = 0;
            result.forEach((value) => {
                total += value.total;
            })
            data['data'] = result;
            data['allTotal'] = total;//得到所有商品的总价格
            res.render('commodity/indent', data);
        })

});
//添加物流地址
router.post('/addLogistics', (req, res, next) => {
        let logisticsmodel = new LogisticsModel();
        let ids = req.body.id;//还是购物车里的id
        let data = { uid: req.session.uid, recipient: req.body.recipient, phone: req.body.phone, postcode: req.body.postcode, province: req.body.province, city: req.body.city, area: req.body.area, address: req.body.address };
        logisticsmodel.add(data)//存储物流信息
            .then(() => {
                res.redirect('/commodity/indent' + getParam(ids));
            })
    })
	//得到参数
function getParam(ids){
	//把购物车的id传回去，因为要重定向页面
	let param = '?';
	/* console.log(ids); */
	ids = ids.split(',');

	ids.forEach((val) => {
		param += encodeURI('sid[]=' + val + '&');//把字符串作为 URI 进行编码
	})
	/* console.log(param); */
	param = param.substring(0, param.length - 1);
	return param;
   /*  console.log(param); */
}
//删除物流地址
router.get('/deleteLogistic',function(req, res, next){
	let logisticsmodel = new LogisticsModel();
	let ids = req.query.sid;//还是购物车里的id
	/* console.log(req.query.sid); */
	logisticsmodel.update([{ status: 0 }, req.query.id])//删除物流地址
	.then((result) => {
         if(result){
			res.render('common/hint', { 'content': '删除成功！', 'url': 'http://127.0.0.1:3000/commodity/indent'+getParam(ids) }); 
		 }else{
			res.render('common/hint', { 'content': '删除失败！', 'url': 'http://127.0.0.1:3000/commodity/indent'+getParam(ids) });  
		 }
    });
});
    // 提交订单
router.get('/pay', function(req, res, next) {
    let commoditymodel = new CommodityModel();
    let shopCartmodel = new ShopCartModel();
    let orderssmodel = new OrdersModel();
    let goods = req.query.goods || [];
    let lid = req.query.lid || 0;
    let param = [];
 	let hasFailure=false; 
	let count=0
	if(lid!=0){
		goods.forEach((val,index) => {//遍历所有商品
		
			commoditymodel.getGoodsNumber(val.id)//得到商品库存
			.then((result)=>{
				console.log(result[0].number);
				if(val.number<=result[0].number){//如果商品数量小于库存才可以下单
					 commoditymodel.updateNumber([-(val.number), val.id]);//减少商品库存
					/* param.push({ gid: val.id, lid: lid, number: val.number, uid: req.session.uid });//得到数组参数 */
					 orderssmodel.add({ gid: val.id, lid: lid, number: val.number, uid: req.session.uid })//添加一条订单记录
					.then((result) => {
							if(result.insertId){
								shopCartmodel.delete(req.query.sid[index]);//根据sid删除存在购物车的商品
							}
						})
				}else{
					hasFailure=true;
					shopCartmodel.delete(req.query.sid[index]);//根据sid删除存在购物车的商品
					
				}
				
				if(count==goods.length-1){//如果是最后一个商品且之前有失败的订单，则提示
	
					if(hasFailure==true){
						res.render('common/hint', { 'content': '部分订单已经超过库存，无法下单！', 'url': 'http://127.0.0.1:3000/personCenter/myIndent'});
					}else{
						res.render('common/hint', { 'content': '下单成功！', 'url': 'http://127.0.0.1:3000/personCenter/myIndent'});
					}
		

				}
				
				count++;
			})
       
		})
	
	}else{
		res.render('common/hint', { 'content': '很抱歉，您还没有物流地址，不能下单！', 'url': 'http://127.0.0.1:3000/personCenter/myIndent'}); 
		return;
	}
   
});

// 购物车
router.get('/cart', function(req, res, next) {
    let shopCartmodel = new ShopCartModel();
    shopCartmodel.getMyShopCart([req.session.uid])//根据用户uid得到用户购物车数据
        .then((result) => {
            res.render('commodity/cart', { data: result });
        })

});
// 删除购物车某条商品
router.get('/delete_shop_cart', function(req, res, next) {
    let shopCartmodel = new ShopCartModel();
    let id = req.query.id || 0;
    shopCartmodel.delete([req.query.id])//根据购物车id删除购物车某条商品
        .then((result) => {
            res.redirect('/commodity/cart');
        })

});
// 清空购物车
router.get('/empty_shop_cart', function(req, res, next) {
    let shopCartmodel = new ShopCartModel();
    shopCartmodel.empty([req.session.uid])// 根据用户uid清空购物车
        .then((result) => {
            res.redirect('/commodity/cart');
        })

});
// 加入购物车
router.post('/push_cart', function(req, res, next) {
	let commoditymodel = new CommodityModel();
	let shopCartmodel = new ShopCartModel();
	let uid=req.session.uid;
	commoditymodel.getUidOfGood(req.body.id)//根据商品id得到店主id
	.then((result)=>{
	
		if(result&&result[0].uid!=uid)//如果店主id不是用户本人才能购买
		{
			return  shopCartmodel.getShop([req.body.id,uid]);//根据商品id在购物车表中查找商品，有则代表购物车已经存在该商品
		}else{
			res.render('common/hint', { 'content': '不能购买自己发布的商品！', 'url': 'http://127.0.0.1:3000/' });
		}
	})
    .then((result) => {
            if (result && result[0]) {
                return shopCartmodel.update([req.body.number,req.body.id,uid]);//更新商品在购物车中的数量
            } else {
                return shopCartmodel.add({ uid: uid, gid: req.body.id, number: req.body.number })//插入一件新商品
            }
        })
        .then((result) => {
            res.redirect('/commodity/cart');
        })
});

// 商品列表
/* router.get('/commodityList', function(req, res, next) {
    let commoditymodel = new CommodityModel();
    let data = {};
    let p = req.query.p || 0;
    commoditymodel.list((p * 15) + ',15')//
        .then((result) => {
            data['goods'] = result;
            res.render('commodity/commodityList', data);
        })

}); */
// 商品详情
router.get('/commoditySpecific', function(req, res, next) {
    let commoditymodel = new CommodityModel();
    let followstudentmodel = new FollowStudentModel();
    let followschoolmodel = new FollowSchoolModel();
    let commmodel = new CommModel();
    let collmodel = new CollModel();
    let id = req.query.id;
    let p = req.query.p || 0;
    let num = 0;
    let data = {};
    commoditymodel.getGoodsInfo([id])//根据商品id得到该商品的所有信息
        .then((result) => {
            if (!result[0]) {//如果没有则说明商品不存在
                res.render('common/hint', { 'content': '该商品不存在', 'url': 'http://127.0.0.1:3000' });
				return;
            }
            data['info'] = result[0];
            return collmodel.hasColl([req.session.uid, id]);//通过uid和商品id查找收藏的商品
        })
        .then((result) => {
            if (result && result.length) {//如果存在结果则表示用户已经收藏该商品，状态为1
                data['info']['coll'] = 1;
            } else {
                data['info']['coll'] = 0;
            }
            return followstudentmodel.hasFollow([req.session.uid, data['info']['uid']]);//通过uid和同学uid查找是否有关注该学生
        })
        .then((result) => {
            if (result && result.length) {//如果存在则表示关注了该同学，状态为1
                data['info']['followstudent'] = 1;
            } else {
                data['info']['followstudent'] = 0;
            }
            return followschoolmodel.hasFollow([req.session.uid, data['info']['sid']]);//通过uid和学校sid查找是否有关注该学校
        })
        .then((result) => {
            if (result && result.length) {//如果存在则表示关注了该学校，状态为1
                data['info']['followschool'] = 1;
            } else {
                data['info']['followschool'] = 0;
            }
            return commmodel.countGoodsComm(id);//通过gid查找商品的评论条数
        })
        .then((result) => {
			//分页暂时不做
            let page = result && result[0] ? result[0].number : 0;//总评论数
            num = page;
            /* data['page'] = common.getPage(page);//总页数 */
            return commmodel.getGoodsComm([id])//得到30条评论
        })
        .then((result) => {
            data['comm'] = result || [];
            return commmodel.getPraiseNumber([1, id]);//得到好评的评论数
        })
        .then((result) => {
            data['good'] = parseInt((result && result.length ? result[0].number/num  : 0)*100);//得到好评率
            return commmodel.getPraiseNumber([2, id]);//得到中评的评论数
        })
        .then((result) => {
            data['medium'] =parseInt((result && result.length ? result[0].number/num  : 0)*100) //得到中评率
            return commmodel.getPraiseNumber([3, id]);//得到差评的评论数
        })
        .then((result) => {
            data['bad'] = parseInt((result && result.length ? result[0].number/num : 0)*100);//得到差评率
            res.render('commodity/commoditySpecific', data);//渲染数据
        })
});


// 搜索列表页
router.get('/search', (req, res, next) => {
        let commoditymodel = new CommodityModel();
        let searchmodel = new SearchModel();
        let data = {};
		let tag=req.query.tag||0;//判断是什么排名，0默认，1价格，2销量
		let order=(tag==0?"sales DESC,g.price ASC":(tag==1?"g.price ASC":"sales DESC"));
        let content = '%' + (req.query.key||'') + '%';//得到搜索的内容，假如没有默认是空
        let p = req.query.p || 0;//得到页数
        commoditymodel.search([content, content, content, content, common.cPage(p)],order)//根据关键字，模糊匹配，得到一定数量的商品
            .then((result) => {
                data['goods'] = result;//得到需要显示的商品
				if(req.session.uid&&req.query.key){//用户有uid并且关键字不为空时才能添加关键词
					 searchmodel.add({ uid: req.session.uid, keyword: req.query.key });
				}
               
                return commoditymodel.countSearch([content, content, content, content]);//得到搜索出的商品总数量
            })
            .then((result) => {
                let number = result && result[0] ? result[0].number : 0;//默认为0
                data['page'] = common.getPage(number);//得到总页数
                res.render('commodity/commodityList', data);
            })
    })
    // 推荐列表页
router.get('/recommendList', (req, res, next) => {
        let commoditymodel = new CommodityModel();
		let tag=req.query.tag||0;//判断是什么排名，0默认，1价格，2销量
		let order=(tag==0?"sales DESC,g.price ASC":(tag==1?"g.price ASC":"sales DESC"));
        let data = {};
        let p = req.query.p || 0;//得到页数
        commoditymodel.recommendGoods(common.cPage(p),order)//热门商品推荐
            .then((result) => {
                data['goods'] = result;
                return commoditymodel.countRecommendGoods();//统计推荐的商品个数
            })
            .then((result) => {
                let page = result && result[0] ? result[0].number : 0;//默认为0
                data['page'] = common.getPage(page);//得到总页数
                res.render('commodity/commodityList', data);
            })
    })
    // 分类商品列表页
router.get('/typeGoodsList', (req, res, next) => {
        let goodstypemodel = new GoodsTypeModel();
        let commoditymodel = new CommodityModel();
        let data = {};
		let tag=req.query.tag||0;//判断是什么排名，0默认，1价格，2销量
		let order=(tag==0?"sales DESC,g.price ASC":(tag==1?"g.price ASC":"sales DESC"));
        let typeid = req.query.key;
        let p = req.query.p || 0;//得到页数
        goodstypemodel.getAllChildType(typeid, (typeids) => {//得到所有的孩子类型
            typeids.push(typeid);
            commoditymodel.typeGoods(typeids, common.cPage(p),order)//得到某类商品，匹配多个类型
                .then((result) => {
                    data['goods'] = result;
                    return commoditymodel.countTypeGoods(typeids);//得到某类商品总数，匹配多个类型
                })
                .then((result) => {
                    let page = result && result[0] ? result[0].number : 0;//默认为0
                    data['page'] = common.getPage(page);//得到某类商品总页数
                    res.render('commodity/commodityList', data);
                })

        })

    })
    // 学校商品列表页
router.get('/schoolGoodsList', (req, res, next) => {
        let commoditymodel = new CommodityModel();
		let usersmsgmodel = new UserMsgModel();
        let data = {};
		let tag=req.query.tag||0;//判断是什么排名，0默认，1价格，2销量
		let order=(tag==0?"sales DESC,g.price ASC":(tag==1?"g.price ASC":"sales DESC"));
		let sid = req.query.key;
        let p = req.query.p || 0;//得到页数
		commoditymodel.schoolGoods( sid, common.cPage(p),order)//得到学校商品
            .then((result) => {
                data['goods'] = result;
                return commoditymodel.countMySchoolGoods(sid);//得到学校商品总数
            })
            .then((result) => {
                let page = result && result[0] ? result[0].number : 0;//默认为0
                data['page'] = common.getPage(page);//得到学校商品总页数
                res.render('commodity/commodityList', data);
            })
    })
    // 学生商品列表页
router.get('/studentGoodsList', (req, res, next) => {
    let commoditymodel = new CommodityModel();
    let data = {};
	let tag=req.query.tag||0;//判断是什么排名，0默认，1价格，2销量
	let order=(tag==0?"sales DESC,g.price ASC":(tag==1?"g.price ASC":"sales DESC"));
    let uid = req.query.key;
    let p = req.query.p || 0;
    commoditymodel.myGoods(uid, common.cPage(p),order)//得到学生商品
        .then((result) => {
            data['goods'] = result;
            return commoditymodel.countMyGoods(uid);//得到学生商品总数
        })
        .then((result) => {
/* 				console.log(result); */
            let page = result && result[0] ? result[0].number : 0;//默认为0
            data['page'] = common.getPage(page);//得到学生商品总页数
            res.render('commodity/commodityList', data);
        })
})

module.exports = router;