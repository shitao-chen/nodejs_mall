let userService = require("../service/user");
require("../db");
let config = require("../config");

async function testService() {

    //测试注册
   /* let user = {
        username:"zhangsan",
        password:"123",
        role:100
    };
    user = await  userService.regist(user);*/

    //测试登陆
     /* let user = {
          username:"zhangsan",
          password:"123123"
      }
      user = await  userService.login(user);*/

    // await userService.deleteUserByUsername("zhangsan");

    // console.log("测试的结果"+user);
}

testService();