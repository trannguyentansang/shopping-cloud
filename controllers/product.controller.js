module.exports.index = (req, res)=>{
    res.render('product', {activepage: 'product' ,layout: './layouts/common' })
}
module.exports.adding = (req, res)=>{
    res.render('handle-product', {action: 'adding', activepage: 'product' ,layout: './layouts/common' })
}
module.exports.editing = (req, res)=>{
    res.render('handle-product', {action: 'editing', activepage: 'product' ,layout: './layouts/common' })
}
module.exports.trash = (req, res)=>{
    res.render('product-trash', {activepage: 'trash' ,layout: './layouts/common' })
}