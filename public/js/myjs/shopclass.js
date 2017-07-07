define(function(require, exports, module) {
   $(".shopClass").hover(function(){
                     $(".tit").show();
                },function(){
                     $(".tit").hide();
                });
                   
  $(".shopClass .tit").slide({ 
            titCell:".mod_cate",
            targetCell:".mod_subcate",
            delayTime:0,
            triggerTime:10,
            defaultPlay:false,
            returnDefault:true
        });
});