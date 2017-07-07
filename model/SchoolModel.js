let Model = require('../vendor/model');

class SchoolModel extends Model{
	add(param){
		return this.query('insert into school set ?,create_time=now()',param);
	}
	getAllSchool(){//得到学校
		return this.query('select id,name,parentid from school');
	}
}
module.exports=SchoolModel;