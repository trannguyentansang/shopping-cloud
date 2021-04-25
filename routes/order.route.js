var express = require('express');
var router = express.Router();
var orderController = require('../controllers/order.controller')

router.get('/', orderController.index)

module.exports = router;