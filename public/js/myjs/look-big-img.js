define(function(require, exports, module) {
	function initLookBigImg(){
		var imgIndex=0;//ͼƬ����
		   showBigImage(".check-image");
		   //����ͼƬ���������ͼƬ����ÿ��ͼƬ��ӵ���Ŵ��¼�
            
			//���x���رմ�ͼ
			$(".delete-big-img").on("click",function(){
				$(".big-img-container").hide();
			});
	}
	function showBigImage(className){
				//�����ť��ͷ��ͼƬ��һ��
				$(".left-arrows").on("click",function(){
					imgIndex>0?--imgIndex:imgIndex;
					$(".big-img").attr("src",$(className).eq(imgIndex).attr("src"));
				});
				//����Ұ�ť��ͷ��ͼƬ��һ��
				$(".right-arrows").on("click",function(){
					imgIndex<$(className).length-1?++imgIndex:imgIndex;
					$(".big-img").attr("src",$(className).eq(imgIndex).attr("src"));
				});
				//����ͼƬ����ͼƬ���ͼƬ�����ͼ����¼�
				
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