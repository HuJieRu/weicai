let Model = require('../vendor/model');

class SearchModel extends Model{
	add(param){//插入新的关键字
		return this.query('insert into search set ?,create_time=now()',param);
	}
	getKeyList(param){//根据用户uid得到6个关键字
		return this.query('select keyword from search where uid=? group by keyword ORDER BY count(id) DESC limit 0,6',param);
	}
}
module.exports=SearchModel;