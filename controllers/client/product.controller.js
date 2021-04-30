const Product = require('../../model/product.model')
const Category = require('../../model/category.model')
const User = require('../../model/user.model')

module.exports.proByCat = async (req, res)=>{
    var cat = await Category.findOne({_id: req.query.catId})
    var pros = await Product.find({category: cat})
    var cats = await Category.find()
    var user = await User.findOne({_id:req.signedCookies.userId})
    res.render('client/products-by-category', {layout: './layouts/client-common', pros: pros, cats:cats, cat:cat, cart: req.signedCookies.cart, user: user})
}
module.exports.productDetails = async (req, res)=>{
    var pro = await Product.findOne({_id: req.query.id})
    var cats = await Category.find()
    var relatedPros = await Product.find({category: pro.category}).sort({proSold:'desc'}).limit(6)
    var user = await User.findOne({_id:req.signedCookies.userId})
    res.render('client/product-details', {layout: './layouts/client-common', cats:cats, pro:pro, relatedPros: relatedPros, cart: req.signedCookies.cart, user: user})
}
module.exports.addtocart = async (req, res)=>{
    if(!req.signedCookies.cart){
        var product = await Product.findOne({_id:req.body.proId})
        res.cookie('cart',[{product: product, qty: req.body.qty}], {signed: true})
    }
    else{
        var cart = req.signedCookies.cart
        var product = await Product.findOne({_id:req.body.proId})
        var ok = false
        console.log(product.id)
        console.log(cart)
        cart.forEach(item=>{
            if(item.product._id==product.id){
                item.qty =parseInt(item.qty) + parseInt(req.body.qty)
                ok= true
            }
        })
        if(ok===false){
            cart.push({product: product, qty: req.body.qty})
        }
        res.cookie('cart',cart, {signed: true})
    }
    res.redirect('/')
}
module.exports.cart = async (req, res)=>{
    var cats = await Category.find()
    var cart = req.signedCookies.cart
    var user = await User.findOne({_id:req.signedCookies.userId})
    res.render('client/view-cart', {layout: './layouts/client-common', cats:cats, cart:cart, user: user})
}