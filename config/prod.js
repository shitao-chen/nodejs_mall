//正式环境

module.exports = {
    PORT:80,
    DB:"product-manager",
    TOKEN_EXPIRE: 1000 * 60 * 60 * 24 * 7,
    TOKEN_KEY: "PROD",
    PAGE_SIZE:10
};