$(document).ready(function(){
				var $tab_li = $('.tab ul li');
				$tab_li.on("click",function(){
					$(this).addClass('selected').siblings().removeClass('selected');
					var index = $tab_li.index(this);
					$('div.tab_box > div').eq(index).show().siblings().hide();
				});	
			});