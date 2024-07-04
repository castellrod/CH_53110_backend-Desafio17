const { CartDAO } = require('../dao/factory')
const CartDTO = require('../dto/cart.dto')
const CustomError = require('../errors/customError');
const errorList = require('../utils/errorList');

class CartService{
    constructor(){
        this.cartDAO = new CartDAO()
    }

    async addProductToCart(cartId, productId){
        return await this.cartDAO.addProductToCart(cartId, productId)
    }

    async getAllCarts(){
        return await this.cartDAO.getAllCarts()
    }

    async getCartById(cartId){
        const cart = await this.cartDAO.getCartById(cartId)
        if(!cart){
            throw new CustomError(errorList.CART_NOT_FOUND.status, errorList.CART_NOT_FOUND.code, errorList.CART_NOT_FOUND.message)
        }
        await cart.populate('products.productId')
        return new CartDTO(cart)
    }

    async createCart(initialProducts = []){
        return await this.cartDAO.createCart(initialProducts)
    }

    async removeProductFromCart(cartId, productId){
        return await this.cartDAO.removeProductFromCart(cartId, productId)
    }

    async updateProductQuantity(cartId, productId, quantity){
        return await this.cartDAO.updateProductQuantity(cartId, productId, quantity)
    }

    async removeAllProductsFromCart(cartId){
        return await this.cartDAO.removeAllProductsFromCart(cartId)
    }
}

module.exports = new CartService();