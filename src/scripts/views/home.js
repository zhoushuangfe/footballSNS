var homeTpl=require("../templates/home.string");
//引入util
var util=require("../util/util");
SPA.defineView("home",{
	html:homeTpl,
	//引入delegated插件,用于定义tap事件
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
			vm.livedata=[];
		}
	}],
	init:{
		mySwiper:null,
		hotSwiper:null,
		vm:null
	},
	bindEvents:{
		//视图显示出来之前的回调函数
		beforeShow:function(){
			var that=this;
			//获取vm
			that.vm=this.getVM();
			console.log(that.vm)
			//ajax请求渲染页面
			$.ajax({
				//url:"mock/livelist.json",
				url:"/api/getLivelist.php",
				type:"get",
				data:{
					rtype:"origin"
				},
				success:function(e){
					that.vm.livedata=e.data;
					
				}
			})
		},
		show:function(){
			var that = this;
			this.mySwiper=new Swiper('.hh>.swiper-container',{//
				 onSlideChangeStart:function(swiper){
                    var index = swiper.activeIndex;
                    console.log(index)
                    var tags = $(".m-home nav li");
                    util.setFocus(tags.eq(index));
                }
			})
			this.hotSwiper=new Swiper('.swiper-index',{
				 onSlideChangeStart:function(swiper){
                    var index = swiper.activeIndex;
                    console.log(index)
                    var $tags = $("#title li");
                    util.setFocus($tags.eq(index));
                }
			})
			//下拉刷新,上拉加载
			var myScroll=this.widgets.homeList;
			var scrollSize=30;
			console.log(myScroll);
			myScroll.scrollBy(0,-30);
			var head=$(".head img"),
				topImgHasClass=head.hasClass("up");
			var foot=$(".foot img"),
				bottomImgHasClass=head.hasClass("down");
			myScroll.on("scroll",function(){
				var y=this.y,
				maxY=this.maxScrollY-y;
				if(y>=0){
					!topImgHasClass && head.addClass("up");
					return "";
				}
				if(maxY>=0){
					!bottomImgHasClass && foot.addClass("down");
					return "";
				}
			})
			myScroll.on("scrollEnd",function(){
				if(this.y>=-scrollSize && this.y<0){
					myScroll.scrollTo(0,-scrollSize);
					head.removeClass("up");
				}else if(this.y>=0){
					head.attr("src","/footballApp/images/img/ajax-loader.gif");
					$.ajax({
						url:"/api/getLivelist.php",
						data:{
							rtype:"refresh"
						},
						success:function(rs){
							console.log(rs.data);
							that.vm.livedata=rs.data.concat(that.vm.livedata);
							//myScroll.refresh();
							myScroll.scrollTo(0,-scrollSize);
							head.removeClass("up");
							head.attr("src","/footballApp/images/img/arrow.png");
						}
					})
					/*setTimeout(function(){
						myScroll.scrollTo(0,-scrollSize);
						head.removeClass("up");
						head.attr("src","/footballApp/images/img/arrow.png");
					},1000)*/
				}
				var maxY=this.maxScrollY-this.y;
				var self=this;
				if(maxY>-scrollSize && maxY<0){
					myScroll.scrollTo(0,self.maxScrollY+scrollSize);
					foot.removeClass("down");
				}else if(maxY>=0){
					foot.attr("src","/footballApp/images/img/ajax-loader.gif");
					//请求数据
					$.ajax({
						url:"/api/getLivelist.php",
						data:{
							rtype:"more"
						},
						success:function(rs){
							that.vm.livedata=that.vm.livedata.concat(rs.data);

							myScroll.refresh();
							myScroll.scrollTo(0,self.y+maxY);
							foot.removeClass("down");
							foot.attr("src","/footballApp/images/img/arrow.png")
						}
					})
					/*setTimeout(function(){
						$(".foot").before(
							"<div>add1</div>",
							"<div>add2</div>"
							)
						myScroll.refresh();
						myScroll.scrollTo(0,self.y);
						foot.removeClass("down");
						foot.attr("src","/footballApp/images/img/arrow.png")
					},500)*/
				}
			})

		}
	},
	bindActions:{  
		"tap.slide":function(e){
			var index=$(e.el).index();
			this.mySwiper.slideTo(index);
		},
		"ul.title":function(e){
			var index=$(e.el).index();
			console.log(index);
			this.hotSwiper.slideTo(index);
		},
		"goto.detail":function(e,data){
			SPA.open("detail",{
				param:data//跳转时传递的参数
				
			});
			
		}

	}
})
