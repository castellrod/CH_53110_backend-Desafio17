const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.path = './products.json';
    this.loadProductsFromFile();
  }

  getProducts() {
    console.log(this.products);
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const codeExists = this.products.some((product) => product.code === code);

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("todos los campos son necesarios");
    } else if (codeExists) {
      console.log("el codigo ya existe");
    } else {
      const newProduct = {
        id: this.getNewID(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };

      this.products.push(newProduct);
      this.saveProductsToFile();
      console.log("Producto guardado");
    }
  }
}

  module.exports = ProductManager;