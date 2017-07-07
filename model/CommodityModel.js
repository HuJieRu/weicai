let Model = require('../vendor/model');

class CommodityModel extends Model{
	info(param,field='*'){//根据gid得到商品信息
		return this.query('select g.*,gt.parentid,gt.name typename,t.name tagname from goods g join goods_type gt on gt.id=g.typeid join tags t on t.id=g.tag  where g.id=?',param);
	}
	add(param){//添加商品
		return this.query("insert into goods set ?,create_time=now(),update_time=now()",param);
	}
	del(id){//删除商品
		return this.query('delete from goods where id=?',id);
	}
	list(page){//根据创建时间得到一定数量的商品
		return this.query('select * from goods order by create_time DESC  limit ?',page);
	}
	update(data,id){//更新商品信息
		return this.query('update goods set ?,update_time=now() where id=?',[data,id]);
	}
	getUidOfGood(param){//根据商品id得到uid
		return this.query('SELECT uid FROM `goods` WHERE id=?',param);		
	}
	myGoods(param,page=[0,5],order='sales DESC,g.price ASC'){//根据uid得到发布的商品，默认是查前5条
		return this.query('select g.*,um.nickname username,um.avatar,ifnull(sum(o.number),0) sales,s.name schoolname from goods g left join users u on u.id=g.uid left join users_msg um on um.id=u.mid left join school s on s.id=um.school left join orders o on o.gid=g.id  where g.uid=? group by g.id order by '+order+ ' limit ?',[param,page]);
	}
	countMyGoods(param){//根据uid得到发布的商品总数量
		return this.query('select count(g.id) number from goods g  where g.uid=?',param);
	}
	typeGoods(typeid,page=[0,5],order='sales DESC,g.price ASC'){//得到某类商品，可以匹配多个类型
		return this.query('select g.*,um.nickname username,s.name schoolname,ifnull(sum(o.number),0) sales from goods g left  join users u on u.id =g.uid left join users_msg um on um.id=u.mid left  join school s on um.school=s.id left join orders o on o.gid=g.id  where g.typeid in(?) group by g.id order by '+order+ ' limit ?',[typeid,page]);
	}
	countTypeGoods(typeids){ //得到某类商品总数，可以匹配多个类型
		return this.query('select count(*) number from goods g left  join users u on u.id =g.uid left join users_msg um on um.id=u.mid left  join school s on um.school=s.id where g.typeid in(?)',[typeids]);
	}
	recommendGoods(page=[0,5],order='sales DESC,g.price ASC'){//热门商品推荐，默认是查前5条
		return this.query('select g.*,um.nickname username,s.name schoolname,ifnull(sum(o.number),0) sales from goods g left  join users u on u.id =g.uid left join users_msg um on um.id=u.mid left join school s on um.school=s.id left join orders o on o.gid=g.id group by g.id order by '+order+ ' limit ?',[page]);
	}
	countRecommendGoods(){//统计推荐的商品个数
		return this.query('select count(g.id) number from goods g left  join users u on u.id =g.uid left join users_msg um on um.id=u.mid left  join school s on um.school=s.id');
	}	
	schoolGoods(sid,page=[0,5],order='sales DESC,g.price ASC'){//根据学校id得到学校热门商品推荐，默认是查前5条（热门判定是订单数）
		return this.query('select g.*,um.nickname username,s.name schoolname,s.id sid,ifnull(sum(o.number),0) sales from goods g left  join users u on u.id =g.uid left  join users_msg um on um.id=u.mid left  join school s on um.school=s.id left join orders o on o.gid=g.id   where s.id=? group by g.id order by '+order+ ' limit ?',[sid,page]);
	}
	countMySchoolGoods(param){//得到学校商品总数
		return this.query('select count(g.id) number from goods g left  join users u on u.id =g.uid left  join users_msg um on um.id=u.mid left  join school s on um.school=s.id where s.id=?',param);
	}
	getGoodsInfo(param){//根据商品id得到该商品的所有信息
		return this.query('select g.*,ifnull(sum(o.number),0) sales,um.nickname username,s.id sid,s.name schoolname,t.name tagname from goods g  left join tags t on t.id=g.tag left join users u on u.id =g.uid left join users_msg um on um.id=u.mid left join school s on um.school=s.id left join orders o on o.gid=g.id where g.id=?',param);
	}
	search(param,order='sales DESC,g.price ASC'){//根据关键字，模糊匹配，得到一定数量的商品
		return this.query("select g.*,um.nickname username,s.name schoolname,t.name tagname ,ifnull(sum(o.number),0) sales from goods g left join tags t on t.id=g.tag left join users u on u.id =g.uid left join users_msg um on um.id=u.mid left join school s on um.school=s.id left join orders o on o.gid=g.id  where g.name like ? or s.name like  ? or um.nickname like  ? or t.name like  ? group by g.id order by "+order+ " limit ?",param);
	}
	countSearch(param){//得到搜索出的商品数量
		return this.query("select count(g.id) number from goods g left join tags t on t.id=g.tag left join users u on u.id =g.uid left join users_msg um on um.id=u.mid left join school s on um.school=s.id where g.name like ? or s.name like ? or um.nickname like ? or t.name like ?",param);
	}
	updateNumber(param){//改变商品库存
		return this.query('update goods set number=number+? where id=?',param);
	}
	getGoodsNumber(param){//得到商品库存
		return this.query('select number from goods where id=?',param);
	} 
}
module.exports=CommodityModel;