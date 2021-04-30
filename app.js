const express = require('express')
const expressLayouts = require('express-ejs-layouts')

require('dotenv').config()

//router
const homeRouter = require('./routes/home.route');
const authRouter = require('./routes/auth.route');
const categoryRouter = require('./routes/category.route');
const productRouter = require('./routes/product.route');
const userRouter = require('./routes/user.route');
const orderRouter = require('./routes/order.route');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const url = process.env.DB_PATH;

const app = express()
//config view engine
app.use(expressLayouts)
app.set('layout', './views/layouts/commmon')
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
try{
	mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
	console.log("Database created!")
}
catch(err){
	if (err) throw err
}

//register static files
app.use("/public", express.static('./public'))
//redirect admin
app.use('/admin', homeRouter)
app.use('/admin/auth', authRouter)
app.use('/admin/category', categoryRouter)
app.use('/admin/product', productRouter)
app.use('/admin/user', userRouter)
app.use('/admin/order', orderRouter)

//open port
app.listen(process.env.PORT_SERVER, ()=>{
	console.log('this port is listen on port '+process.env.PORT_SERVER)
})