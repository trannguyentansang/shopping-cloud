const User = require('../model/user.model')
module.exports.login = (req, res)=>{
    res.render('login', {layout: './layouts/common-none'})
}
module.exports.postLogin = async (req, res)=>{
    var user = await User.findOne({username: req.body.username})
    if (!user){
        user = await User.findOne({username: req.body.phone})
        if (!user){
            res.render('login', {layout: './layouts/common-none', message: 'Wrong Username or Password'})
            return
        }
    }
    if(user.password!==req.body.password){
        res.render('login', {layout: './layouts/common-none', message: 'Wrong Username or Password'})
        return
    }
    res.cookie('userId', user.id, {signed: true})
    if(user.permission.perName==="CUSTOMER"){
        res.redirect('/')
    }
    else{
        res.redirect('/admin')
    }
}
module.exports.register = (req, res)=>{
    res.render('register')
}
module.exports.logout = (req, res)=>{
    res.clearCookie('userId')
    res.redirect('/auth/login')
}