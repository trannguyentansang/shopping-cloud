var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller')

router.get('/', userController.index)
router.get('/adding', userController.adding)
router.get('/editing', userController.editing)

module.exports = router;