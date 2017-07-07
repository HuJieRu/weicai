define(function(require, exports, module) {
  function initFileInput(config) {      
             var control = $('#' + config.ctrlName);   
             control.fileinput({  
                 language: 'zh', //设置语言  
                 // uploadUrl: uploadUrl,  //上传地址  
                 showUpload: false, //是否显示上传按钮  
                 showRemove:true,  
                  dropZoneEnabled: false,  
                 showCaption: true,//是否显示标题  
                 allowedPreviewTypes: ['image'],  
                     allowedFileTypes: ['image'],  
                     allowedFileExtensions:  ['jpg', 'png'],  
                     maxFileSize : 2000,  
                 maxFileCount: config.maxFileCount||1,  
                 //initialPreview: [   
                         //预览图片的设置  
                   //      "<img src='http://127.0.0.1:8080/NewsManageSys/plugin/umeditor1_2_2/jsp/upload/20161030/55061                       477813913474.jpg' class='file-preview-image' alt='肖像图片' title='肖像图片'>",  
                 //],  
                   
             }).on("filebatchselected", function(event, files) {  
                 console.log(event,files)
             });  
         }  
         module.exports={initFileInput:initFileInput}
});