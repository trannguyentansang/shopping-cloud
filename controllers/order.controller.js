const Order = require('../model/order.model')

module.exports.index = async (req, res)=>{
    var orders = await Order.find()
    res.render('order', {activepage: 'order' ,layout: './layouts/common', orders: orders })
}
module.exports.adding = (req, res)=>{
    res.render('add-order', {activepage: 'order' ,layout: './layouts/common' })
}
module.exports.orderDetails = (req, res)=>{
    res.render('order-details', {activepage: 'order' ,layout: './layouts/common' })
}