let Model = require('../vendor/model');
class CollModel extends Model{
	add(param){//给评价表插入一条数据
		return this.query('insert into comm set ?,create_time=now()',param);
	}
	hasComm(param){//根据订单id得到订单评价
		return this.query('select * from comm where oid=?',param);
	}
	getGoodsComm(param){//得到30条评论
		return this.query("select c.*, date_format(c.create_time,'%Y-%m-%d %H:%i') as create_time , um.nickname,um.avatar from goods g join orders o on g.id=o.gid join comm c on c.oid=o.id join users u on u.id=c.uid join users_msg um on um.id=u.mid  where g.id=? order by c.create_time DESC limit 0,30",param);
	}
	getPraiseNumber(param){//根据评论等级得到评论数量
		return this.query('select count(o.gid) number from comm c join orders o on c.oid=o.id  where c.level=? and o.gid=?',param);
	}
	countGoodsComm(param){//通过gid查找商品的评论条数
		return this.query('select count(oid) number from goods g left join orders o on g.id=o.gid left join comm c on c.oid=o.id where g.id=?',param);
	}
}
module.exports=CollModel;