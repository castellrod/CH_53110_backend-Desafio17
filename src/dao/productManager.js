const { modeloProductos } = require('./models/productos.modelo');
const logger = require('../utils/logger');

 class ProductManager {
  constructor() {
  }


  async getProducts(limit = 2) {
    try {
      const products = await modeloProductos.find().limit(limit);
      return products;
    } catch (error) {
      throw new Error('Error al obtener los productos desde MongoDB: ' + error.message);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock, status, category) {
    try {
      const newProduct = await modeloProductos.create({
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        status: status,
        category: category
      });
      return newProduct;
    } catch (error) {
      throw new Error('Error al agregar el producto a MongoDB: ' + error.message);
    }
  }

  async getProductById(id) {
    try {
        return await modeloProductos.findOne({ _id: id });
    } catch (error) {
      console.error('Error al obtener el producto por ID:', error);
      throw error;
    }
  }
  async updateProduct(id, updatedFields) {
    try {
      // Utiliza el método findOneAndUpdate de Mongoose para actualizar un producto por su ID
      const updatedProduct = await modeloProductos.findOneAndUpdate(
        { _id: id },
        updatedFields,
        { new: true } // Devuelve el producto actualizado
      );
      if (!updatedProduct) {
        throw new Error('Producto no encontrado para actualizar');
      }
      return updatedProduct;
    } catch (error) {
      throw new Error('Error al actualizar el producto en MongoDB: ' + error.message);
    }
  }


  async deleteProduct(id) {
    try {
      // Utiliza el método findOneAndDelete de Mongoose para eliminar un producto por su ID
      const deletedProduct = await modeloProductos.findOneAndDelete({ _id: id });
      if (!deletedProduct) {
        throw new Error('Producto no encontrado para eliminar');
      }
      return deletedProduct;
    } catch (error) {
      throw new Error('Error al eliminar el producto desde MongoDB: ' + error.message);
    }
  }
}

module.exports = ProductManager;