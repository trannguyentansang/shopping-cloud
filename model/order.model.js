const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    catName: String,
    catImage: String
});

const Order = mongoose.model('Order', orderSchema, 'order')
module.exports = Order