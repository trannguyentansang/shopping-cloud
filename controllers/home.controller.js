const User = require('../model/user.model')
module.exports.homePage =async (req, res)=>{
    var user = await User.findOne({_id:req.signedCookies.userId})
    res.render('index', {activepage: 'dashboard' ,layout: './layouts/common' , user:user})
}