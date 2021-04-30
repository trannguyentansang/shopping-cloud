var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/category.controller')
const upload = require("../controllers/upload")

router.get('/', categoryController.index)
router.get('/adding', categoryController.adding)
router.post('/adding', upload.single("catFile"), categoryController.postAdding)
router.get('/editing', categoryController.editing)
router.post('/editing', upload.single("catFile"), categoryController.postEditing)
router.get('/deleting', categoryController.deleting)

module.exports = router;