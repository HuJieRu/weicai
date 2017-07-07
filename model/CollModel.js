let Model = require('../vendor/model');
class CollModel extends Model{
	add(param){//添加商品收藏
		return this.query('insert into coll set uid=?,gid=?,create_time=now()',param);
	}
	delete(param){//删除收藏的商品
		return this.query('delete from coll where uid=? and gid=?',param);
	}
	getUserColl(param,page){//得到用户收藏商品
		return this.query('select * from coll c join (select g.*,um.nickname username,s.name schoolname,ifnull(sum(o.number),0) sales from goods g left  join users u on u.id=g.uid left  join users_msg um on um.id=u.mid left  join school s on um.school=s.id left join orders o on o.gid=g.id  group by g.id) a  on c.gid=a.id where c.uid=? order by c.create_time  DESC limit ?',[param,page]);
	}
	countUserColl(param){//统计用户收藏商品
		return this.query('select count(c.gid) number from coll c join (select g.*,um.nickname username,s.name schoolname,ifnull(sum(o.number),0) sales from goods g left  join users u on u.id=g.uid left  join users_msg um on um.id=u.mid left  join school s on um.school=s.id left join orders o on o.gid=g.id  group by g.id) a  on c.gid=a.id where c.uid=?',param);
	}
	hasColl(param){//通过uid和gid查找收藏的商品
		return this.query('select * from coll where uid=? and gid=?',param);
	}
}
module.exports=CollModel;