var express = require('express');
var router = express.Router();
var productController = require('../../controllers/client/product.controller')
var middleware = require('../../middlewares/auth.middleware')

router.get('/products-by-category', productController.proByCat)
router.get('/product-details', productController.productDetails)
router.post('/addtocart',middleware.requireAuth,middleware.checkIsCustomer, productController.addtocart)
router.get('/cart',middleware.requireAuth,middleware.checkIsCustomer, productController.cart)

module.exports = router;