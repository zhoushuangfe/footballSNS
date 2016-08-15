var util={
	setFocus:function(el){
		el.addClass("active").siblings().removeClass();
	}
}
module.exports=util;