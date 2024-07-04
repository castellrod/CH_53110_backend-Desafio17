const { modeloCarts } = require('../dao/models/carts.modelo');


class CartManager {
  constructor() {
  }

  async addProductToCart(cartId, productId) {
    try {
        const cart = await modeloCarts.findById(cartId);

        if (!cart) {
            throw new Error(`Carrito no encontrado con el ID ${cartId}`);
        }

        const existingProduct = cart.products.find(product => product.productId.equals(productId));

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.products.push({ productId, quantity: 1 });
        }

        await cart.save();

        return cart.products.find(product => product.productId.equals(productId));
    } catch (error) {
        throw new Error('Error al agregar el producto al carrito: ' + error.message);
    }
}

    async getAllCarts() {
    try {
        return await modeloCarts.find();
    } catch (error) {
        throw new Error('Error al obtener los carritos: ' + error.message);
    }
  }


  async getCartById(cartId) {
    try {
        return await modeloCarts.findById(cartId);
    } catch (error) {
        throw new Error('Error al obtener el carrito por ID: ' + error.message);
    }
}

  async createCart(initialProducts = []) {
    try {
        const newCart = await modeloCarts.create({ products: initialProducts });
        return newCart;
    } catch (error) {
        throw new Error('Error al crear el carrito: ' + error.message);
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
        const cart = await modeloCarts.findById(cartId);

        if (!cart) {
            throw new Error(`Carrito no encontrado para el ID ${cartId}`);
        }

        cart.products = cart.products.filter(product => !product.productId.equals(productId));
        await cart.save();

        return cart;
    } catch (error) {
        throw new Error('Error al eliminar el producto del carrito: ' + error.message);
    }
}

async updateProductQuantity(cartId, productId, newQuantity) {
    try {
        
        const cart = await modeloCarts.findById(cartId);

        if (!cart) {
            throw new Error(`Carrito no encontrado para el ID ${cartId}`);
        }
        
        const productToUpdate = cart.products.find(product => product.productId.equals(productId));

        if (!productToUpdate) {
            throw new Error(`Producto no encontrado en el carrito`);
        }
        
        productToUpdate.quantity = newQuantity;

        await cart.save();

        return cart;
    } catch (error) {
        throw new Error('Error al actualizar la cantidad del producto en el carrito: ' + error.message);
    }
}

async removeAllProductsFromCart(cartId) {
    try {
        const cart = await modeloCarts.findById(cartId);

        if (!cart) {
            throw new Error(`Carrito no encontrado para el ID ${cartId}`);
        }

        cart.products = [];

        await cart.save();

        return cart;
    } catch (error) {
        throw new Error('Error al eliminar todos los productos del carrito: ' + error.message);
    }
}

}

module.exports = CartManager;