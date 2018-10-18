let Category = require("../model/category");
let config = require("../config");

/**
 * 添加分类
 * url: POST localhost:8000/category
 * 请求体中传递要添加的数据，{name,手机}
 * @returns {Promise<void>}
 */
//
async  function addItem(category) {
    let result = await Category.findOne({name:category.name});
    if (result){
        throw Error(`名字为${category.name }的类别已经存在`);
    }
     result =  await Category.create(category);
    return result;
}


/**
 * 根据ID删除
 * url:DELETE localhost:8000/category/id
 * @returns {Promise<void>}
 */
async  function deleteById(id){
    await  findById(id);

    let result =await Category.deleteOne({_id:id});
    if (result.n !== 1){
        throw Error(`删除ID为${id}的数据失败`)
    }
}

/**
 * 根据ID更新
 * url: PUT localhost:8000/category/id
 * 更新的数据：{name：手机}
 * 更新操作的结果 : { n: 1, nModified: 1, ok: 1 }
 * @returns {Promise<void>}
 */
async function updateById(id,category) {
   await  findById(id);

    let result = await  Category.updateOne({_id:id},category);

    if (result.n !== 1){
        throw Error(`更新ID为${id}的数据失败`);
    }

}

/**
 * 分页查询, 页码从1开始,
 *  偏移量 : (page-1)*pageSize
 *  当前页面显示多少条数据 : 10
 * url : GET ,http://localhost:8080/category?page=2
 * 需要指定默认查询的是第一页
 * @returns {Promise<void>}
 */
async function findByPage(page=1) {

    //偏移量
    let offset = (page -1)*config.PAGE_SIZE;
    let result = await  Category.find().skip(offset).limit(config.PAGE_SIZE)
    return result;
}


//根据ID查询数据是否存在
async function findById(id) {

    let result = await Category.findOne({_id:id});
    if (!result){
        throw  Error(`ID为${id}的数据不存在`)
    }
}

module.exports ={
    addItem,
    deleteById,
    updateById,
    findByPage
};