var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/category.controller')

router.get('/', categoryController.index)
router.get('/adding', categoryController.adding)
router.post('/adding', categoryController.postAdding)
router.get('/editing', categoryController.editing)

module.exports = router;