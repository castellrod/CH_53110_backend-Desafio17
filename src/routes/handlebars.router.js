const Router = require('express').Router;
const ProductManager = require("../managers/productManager")
const viewsRouter = Router();
const auth = require('../middlewares/auth');

const { modeloProductos } = require('../dao/models/productos.modelo'); 
const { modeloCarts } = require('../dao/models/carts.modelo');


const productManager = new ProductManager()

viewsRouter.get('/', async(req, res) => {
    res.status(200).render('home');
});

viewsRouter.get('/products', async(req, res) => {
    let {pagina}=req.query
    if(!pagina){
        pagina=1
    }

    let {
        docs:products,
        totalPages, 
        prevPage, nextPage, 
        hasPrevPage, hasNextPage
    } = await modeloProductos.paginate({},{limit:2, page:pagina, lean:true})

    res.status(200).render('products', { products, totalPages, 
    prevPage, nextPage, 
    hasPrevPage, hasNextPage });
});

viewsRouter.get('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await modeloProductos.findById(productId).lean();
        if (!product) {
            return res.status(404).send('El producto no fue encontrado.');
        }
        res.render('singleproduct', { product });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
});

viewsRouter.get('/cart/:id', async (req, res) => {
    try {
        const cartId = req.params.id;
        const cart = await modeloCarts.findById(cartId).populate('products').lean();
        if (!cart) {
            return res.status(404).send('El carrito no fue encontrado.');
        }

        const productsWithDetails = await Promise.all(cart.products.map(async product => {
            const productDetails = await modeloProductos.findById(product.productId).lean();
            return {
                ...product,
                title: productDetails.title,
                price: productDetails.price
            };
        }));

        res.render('cart', { cart: { ...cart, products: productsWithDetails } });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
});


viewsRouter.get('/login', async(req, res) => {
    let {message, error} = req.query;
  res.status(200).render('login', {message, error});
});

viewsRouter.get('/register', async(req, res) => {

    let {message, error} = req.query;
  res.status(200).render('registro', {message, error});
});

viewsRouter.get('/perfil', auth, (req,res)=>{

    let usuario=req.session.usuario

    res.status(200).render('perfil', {usuario})
})



module.exports = viewsRouter 