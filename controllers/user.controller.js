module.exports.index = (req, res)=>{
    res.render('user', {activepage: 'user' ,layout: './layouts/common' })
}