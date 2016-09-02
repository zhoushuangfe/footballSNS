var detailTpl=require("../templates/detail.string");

SPA.defineView("detail",{
	html:detailTpl,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
			vm.imgsrc=null;
			vm.title=null;
			vm.text=null;
			vm.isVisible=false;
		}
	}],
	init:{
		detailInfor:"",
	},
	bindActions:{
		//点击返回时隐藏详情页
		"tap.back":function(){
			//SPA.open("index")
			this.hide({
				param:this.detailInfor,//传参
			});
		}
	},
	bindEvents:{
		show:function(){
			var that=this;
			//获取视图
			var vm=this.getVM();
			var id=this.param.id;
			console.log(id)
			$.ajax({
				//url:"/mock/liveDetail.json",
				url:"/api/getLivelist.php",
				data:{
					rtype:id
				},
				success:function(re){
					var obj=re.data;
					that.detailInfor=obj[id-1].id;
					console.log(that.detailInfor)
					vm.imgsrc=obj[id-1].img;
					vm.title=obj[id-1].title;
					vm.text=obj[id-1].text;
					setTimeout(function(){
						vm.isVisible=true;
					},1000)
					
				}
			})

		}
	}
})
	



