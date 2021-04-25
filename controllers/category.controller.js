module.exports.index = (req, res)=>{
    res.render('category', {activepage: 'category' ,layout: './layouts/common' })
}