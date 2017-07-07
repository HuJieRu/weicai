class Common{
	delayering(data,id){//将数据库的关系型数据变成树型结构，刚开始的id是0
		let result=[];
		data.forEach((value)=>{//遍历所有数据
			if(value.parentid==id){//假如父id是同一个id
				result.push(value);//将同一个父id的数据存成数组
				let child=this.delayering(data,value.id);//不断递归已它为父元素的子元素
				if(child&&child.length){
					value.small=child;//如果有子元素，则存起来
				}
				
			}
		})
		return result;
	}
	delayeringSchool(province,school){//将数据库的关系型数据变成树型结构，刚开始的id是0
		let result=[];
		province.forEach((value)=>{
			let id=value.id;
			result.push(value);
			value.school=[];
			school.forEach((child)=>{
				if(child.parentid==id){
					value.school.push(child);
				}
			})
		})
		return result;
	}
	getPage(number){
		return Math.ceil(number/10);//30条数据为一页，超过30则第二页
	}
	cPage(p){//得到limit得值，数组第一个是开始位置，第二个参数是检索多少条，假如p是2，则【30，30】，从第31条开始检索
		p=p?p:1;
		return [(p-1)*10,10];
	}
	
}
module.exports = new Common();