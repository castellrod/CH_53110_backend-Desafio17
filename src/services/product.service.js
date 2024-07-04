const { ProductDAO } = require('../dao/factory');

class ProductService {
    constructor() {
        this.productDAO = new ProductDAO()
    }

    async getProducts(limit = 2) {
        return await this.productDAO.getProducts(limit);
    }

    async addProduct(productData) {
        return await this.productDAO.addProduct(productData);
    }

    async getProductById(id) {
        return await this.productDAO.getProductById(id);
    }

    async updateProduct(id, updatedFields) {
        return await this.productDAO.updateProduct(id, updatedFields);
    }

    async deleteProduct(id) {
        return await this.productDAO.deleteProduct(id);
    }
}

module.exports = new ProductService();