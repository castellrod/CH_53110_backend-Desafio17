const Router = require('express').Router;
const productRouter=Router()
const ProductController = require('../controller/product.controller');
const { isAdmin } = require('../middlewares/roleAuth');

productRouter.get('/', ProductController.getAllProducts);

productRouter.get('/:id', ProductController.getProductById);

productRouter.post('/', isAdmin, ProductController.createProduct);

productRouter.put('/:id', isAdmin, ProductController.updateProduct);

productRouter.delete('/:id', isAdmin, ProductController.deleteProduct);

productRouter.get('/mockingproducts', ProductController.mockProducts)


module.exports = productRouter;