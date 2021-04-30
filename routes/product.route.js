var express = require('express');
var router = express.Router();
var productController = require('../controllers/product.controller')
const upload = require("../controllers/upload")
var middleware = require('../middlewares/auth.middleware')

router.get('/',middleware.requireAuth, productController.index)
router.get('/adding',middleware.requireAuth, productController.adding)
router.post('/adding',middleware.requireAuth, upload.single("proFile"), productController.postAdding)
router.post('/editing',middleware.requireAuth, upload.single("proFile"), productController.postEditing)
router.get('/editing',middleware.requireAuth, productController.editing)
router.get('/deleting',middleware.requireAuth, productController.deleting)
router.get('/trash',middleware.requireAuth, productController.trash)
router.get('/recover',middleware.requireAuth, productController.recover)
router.get('/stockin',middleware.requireAuth, productController.stockin)
router.post('/stockin',middleware.requireAuth, productController.postStockin)

module.exports = router;