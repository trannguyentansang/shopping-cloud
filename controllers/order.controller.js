module.exports.index = (req, res)=>{
    res.render('order', {activepage: 'order' ,layout: './layouts/common' })
}