let encryptUtils = require("../utils/encryptUtils");
let config = require("../config");
let userService = require("../service/user");

function checkUrl(url) {
    //不需要验证token-->不需要登陆
    //注册 ： /user/regist
    //登陆： /user/login
    let ignoreUrls = [
        /\/user\/regist/,
        /\/user\/login/
    ]

    //设置标志位，用于判断是否需要验证token
    let isNeedCheck = true;
    //js中的forEach()是不能中断的，break
    for (let i = 0; i < ignoreUrls.length; i++) {
        let ignoreUrl = ignoreUrls[i];
        if (ignoreUrl.test(url)) {
            isNeedCheck = false;
            break;
        }
    }

    return isNeedCheck;
}


module.exports = async (request, response, next) => {

    let url = request.url;
    if (checkUrl(url)) {
        //获取token
        let token = request.get("token");
        if (!token) {
            throw Error("请求头中没有Token数据，请登陆");
        }
        //对获取到的token进行解密操作，解密出来的数据是string类型，需要转成json对象
        let tokenDecrypted = null;
        try {
            tokenDecrypted = encryptUtils.aesDecrypt(token, config.TOKEN_KEY)
        } catch (e) {
            throw Error("toke解密失败，请登陆");
        }
        //把字符串转换成js对象
        let tokenJs = JSON.parse(tokenDecrypted);
        //判断token是否过期
        let expire = tokenJs.expire;
        if (Date.now() > expire) {
            throw Error("token已过期，请重新登陆");
        }
        //判断用户是否存在
        let user = await userService.findByUsername(tokenJs.username);
        if (!user){
            throw Error("用户不存在，请重新登陆");
        }

        //把查询到的用户存储到request对象身上
        request.user = user;


    }


    // 放行的代码
    next();
};