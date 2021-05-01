const User = require('../../model/user.model')
const Category = require('../../model/category.model')

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