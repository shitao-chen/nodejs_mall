let User = require("../model/user");

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
        throw Error(`用户名${username}已经存在`)
    }

    //注册
     result = await  User.create(user);
    return result;
}

/**
 * 用户登录
 * url : POST , http://localhost:8000/
 * @param user {username:zhangsan,password:123}
 * @returns {Promise<void>}
 */
async function login(user) {
    //判断用户是否存在
    await isExistByUsername(user.username);

    let result = await User.findone(user);

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
    await isExistByUsername(user.username);

     let result = await User.deleteOne({username:username});

     if (result !== 1){
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
    let result = await  findByUsername();
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

