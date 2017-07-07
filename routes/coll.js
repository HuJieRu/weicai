let express = require('express');
let router = express.Router();
let CollModel = require('../model/CollModel');
let CommodityModel = require('../model/CommodityModel');
let common = require('../common/function');
// 收藏商品
router.get('/collection',(req, res, next)=>{
	let collmodel=new CollModel();
	let commodityModel=new CommodityModel();
/* 	let status=req.query.status;//得到需要改变的状态 */
	let coll=null;
	let param=[req.session.uid,req.query.id];
	/* if(req.session.uid==req.query.id){
		res.send({error_code:400,content:'不能收藏自己的商品'});
	} */
	if(req.session&&req.session.uid){
		commodityModel.getUidOfGood(req.query.id)
		.then((result)=>{
			if(result[0].uid==req.session.uid){
				res.send({error_code:400,content:'不能收藏自己的商品'});
				return;
			}else{
				return collmodel.hasColl(param);//查询该用户是否有收藏该商品
			}
		})
		.then((result)=>{
			if(result&&result.length){//如果有
				coll=0;
				return collmodel.delete(param);//删除收藏
			}else{//如果没有
				coll=1;
				return collmodel.add(param);//添加收藏
				
			}	
		})
		.then((result)=>{
			if(coll==1){   //添加收藏
				if(result&&result.insertId||result.insertId==0){
					res.send({error_code:0,content:'收藏成功'});
				}else{
					res.send({error_code:400,content:'收藏失败'});
				}
			}else{   // 取消收藏
				res.send({error_code:0,content:'取消收藏成功'});
			}
		});
	
	}else{
		res.send({error_code:400,content:'您还没有登录，不能收藏商品！'});
		return;
	}
	
	
})

// 获取用户收藏的商品
/* router.get('/collectionGoodsList',(req, res, next)=>{
	let collmodel=new CollModel();
	let p=req.query.p||0;
	collmodel.getUserColl([req.session.uid,common.cPage(p)])
	.then((result)=>{
		res.render('');
	})
}) */
module.exports = router;