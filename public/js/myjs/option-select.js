define(function(require, exports, module) {
   function initOption(data,first,second,third){
            var firstNumber=0;
            var secondNumber=0;
            createOption(first.container,data);//初始化创建市
            if(first.childName){
                createOption(second.container,data[0][first.childName]);//初始化创建区
                 first.container.on("change",function(e){    //当改变市时触发
                    firstNumber=$(this).find('option:selected').attr("number");//记录市号
                    createOption(second.container,data[firstNumber][first.childName]);//通过市号产生区
                     if(second.childName){
                        createOption(third.container,data[firstNumber][first.childName][0][second.childName]);//默认先是第一个区的县
                    }
                });
                  if(second.childName){
                    createOption(third.container,data[0][first.childName][0][second.childName]);//初始化创建县       
                    second.container.on("change",function(e){//当改变区时触发
                        secondNumber=$(this).find('option:selected').attr("number");//记录区号
                        createOption(third.container,data[firstNumber][first.childName][secondNumber][second.childName]);//通过市号和区号产生县
                    });
                }
            }
        
        }
        //产生option
        function createOption(selectContainer,data){
            var str="";
            for(var i=0;i<data.length;i++){//遍历循环产生option，并且给每个option添加number
                str=str+"<option number='"+ i+"'value='" + (data[i]["id"]?data[i]["id"]:data[i]["name"])+ "'>" + data[i]["name"] + "</option>";
            }
            selectContainer.html(str);
        }
         module.exports={initOption:initOption}
});