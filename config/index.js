//读取环境变量中NODE_ENV的值

let nodeenv = process.env.NODE_ENV;

let config = null;

//如果config的值是prod，就去加载正式环境的配置
if (nodeenv === "prod") {
    config = require("./prod");
}else {
    //如果config的值不是prod，就去加载开发环境的配置
    config = require("./dev");
}


module.exports = config;