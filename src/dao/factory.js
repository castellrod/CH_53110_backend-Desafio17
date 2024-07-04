const config = require("../config/config");

let ProductDAO;
let CartDAO;

switch (config.PERSISTENCE) {
    case 'mongo':
        ProductDAO = require('./productManager');
        CartDAO = require('./cartManager');
        break;
    case 'fs':
        ProductDAO = require('./productManagerFS');
        CartDAO = require('./cartManagerFS');
        break;
    default:
        throw new Error('Persistencia no configurada.');
}

module.exports = {
    ProductDAO,
    CartDAO
}