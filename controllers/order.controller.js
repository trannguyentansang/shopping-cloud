module.exports.index = (req, res)=>{
    res.render('order', {activepage: 'order' ,layout: './layouts/common' })
}
module.exports.adding = (req, res)=>{
    res.render('add-order', {activepage: 'order' ,layout: './layouts/common' })
}
module.exports.orderDetails = (req, res)=>{
    res.render('order-details', {activepage: 'order' ,layout: './layouts/common' })
}