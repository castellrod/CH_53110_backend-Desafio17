const errorList = {
    PRODUCT_NOT_FOUND : {
        status: 404,
        message: 'Product not found'
    },
    CART_NOT_FOUND: {
        status: 404,
        message: 'Cart not found.'
    },
    INSUFFICIENT_STOCK: {
        status: 400,
        message: 'Insufficient stock for product.'
    },
    USER_NOT_FOUND: {
        status: 404,
        message: 'User not found.'
    },
    INVALID_INPUT: {
        status: 400,
        message: 'Invalid input data.'
    }
}

module.exports = errorList;