const User = require('../model/user.model')
const Permission = require('../model/permission.model')
const date = require('date-and-time')

module.exports.index = async (req, res)=>{
    var users = await User.find()
    res.render('user', {activepage: 'user' ,layout: './layouts/common' , users: users})
}
module.exports.adding = async (req, res)=>{
    var pers = await Permission.find()
    res.render('handle-user', {action: 'adding', activepage: 'user' ,layout: './layouts/common', pers: pers})
}
module.exports.postAdding = async (req, res)=>{
    var pers = await Permission.find({_id: req.body.per})
    var per = pers[0]
    const now  =  new Date();
    // Formating the date and time
    // by using date.format() method
    const value = date.format(now,'YYYY/MM/DD HH:mm:ss');
    var newuser = new User({
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        status: true,
        permission: {...per},
        avatar: "/"+req.file.path,
        joined: value
    })
    newuser.save((err, newuser)=>{
        if (err){
            res.status(500).send()
            return
        }
        console.log(newuser.username + " saved in database!")
        res.redirect("/admin/user")
    })
}
module.exports.editing = async(req, res)=>{
    var pers = await Permission.find()
    var user =  await User.findOne({_id : req.query.id})
    res.render('handle-user', {action: 'editing', activepage: 'user' ,layout: './layouts/common', pers: pers, user: user})
}

module.exports.postEditing = async (req, res)=>{
    var pers = await Permission.find({_id: req.body.per})
    var per = pers[0]
    User.findOne({_id: req.body.userId}, (err, user)=>{
        user.username= req.body.username
        user.fullname= req.body.fullname
        user.email= req.body.email
        user.phone= req.body.phone
        user.address= req.body.address
        user.permission= {...per}
        if(req.file){
            if(req.file.path!==""){
                user.avatar= "/"+req.file.path
            }
        }
        user.save((err, user)=>{
            if (err){
                res.status(500).send()
                return
            }
            console.log(user.username + " updated in database!")
            res.redirect("/admin/user")
        })
    })
}

module.exports.deactivate = async (req, res)=>{
    User.findOne({_id: req.query.id}, (err, user)=>{
        user.status = false
        user.save((err, user)=>{
            if (err){
                res.status(500).send()
                return
            }
            console.log(user.username + " deactivated!")
            res.redirect("/admin/user")
        })
    })
}

module.exports.activate = async (req, res)=>{
    User.findOne({_id: req.query.id}, (err, user)=>{
        user.status = true
        user.save((err, user)=>{
            if (err){
                res.status(500).send()
                return
            }
            console.log(user.username + " activated!")
            res.redirect("/admin/user")
        })
    })
}