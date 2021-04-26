const Category = require('../model/category.model')

module.exports.index = async (req, res)=>{
    var categories = await Category.find()
    res.render('category', {activepage: 'category' ,layout: './layouts/common', cats: categories})
}
module.exports.adding = (req, res)=>{
    res.render('handle-category', {action: 'adding', activepage: 'category' ,layout: './layouts/common' })
}
module.exports.editing =async (req, res)=>{
    var id =req.query.id
    var cat = await Category.find({_id: id})
    res.render('handle-category', {action: 'editing', activepage: 'category' ,layout: './layouts/common', cat:cat[0] })
}
module.exports.postAdding = (req, res)=>{
    console.log(req.body)
    res.redirect("/category")
}