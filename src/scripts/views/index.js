//引入模版
var indexTpl=require("../templates/index.string");
//引入util
var util=require("../util/util");
//定义视图
SPA.defineView("index",{
	//定义Html
	html:indexTpl,
	//引入delegated插件,用于定义tap事件
	plugins:["delegated"],
	//定义子视图modules[{}]
	modules:[{
		name:"content",
		defaultTag:"home",
		views:["home","find","my","exit"],
		container:".m-index"
	}],
	//绑定视图事件
	bindEvents:{
		//视图显示出来之前的回调函数
		beforeShow:function(){},
		//视图显示出来时的回调函数
		show:function(){
		}
	},
	//绑定元素事件
	bindActions:{
		"switch.tabs":function(e,data){
			// 当前高亮显示
            util.setFocus($(e.el));
			//$(e.el).addClass("active").siblings().removeClass("active");
			// 切换子视图
            this.modules.content.launch(data.tag);
            console.log(data.tag)
			
		},
		"goto.my":function(){
			SPA.open("my",{
				ani:{
					name:"dialog",
					width:280,
					height:200
				}
				
			})
		}
	}

})
