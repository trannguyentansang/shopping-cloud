var express = require('express');
var router = express.Router();
var orderController = require('../controllers/order.controller')
var middleware = require('../middlewares/auth.middleware')

router.get('/',middleware.requireAuth, orderController.index)
router.get('/adding',middleware.requireAuth, orderController.adding)
router.get('/details',middleware.requireAuth, orderController.orderDetails)

module.exports = router;