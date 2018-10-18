let Order = require("../model/order");
let config = require("../config");
let productService = require("../service/product");
let Big = require("big.js");

//生成订单
async function addItem(order){
    //根据id查询商品信息（商品名，价格，库存）
    let product =await productService.findById(order.productId);
    //当商品不存在
    if (!product){
        throw  Error(`商品${order.productName}不存在`);
    }
    //给商品名和价格重新赋值
    order.productName = product.name;
    order.productPrice = product.price;
    //判断库存是否足够
    if (order.count > product.stock) {
        throw  Error(`商品${product.name}库存不足`);
    }
    //计算总金额  BigDecimal
    let price = product.price;
    let total = Big(price).times(order.count);
    order.total = total;

    //生成订单
    let result = await Order.create(order);
    //扣减库存，操作Product
    productService.updateById(order.productId,{stock:product.stock - order.count});
    return result;
}

//分页查询
async function findByPage(page=1) {

    //偏移量
    let offset = (page -1)*config.PAGE_SIZE;
    let result = await  Order.find().skip(offset).limit(config.PAGE_SIZE);
    return result;
}

module.exports ={
    addItem,
    findByPage
};