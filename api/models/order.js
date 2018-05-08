const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  //in lieua of a cart start simply.
  product: {
    type: mongoose.Schema.Types.ObjectId, //creating a relation
    ref: 'Product', //type of model. Ie Product
    required: true
  },
  quantity: { type: Number, default: 1}
});

module.exports = mongoose.model('Order', orderSchema);