var registerTpl=require("../templates/register.string");

SPA.defineView("register",{
	html:registerTpl,
	styles:{
		background:"transparent!important"
	},
	plugins:["delegated"],
	bindActions:{
		"tap.cancel":function(){
			this.hide()
		}
	}
})