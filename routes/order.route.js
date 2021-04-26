var express = require('express');
var router = express.Router();
var orderController = require('../controllers/order.controller')

router.get('/', orderController.index)
router.get('/adding', orderController.adding)
router.get('/details', orderController.orderDetails)

module.exports = router;