module.exports.homePage = (req, res)=>{
    res.render('index', {activepage: 'dashboard' ,layout: './layouts/common' })
}