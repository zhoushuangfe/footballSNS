//具体的js写在具体的js里面,在app.js里面只做引入

/*var indexTpl=require("./templates/index.string");
var content=document.body.innerHTML;
document.body.innerHTML=content+indexTpl;*/

// 引入spa类库
require("./lib/spa.min");
// 引入swiper类库
require("./lib/swiper-3.3.1.min");
//引入视图文件
require("./views/index");
require("./views/home");
require("./views/find");
require("./views/my");
require("./views/guide");
require("./views/detail");
require("./views/register");
require("./views/exit");
//require("../mock/mock.js");

//默认的首屏view
SPA.config({
	indexView:"index"
})



