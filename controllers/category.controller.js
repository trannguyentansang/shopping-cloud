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
    var newcat = new Category({
        catName: req.body.catName,
        catImage: "/"+req.file.path
    })
    newcat.save((err, newcat)=>{
        if (err){
            res.status(500).send()
            return
        }
        console.log(newcat.catName + " saved in database!")
    })
    res.redirect("/category")
}
module.exports.postEditing = (req, res)=>{
    Category.findOne({_id:req.body.catId}, (err, cat)=>{
        if(err){
            res.status(500).send()
        }
        else{
            if (!cat){
                res.status(404).send()
            }
            else{
                cat.catName = req.body.catName
                if(req.file){
                    cat.catImage = req.file.path
                }
                cat.save((err, cat)=>{
                    if(err){
                        res.status(500).send(err)
                    }
                    else{
                        console.log(cat.catName+" was updated in database")
                        res.redirect('/category')
                    }
                })
            }
        }
    })
}
module.exports.deleting = (req, res)=>{
    Category.deleteOne({_id:req.query.id})
}