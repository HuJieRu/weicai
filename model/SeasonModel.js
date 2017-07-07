let Model = require('../vendor/model');

class SeasonModel extends Model{
	add(param){//存储审核不通过的原因
		return this.query('insert into season set ?',param);
	}
}
module.exports=SeasonModel;