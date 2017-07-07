define(function(require, exports, module) {
	require("Pagination");
	var key='';
	function initPagination(config){
		key=config.key;
	 $("#Pagination").pagination(config.page,{
			 current_page: config.currentPage,   //当前页索引
			 callback: PageCallback
		});
	$(".page-btn").off("click").on("click",function(){
			// 跳到第指定页 
			/* console.log(config.page); */
			var page_index=parseInt($("#page-input").val());
			if( page_index>0&&page_index<=config.page)
			{
				if(key!=null){//有参数
					window.location.href = window.location.href.split("?")[0]+"?key="+key+ "&&p="+page_index+"&&tag="+(getQueryString('tag')||0);
				}else{
					window.location.href = window.location.href.split("?")[0]+ "?p="+page_index+"&&tag="+(getQueryString('tag')||0);
				}
				
			}else{
				alert("输入的页数超过范围!");
			}
			
			//清空用户跳转页数
			$(".page-go input").val("");

		});		
	}
	//得到参数
	function getQueryString(name)
	{
		 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		 var r = window.location.search.substr(1).match(reg);
		 if(r!=null)return  unescape(r[2]); return null;
	}
	function PageCallback(page_index,jq)
	{
		if(page_index==NaN)
		{
			alert('不好意思，页数有问题，请刷新页面');
			return ;
		}
		if(key!=null){//有参数
			window.location.href = window.location.href.split("?")[0]+"?key="+key+ "&&p="+(page_index+1)+"&&tag="+(getQueryString('tag')||0);
		}else{
			window.location.href = window.location.href.split("?")[0]+ "?p="+(page_index+1)+"&&tag="+(getQueryString('tag')||0);
		}
	}	
	module.exports={initPagination:initPagination,getQueryString:getQueryString}
});