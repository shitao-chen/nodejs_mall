let userService = require("../service/user");
let router = require("express").Router();
module.exports = router;

let config = require("../config");
let encryptUtils = require("../utils/encryptUtils");

/**
 * 用户注册
 * url : POST , http://localhost:8000/
 * @param user {username:zhangsan,password:123}
 */
router.post("/", async (request, response) => {
    let result = await userService.regist(request.body);

    response.success(result);
});

/**
 * 用户登录
 * url : POST , http://localhost:8000/
 * @param user {username:zhangsan,password:123}
 */
router.post("/login", async (request, response) => {

    let result = await userService.login(request.body);

    //定义token
    let token = {
        username: result.username,
        expire: Date.now() + config.TOKEN_EXPIRE
    };

    //对token进行加密（对称加密）
    //参数1：原文（string）
    //参数2：密钥
    let encryptedToken = encryptUtils.aesEncrypt(JSON.stringify(token), config.TOKEN_KEY);

    response.success(encryptedToken);
});

/**
 * 根据用户名删除用户
 * url : DELETE, http://localhost:8000/username
 * @param username 用户名
 */
router.delete("/:username", async (request, response) => {
    await userService.deleteUserByUsername(request.params.username);

    response.success();
});


/**
 * 根据用户名查询用户
 * url : GET , http://localhost:8000/username
 * @param username :  zhangsan
 */
router.get("/:username", async (request, response) => {
    let username = request.params.username;
    let result = await userService.findByUsername(username);

    if (result) {
        result.password = "";
        response.success(result);
    } else {
        throw Error(`用户名为${username}的用户不存在`)
    }
});