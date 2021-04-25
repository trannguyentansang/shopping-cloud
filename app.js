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

const app = express()

//config view engine
app.use(expressLayouts)
app.set('layout', './views/layouts/commmon')
app.set('view engine', 'ejs');

//register static files
app.use("/public", express.static('./public'))

//redirect
app.use('/', homeRouter)
app.use('/auth', authRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/user', userRouter)
app.use('/order', orderRouter)

//open port
app.listen(process.env.PORT_SERVER, ()=>{
	console.log('this port is listen on port '+process.env.PORT_SERVER)
})