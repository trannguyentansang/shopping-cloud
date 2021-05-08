const User = require('../../model/user.model')
const Category = require('../../model/category.model')
const Order = require('../../model/order.model')
const moment = require('moment')

module.exports.profile = async (req, res)=>{
    var id = req.signedCookies.userId
    var user = await User.findOne({_id: id})
    var cats = await Category.find({status:true})
    res.render('client/change-profile', {layout: './layouts/client-common', cats: cats, cart: req.signedCookies.cart, user: user})
}
module.exports.postProfile = async (req, res)=>{
    var id = req.signedCookies.userId
    var user = await User.findOne({_id: id})
    var cats = await Category.find({status:true})
    user.fullname = req.body.fullname
    user.email = req.body.email
    user.phone = req.body.phone
    user.address = req.body.address
    user.save((err, user)=>{
        if (err){
            res.status(500).send()
            return
        }
        console.log(user.username + " activated!")
        res.render('client/change-profile', {layout: './layouts/client-common', cats: cats, cart: req.signedCookies.cart, user: user, message: 'Updated success'})
    })
}
module.exports.order = async (req, res)=>{
    var id = req.signedCookies.userId
    var user = await User.findOne({_id: id})
    var cats = await Category.find({status:true})
    var orders = await Order.find({customer: user}).sort({"date":"desc"})
    console.log(user)
    res.render('client/view-order', {layout: './layouts/client-common', cats: cats, cart: req.signedCookies.cart, user: user, orders:orders, moment: moment})
}

module.exports.changeStatus = async (req, res)=>{
    var status = req.query.status
    if (status!=1&&status!=2){
        status = 2
    }
    var order = await Order.findOne({_id: req.query.id})
    order.status = status
    order.save((err, order)=>{
        if (err){
            res.status(500).send()
            return
        }
        res.redirect("/user/order")
    })
}