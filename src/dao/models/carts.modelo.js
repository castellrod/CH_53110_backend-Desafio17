const mongoose = require('mongoose')


const cartsColl = 'carts'
const cartSchema = new mongoose.Schema({
    products: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productos', 
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }]
  }, { timestamps: true });
  

  const modeloCarts = mongoose.model(cartsColl, cartSchema)

    module.exports = {modeloCarts}