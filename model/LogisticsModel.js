let Model = require('../vendor/model');
class LogisticsModel extends Model{
	add(param){//添加一条记录
		return this.query('insert into logistics set ?,create_time=now()',param);
	}
	del(id){//删除一条记录
		return this.query('delete from logistics where id=?',id);
	}
	update(param){
		return this.query('update logistics set ?,create_time=now() where id=?',param);
	} 
	getUserLogistics(param){//通过uid查找5条物流地址
		return this.query('select * from logistics where uid=? and status=1 order by create_time DESC limit 0,5',param);
	}
}
module.exports=LogisticsModel;