var express = require('express');
var router = express.Router();
var productController = require('../controllers/product.controller')
const upload = require("../controllers/upload")

router.get('/', productController.index)
router.get('/adding', productController.adding)
router.post('/adding', upload.single("proFile"), productController.postAdding)
router.post('/editing', upload.single("proFile"), productController.postEditing)
router.get('/editing', productController.editing)
router.get('/deleting', productController.deleting)
router.get('/trash', productController.trash)
router.get('/recover', productController.recover)
router.get('/stockin', productController.stockin)
router.post('/stockin', productController.postStockin)

module.exports = router;