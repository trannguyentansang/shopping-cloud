var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home.controller')
var middleware = require('../middlewares/auth.middleware')
var categoryController = require('../controllers/category.controller')
var productController = require('../controllers/product.controller')

router.get('/',middleware.requireAuth,middleware.checkPermissionManager, homeController.homePage)

router.get('/cat-trash/search',middleware.requireAuth, middleware.checkIsProductManager, categoryController.trashSearch)
router.get('/trash/search',middleware.requireAuth, middleware.checkIsProductManager, productController.trashSearch)

module.exports = router;