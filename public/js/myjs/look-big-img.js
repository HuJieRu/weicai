define(function(require, exports, module) {
	function initLookBigImg(){
		var imgIndex=0;//图片索引
		   showBigImage(".check-image");
		   //根据图片类遍历所有图片，给每个图片添加点击放大事件
            
			//点击x，关闭大图
			$(".delete-big-img").on("click",function(){
				$(".big-img-container").hide();
			});
	}
	function showBigImage(className){
				//点击左按钮箭头，图片上一张
				$(".left-arrows").on("click",function(){
					imgIndex>0?--imgIndex:imgIndex;
					$(".big-img").attr("src",$(className).eq(imgIndex).attr("src"));
				});
				//点击右按钮箭头，图片下一张
				$(".right-arrows").on("click",function(){
					imgIndex<$(className).length-1?++imgIndex:imgIndex;
					$(".big-img").attr("src",$(className).eq(imgIndex).attr("src"));
				});
				//遍历图片，给图片添加图片索引和监听事件
				
				$(className).each(function(i){
					$(this).data("imgindex",i);
					$(this).on('click',function(){
						$(".big-img").attr("src",$(this).attr("src"));
						$(".big-img-container").show();
						imgIndex=$(this).data("imgindex");
					});
				})
			}
	module.exports={initLookBigImg:initLookBigImg}
});