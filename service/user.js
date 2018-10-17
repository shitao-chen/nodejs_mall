let User = require("../model/user");
let encryptUtils = require("../utils/encryptUtils");

/**
 * 用户注册
 * url : POST , http://localhost:8000/
 * @param user {username:zhangsan,password:123}
 * @returns {Promise<void>}
 */
async  function regist(user) {
    //判断用户名是否存在
    let result = await findByUsername(user.username);

    if (result){
        throw Error(`用户名${result.username}已经存在`)
    }

    //对密码进行加密
    //参数1：原文
    //参数2：盐
    user.password = encryptUtils.md5Hmac(user.password,user.username);
    //对角色重新赋值，避免攻击
    user.role = 0;

    //注册
     result = await  User.create(user);
     //将密码清楚，避免密码泄露
     result.password = "";
    return result;
}

/**
 * 用户登录
 * url : POST , http://localhost:8000/
 * @param user {username:zhangsan,password:123}
 * @returns {Promise<void>}
 */
async function login(user) {
    // 用户有没有传递账号密码过来
    let username = user.username;
    let password = user.password;
    if (username == null || username.trim().length == 0) {
        throw Error("用户名不能为空");
    }
    if (password == null || password.trim().length == 0) {
        throw Error("密码不能为空");
    }

    //判断用户是否存在
    await isExistByUsername(user.username);

    //对传过来的密码进行加密处理
    user.password = encryptUtils.md5Hmac(user.password,user.username);

    let result = await User.findOne(user);
    if(result == null){
        throw  Error("账号或密码错误");
    }
    result.password = "";
    return result;

}





/**
 * 根据用户名删除用户
 * url : DELETE, http://localhost:8000/username
 * @param username 用户名
 * @returns {Promise<void>}
 */
async function deleteUserByUsername(username) {
    //判断用户是否存在
    await isExistByUsername(username);

     let result = await User.deleteOne({username:username});

     if (result.n !== 1){
         throw Error(`删除失败`)
     }
}

/**
 * 根据用户名查询用户
 * url : GET , http://localhost:8000/username
 * @param username :  zhangsan
 * @returns {Promise<*>}
 */
async function findByUsername(username) {
    let result = await  User.findOne({username:username});
    return result;
}


//根据用户名判断用户是否存在
async function isExistByUsername(username) {
    let result = await  findByUsername(username);
    if (!result){
        throw Error(`用户名为${username}的用户不存在`)
    }
}

module.exports ={
    regist,
    login,
    deleteUserByUsername,
    findByUsername
};

