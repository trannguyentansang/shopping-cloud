var express = require('express');
var router = express.Router();
var productController = require('../controllers/product.controller')

router.get('/', productController.index)
router.get('/adding', productController.adding)
router.get('/editing', productController.editing)
router.get('/trash', productController.trash)

module.exports = router;