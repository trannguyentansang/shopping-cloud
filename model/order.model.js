const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    customer: {},
    date: String,
    total: Number,
    orderDetails:[],
    status: Boolean,
    shippingFee: Number,
    paymentMethod: String
});

const Order = mongoose.model('Order', orderSchema, 'order')
module.exports = Order