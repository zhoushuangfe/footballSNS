//引入模版
var guideTpl=require("../templates/guide.string");
//定义视图
SPA.defineView("guide",{
	//定义html
	html:guideTpl,
	//引入deledated插件,用于定义tap事件
	plugins:["delegated"],
	//绑定视图事件
	bindEvents:{
		show:function(){
			var mySwiper=new Swiper('#swiper-guid',{
				loop:false,
				autoplay:3000
			});
		}
	},
	//绑定元素事件
	bindActions:{
		//点击p标签的时候跳转到首页
		"go.home":function(e){
			SPA.open("index");
		}
	}
})
