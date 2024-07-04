const { modeloProductos } = require('../dao/models/productos.modelo'); 
const ProductService = require('../services/product.service');
const ProductDTO = require('../dto/product.dto');
const {generateMockProducts} = require('../utils/mocking');
const CustomError = require('../errors/customError');
const errorList = require('../utils/errorList');
const logger = require('../utils/logger');

class ProductController{
    static async getAllProducts(req, res) {
        try {
            const { page = 1, limit = 2 } = req.query;
            const options = {
                page: parseInt(page),
                limit: parseInt(limit)
            };
            const products = await modeloProductos.paginate({}, options);
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getProductById(req, res, next) {
        const productId = req.params.id;
        try {
            const product = await ProductService.getProductById(productId);
            if (!product) {
                throw new CustomError(errorList.PRODUCT_NOT_FOUND.status, errorList.PRODUCT_NOT_FOUND.code, errorList.PRODUCT_NOT_FOUND.message);
            }
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    static async createProduct(req, res) {
        try {
            const productData = new ProductDTO(req.body);
            const newProduct = await ProductService.addProduct(productData);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateProduct(req, res) {
        const productId = req.params.id;
        const updatedFields = req.body;

        try {
            const updatedProduct = await ProductService.updateProduct(productId, updatedFields);
            res.json(updatedProduct);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async deleteProduct(req, res) {
        const productId = req.params.id;
        try {
            await ProductService.deleteProduct(productId);
            res.json({ message: 'Producto eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async mockProducts(req, res) {
        const mockProducts = generateMockProducts(100);
        res.json(mockProducts);
    }

    static async loggerTest(req, res){
        try{
            logger.debug('Debug message');
            logger.info('Info message');
            logger.warning('Warn message');
            logger.error('Error message');
            logger.fatal('Fatal message');
            logger.http('HTTP message');

            res.status(200).json({message: 'Log messages sent successfully'});
        }
        catch(error){
            logger.error('Error in loggerTest:', error);
            res.status(500).json({error: 'Error generating logs'});   
        }
    }
}

module.exports = ProductController;