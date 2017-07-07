let Model = require('../vendor/model');

class GoodsTypeModel extends Model{
	add(param){
		return this.query('insert into goods_type set ?,create_time=now()',param);  //param={'time':'now()'}
	}
	getAll(){//得到所有的商品类型
		return this.query('select id,name,parentid from goods_type');
	}
	getAllChildType(param,callback,arr=[]){//得到所有的孩子类型
		let ids=[];
		this.query('select id from goods_type where parentid in (?)',param)//根据typeid查找该类型的子类型
		.then((result)=>{
			if(result&&result.length){//如果有子id则遍历子类型
				result.forEach((val)=>{
					ids.push(val.id);
				});
				[].push.apply(arr,ids);
				this.getAllChildType(ids,callback,arr);//如果子类还有子类则继续查找子类型
			}else{
				callback&&callback(arr);
			}
		})
	}
}
module.exports=GoodsTypeModel;