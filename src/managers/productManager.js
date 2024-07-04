const { modeloProductos } = require('../dao/models/productos.modelo');

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
      const updatedProduct = await modeloProductos.findOneAndUpdate(
        { _id: id },
        updatedFields,
        { new: true }
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
      const deletedProduct = await modeloProductos.findOneAndDelete({ _id: id });
      if (!deletedProduct) {
        throw new Error('Producto no encontrado para eliminar');
      }
      return deletedProduct;
    } catch (error) {
      throw new Error('Error al eliminar el producto desde MongoDB: ' + error.message);
    }
  }

  // saveProductsToFile() {
  //   const data = JSON.stringify(this.products, null, 2);

  //   fs.writeFileSync(this.path, data, 'utf8');
  //   console.log(`Productos guardados en el archivo ${this.path}`);
  // }

  // loadProductsFromFile() {
  //   try {
  //     const data = fs.readFileSync(this.path, 'utf8');
  //     this.products = JSON.parse(data);
  //     console.log(`Productos cargados desde el archivo ${this.path}`);
  //   } catch (error) {
  //     console.error(`Error al cargar los productos desde el archivo ${this.path}:`, error.message);
  //   }
  // }
}

module.exports = ProductManager;