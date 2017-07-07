let Model = require('../vendor/model');
class TagsModel extends Model{
	getAll(){//得到所有的tag
		return this.query('select * from tags');
	}
}
module.exports=TagsModel;