const CartService = require('../services/cart.service');
const ProductService = require('../services/product.service');
const TicketService = require('../services/ticket.service');
const CustomError = require('../errors/customError');
const errorList = require('../utils/errorList');


class CartController {
    // GET CARTS
    static async getAllCarts(req, res) {
        try {
            const carts = await CartService.getAllCarts();
            res.json(carts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // CREATE CART
    static async createCart(req, res) {
        const initialProducts = req.body.products || [];
        try {
            const newCart = await CartService.createCart(initialProducts);
            res.status(201).json(newCart);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    // GET CART BY ID
    static async getCartById(req, res, next) {
        const cartId = req.params.id;
        try{
            const cartDTO = await CartService.getCartById(cartId);
            if (!cartDTO) {
                throw new CustomError(errorList.CART_NOT_FOUND.status, errorList.CART_NOT_FOUND.code, errorList.CART_NOT_FOUND.message);
            }
            res.json(cartDTO);
        }
        catch (error) {
            next(error);
        }
    }

    // ADD PRODUCT TO CART
    static async addProductToCart(req, res) {
        const cartId = req.params.id;
        const productId = req.body.productId;


        try {
            const addedProduct = await CartService.addProductToCart(cartId, productId);
            res.status(201).json(addedProduct);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    // DELETE PRODUCT FROM CART
    static async removeProductFromCart(req, res) {
        const { cartId, productId } = req.params;
        try {
            await CartService.removeProductFromCart(cartId, productId);
            res.json({ message: 'Producto eliminado del carrito exitosamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el producto del carrito: ' + error.message });
        }
    }

    // UPDATE QUANTITY OF PRODUCT IN CART
    static async updateProductQuantity(req, res) {
        const { cartId, productId } = req.params;
        const { quantity } = req.body;
        try {
            const updatedProduct = await CartService.updateProductQuantity(cartId, productId, quantity);
            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la cantidad del producto en el carrito: ' + error.message });
        }
    }

    // DELETE CART
    static async removeAllProductsFromCart(req, res) {
        const { cartId } = req.params;
        try {
            await CartService.removeAllProductsFromCart(cartId);
            res.json({ message: 'Carrito eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el carrito: ' + error.message });
        }
    }

    static async purchaseCart(req, res) {
        const { cartId } = req.params;
        const userEmail = req.session.user.email;

        try{
            const cart = await CartService.getCartById(cartId);
            if (!cart) {
                return res.status(404).json({ error: 'Carrito no encontrado' });
            }
            let totalAmount = 0
            const purchaseProducts = []

            for (const item of cart.products) {
                const product = await ProductService.getProductById(item.productId);

                if(product.stock >= item.quantity){
                   product.stock -= item.quantity;
                   await ProductService.updateProduct(product._id, {stock: product.stock});
                    totalAmount += product.price * item.quantity;
                    purchaseProducts.push({
                        productId: product._id,
                        quantity: item.quantity,
                        price: product.price
                    });
                }
                else{
                    return res.status(400).json({error: 'No hay suficiente stock para el producto ' + product.name});
                }
            }

            const newTicket = await TicketService.createTicket({
                amount: totalAmount,
                purchaser: userEmail,
            });

            await CartService.removeAllProductsFromCart(cartId);

            res.status(200).json({ message: 'Compra realizada exitosamente', ticket: newTicket });
        }
        catch (error) {
            res.status(500).json({ error: 'Error al realizar la compra: ' + error.message });
        }
    }
}

module.exports = CartController;