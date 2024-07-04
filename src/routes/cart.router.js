const Router = require('express').Router;
const cartRouter=Router()
const CartController = require('../controller/cart.controller');
const { isUser } = require('../middlewares/roleAuth');



cartRouter.get('/', CartController.getAllCarts);

cartRouter.post('/', CartController.createCart);

cartRouter.get('/:id', CartController.getCartById);

cartRouter.post('/:id/products', isUser, CartController.addProductToCart);

cartRouter.delete('/:cartId/products/:productId', CartController.removeProductFromCart);

cartRouter.put('/:cartId/products/:productId', CartController.updateProductQuantity);

cartRouter.delete('/:cartId', CartController.removeAllProductsFromCart);

cartRouter.post('/:cartId/purchase', isUser, CartController.purchaseCart);

module.exports = cartRouter;