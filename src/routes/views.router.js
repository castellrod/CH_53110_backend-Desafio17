const Router = require('express').Router;
const viewsRouter = Router();
const ViewsController = require('../controller/views.controller');
const logger = require('../utils/logger');


function handleRealTimeProductsSocket(io) {
  io.on('connection', async(socket) => {
    logger.info('Un cliente se ha conectado a /realtimeproducts');
    const products = await productManager.getProducts();
      socket.emit('products', products);
  });
}

viewsRouter.get('/', ViewsController.getHome);

viewsRouter.get('/products', ViewsController.getProducts);

viewsRouter.get('/products/:id', ViewsController.getProductById);

viewsRouter.get('/cart/:id', ViewsController.getCartById);

viewsRouter.get('/login', ViewsController.getLogin);

viewsRouter.get('/register', ViewsController.getRegister);

viewsRouter.get('/profile', ViewsController.getProfile);

viewsRouter.get('/realtimeproducts', ViewsController.getRealtimeProducts);

  module.exports = { viewsRouter, handleRealTimeProductsSocket };