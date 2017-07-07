let Model = require('../vendor/model');
class OrdersModel extends Model{
	add(param){//添加一条订单记录
		return this.query('insert into orders set ?,create_time=now()',param);
	}
	getUserIndent(param,page){////根据uid得到某个用户的订单
		return this.query('select g.*,o.*,o.id oid from orders o join goods g on g.id=o.gid where o.uid=? order by o.create_time DESC limit ?',[param,page]);
	}
	getIndentInfo(param){//根据订单id得到某个订单
		return this.query('select g.*,o.*,o.id oid from orders o join goods g on g.id=o.gid where o.id=?',[param]);
	}
	countUserIndent(param){//根据uid得到某个用户购买商品的订单总数量（订单的uid是购买的主人）
		return this.query('select count(uid) number from orders where uid=?',param);
	}
	getStoreIndent(payment_status,param,page){//（例如参数：0，店主uid，一页需要显示多少条）按照时间排序，根据订单状态得到限定数量的订单
		return this.query('select l.*,o.id oid,o.number,o.payment_status,g.name from orders o join goods g on g.id=o.gid left join logistics l on l.id=o.lid where o.payment_status in(?) and g.uid=?  order by o.create_time DESC limit ?',[payment_status,param,page]);
	}
	countStoreIndent(payment_status,param){//根据uid和订单状态得到店主订单数、（订单的gid和商品id是一样的，商品uid才是店主）
		return this.query('select count(g.uid) number from orders o join goods g on g.id=o.gid where o.payment_status in(?) and g.uid=?',[payment_status,param]);
	}
	update(param){//根据订单id改变订单状态
		return this.query('update orders set ? where id=?',param);
	}
}
module.exports=OrdersModel;