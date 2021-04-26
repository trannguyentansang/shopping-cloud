module.exports.index = (req, res)=>{
    res.render('user', {activepage: 'user' ,layout: './layouts/common' })
}
module.exports.adding = (req, res)=>{
    res.render('handle-user', {action: 'adding', activepage: 'user' ,layout: './layouts/common' })
}
module.exports.editing = (req, res)=>{
    res.render('handle-user', {action: 'editing', activepage: 'user' ,layout: './layouts/common' })
}