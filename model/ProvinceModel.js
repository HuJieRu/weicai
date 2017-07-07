let Model = require('../vendor/model');

class ProvinceModel extends Model{
	add(param){
		return this.query('insert into province set ?,create_time=now()',param);
	}
	getAllProvince(){//得到城市
		return this.query('select id,name,parentid from province');
	}
}
module.exports=ProvinceModel;