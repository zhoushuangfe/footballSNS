var myTpl=require("../templates/my.string");
SPA.defineView("my",{
	html:myTpl,
	styles:{background:"transparent!important"},
	plugins:["delegated"],
	bindActions:{
		"tap.close":function(){
			this.hide()
		},
		"goto.register":function(){
			SPA.show("register",{
				ani:{
					 name: 'actionSheet',
         			 distance: 175
				}
			})
		}
	}
	
})

