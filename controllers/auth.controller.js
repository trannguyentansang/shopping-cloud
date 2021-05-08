const User = require('../model/user.model')
const Permission = require('../model/permission.model')
const date = require('date-and-time')
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
    if(user.status==false){
        res.render('login', {layout: './layouts/common-none', message: 'Your account is deactivated'})
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
    res.render('register', {layout: './layouts/common-none'})
}
module.exports.postRegister = async (req, res)=>{
    var username = req.body.username
    var password = req.body.password
    var repassword = req.body.repassword
    try{
        var user = await User.findOne({username: username})
        if(user){
            res.render('register', {layout: './layouts/common-none', message:'Username is not available'})
            return
        }
        if(password.length<=8){
            res.render('register', {layout: './layouts/common-none', message:'Length of password must be longer than 8'})
            return
        }
        if(password!==repassword){
            res.render('register', {layout: './layouts/common-none', message:'Password is not matched'})
            return
        }
        const now  =  new Date();
        var pers = await Permission.find({_id: '608b81e641e21a5a37b902c9'})
        var per = pers[0]
        var newuser = new User({
            username: username,
            password:password,
            status: true,
            permission: {...per},
            joined: now,
            avatar: '/public/static/images/default-avatar.png'
        })
        newuser.save((err, newuser)=>{
            if (err){
                res.status(500).send()
                return
            }
            console.log(newuser.username + " saved in database!")
        })
        res.redirect('/auth/login')
    }
    catch(err){
        res.render('register', {layout: './layouts/common-none', message:'Username is not available'})
        console.log(err)
        return
    }
    res.render('register', {layout: './layouts/common-none'})
    res.redirect('/auth/login')
}
module.exports.logout = (req, res)=>{
    res.clearCookie('userId')
    res.redirect('/auth/login')
}