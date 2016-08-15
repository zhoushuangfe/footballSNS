var exitTpl=require("../templates/exit.string");

SPA.defineView("exit",{
	html:exitTpl,
	plugins:["delegated"],
	bindActions:{

	},
	bindEvents:{
		show:function(){
			var scrollY=this.widgets.exitScroll;
			scrollY.on("scroll",function(){
				console.log(this.y);
				/*if(this.y<=-200){
					$(".m-exit").after($(".exit-menu").clone(true).addClass("fexedSccroll"))
				}else{

				}*/
				if(this.y<=-200){
                   if($(".m-exit").siblings(".exit-menu").length>0){
                   	//$(".m-exit").next().length>0或$(".m-exit").siblings(".exit-menu").length>0
                      ;
                      //return false; 或 ;
                   }else{
                   	  $(".m-exit").after($(".exit-menu").clone(true).addClass("fexedSccroll")); 
                   } 
                }else{
                	$(".exit-menu.fexedSccroll").remove();
                }
			})
		}
	}
})