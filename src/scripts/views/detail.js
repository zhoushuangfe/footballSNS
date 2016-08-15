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
	bindActions:{
		"tap.back":function(){
			SPA.open("index")
		}
	},
	bindEvents:{
		show:function(){
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
	



