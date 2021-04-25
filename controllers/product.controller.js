module.exports.index = (req, res)=>{
    res.render('product', {activepage: 'product' ,layout: './layouts/common' })
}