const Product = require('../model/product.model')
const Category = require('../model/category.model')
const date = require('date-and-time')
module.exports.index = async (req, res)=>{
    var products = await Product.find({proStatus: true})
    res.render('product', {activepage: 'product' ,layout: './layouts/common', products: products })
}
module.exports.adding = async (req, res)=>{
    var cats = await Category.find()
    res.render('handle-product', {action: 'adding', activepage: 'product' ,layout: './layouts/common', cats:cats })
}
module.exports.editing = async(req, res)=>{
    var cats = await Category.find()
    var pro = await Product.find({_id: req.query.id})
    res.render('handle-product', {action: 'editing', activepage: 'product' ,layout: './layouts/common', cats:cats, pro: pro[0]})
}
module.exports.trash = (req, res)=>{
    res.render('product-trash', {activepage: 'trash' ,layout: './layouts/common' })
}
module.exports.postAdding = async (req, res)=>{
    const now  =  new Date();
    // Formating the date and time
    // by using date.format() method
    const value = date.format(now,'YYYY/MM/DD HH:mm:ss');
    var category = await Category.find({_id: req.body.category})
    var cat = category[0]
    var newpro = new Product({
        proName: req.body.proName,
        proPrice: req.body.proPrice,
        category: {...cat},
        proDiscount: req.body.proDiscount,
        proDescription: req.body.proDescription,
        proImage: "/"+req.file.path,
        proSold: 0,
        proQty: 0,
        proStatus: true,
        proDateCreated: value,
        proDateModified: value,
        proRating: 0,
        proSearch: 0,
        proLike: 0,
        proComment:null
    })
    newpro.save((err, newpro)=>{
        if (err){
            res.status(500).send()
            return
        }
        console.log(newpro.proName + " saved in database!")
        res.redirect("/product")
    })
}
module.exports.postEditing = (req, res)=>{
    Product.findOne({_id: req.body.proId}, async (err, pro)=>{
        const now  =  new Date();
        // Formating the date and time
        // by using date.format() method
        const value = date.format(now,'YYYY/MM/DD HH:mm:ss');
        var category = await Category.find({_id: req.body.category})
        var cat = category[0]
        pro.proName= req.body.proName
        pro.proPrice= req.body.proPrice
        pro.category= {...cat}
        pro.proDiscount= req.body.proDiscount
        pro.proDescription= req.body.proDescription
        pro.proDateModified= value
        if (req.file){
            if (req.file.path!==""){
                pro.proImage = "/"+req.file.path
            }
        }
        pro.save((err, pro)=>{
            if (err){
                res.status(500).send()
                return
            }
            console.log(pro.proName + " updated in database!")
            res.redirect("/product")
        })
    })
}
module.exports.deleting = (req, res)=>{
    Product.findOne({_id: req.query.id}, async (err, pro)=>{
        pro.proStatus = false;
        pro.save((err, pro)=>{
            if (err){
                res.status(500).send()
                return
            }
            console.log(pro.proName + " moved to trash!")
            res.redirect("/product")
        })
    })
}
module.exports.trash = async (req, res)=>{
    var products = await Product.find({proStatus: false})
    res.render('product-trash', {activepage: 'trash' ,layout: './layouts/common', products: products })
}
module.exports.recover = async (req, res)=>{
    Product.findOne({_id: req.query.id}, async (err, pro)=>{
        pro.proStatus = true;
        pro.save((err, pro)=>{
            if (err){
                res.status(500).send()
                return
            }
            console.log(pro.proName + " moved to trash!")
            res.redirect("/product/trash")
        })
    })
}
module.exports.stockin = async (req, res)=>{
    Product.findOne({_id: req.query.id}, async (err, pro)=>{
        res.render("stock-in",{activepage: 'product' ,layout: './layouts/common', pro: pro })
    })
}
module.exports.postStockin = async (req, res)=>{
    Product.findOne({_id: req.body.proId}, async (err, pro)=>{
        pro.proQty = parseInt(pro.proQty) + parseInt(req.body.qty)
        pro.save((err, pro)=>{
            if (err){
                res.status(500).send()
                return
            }
            res.redirect("/product")
        })
    })
}