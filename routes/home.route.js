var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home.controller')
var middleware = require('../middlewares/auth.middleware')

router.get('/',middleware.requireAuth,middleware.checkPermissionManager, homeController.homePage)

module.exports = router;