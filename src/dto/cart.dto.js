class CartDTO{
    constructor(cart){
        this.id = cart._id
        this.products = cart.products.map(product => ({
            productId: product.productId._id,
            title: product.productId.title,
            price: product.productId.price,
            quantity: product.quantity
        }));
    }
}

module.exports = CartDTO;