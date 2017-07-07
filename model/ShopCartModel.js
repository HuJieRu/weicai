let Model = require('../vendor/model');
class ShopCartModel extends Model{
	add(param){//插入一件新商品
		return this.query('insert into shop_cart set ?',param);
	}
	getMyShopCart(param){//根据用户uid得到用户购物车数据
		return this.query('select sc.id sid,g.id,g.uid,g.typeid,g.name,g.originalprice,g.price,g.image,g.notice,g.caption,sum(sc.number) number,(sum(sc.number)*g.price) total from shop_cart sc join goods g on sc.gid=g.id where sc.uid=? group by sc.gid,g.number order by g.price',param);
	}
	getShopCart(param){//结算页面的购物车数据
		return this.query('select sc.id sid,g.id,g.uid,g.typeid,g.name,g.originalprice,g.price,g.image,g.notice,g.caption,sum(sc.number) number,(sum(sc.number)*g.price) total from shop_cart sc join goods g on sc.gid=g.id where sc.id in (?) group by sc.gid,g.number order by g.price',param);
	}
	delete(param){//根据购物车id删除购物车某条商品
		return this.query('delete from shop_cart where id=?',param);
	}
	deleteShopCart(param){//根据sid数组删除存在购物车的商品
		return this.query('delete from shop_cart where id in (?)',param);
	}
	empty(param){// 根据用户uid清空购物车
		return this.query('delete from shop_cart where uid=?',param);
	}
	getShop(param){//根据商品id在购物车表中查找商品
		return this.query('select id from shop_cart where gid=? and uid=?',param);
	}
	update(param){//更新商品在购物车中的数量
		return this.query('update shop_cart set number=number+? where gid=? and uid=?',param);
	}
}
module.exports=ShopCartModel;